import { useId, useState, type SubmitEvent } from 'react';

type Props = {
  /** ID do FormSubmit (o "random string" do formulário), vindo de PUBLIC_FORMSUBMIT_ID. */
  formId: string;
  /** Alternativa oferecida quando o envio falha. */
  whatsapp: string;
};

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: Fields = { name: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = 'Informe seu nome.';
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (fields.message.trim().length < MIN_MESSAGE)
    errors.message = `A mensagem precisa ter pelo menos ${MIN_MESSAGE} caracteres.`;
  return errors;
}

const inputClass =
  'w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-muted/70 transition-colors focus:border-accent/60 focus:outline-none focus-visible:outline-none';

export default function ContactForm({ formId, whatsapp }: Props) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  // só mostra o erro de um campo depois que a pessoa sai dele ou tenta enviar
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const honey = (form.elements.namedItem('_honey') as HTMLInputElement | null)?.value ?? '';

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
          _subject: `Portfólio: mensagem de ${fields.name.trim()}`,
          _template: 'table',
          _honey: honey,
        }),
      });
      const data: { success?: string | boolean } = await res.json().catch(() => ({}));
      // o FormSubmit responde success como string ("true"/"false")
      if (res.ok && String(data.success) === 'true') {
        setStatus('success');
        setFields(EMPTY);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <p className="text-lg font-medium text-accent">Mensagem enviada!</p>
        <p className="text-sm text-muted">
          Obrigado pelo contato. Respondo o mais rápido possível.
        </p>
        <button type="button" className="btn-outline" onClick={() => setStatus('idle')}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const field = (key: keyof Fields) => {
    const error = touched[key] ? errors[key] : undefined;
    return {
      id: `${uid}-${key}`,
      name: key,
      value: fields[key],
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${uid}-${key}-erro` : undefined,
      className: `${inputClass} ${error ? 'border-red-400/70' : 'border-line'}`,
      onBlur: () => blur(key),
      error,
    };
  };

  const errorText = (key: keyof Fields, error?: string) =>
    error && (
      <p id={`${uid}-${key}-erro`} className="mt-1.5 text-xs text-red-300">
        {error}
      </p>
    );

  const { error: nameError, ...nameProps } = field('name');
  const { error: emailError, ...emailProps } = field('email');
  const { error: messageError, ...messageProps } = field('message');
  const sending = status === 'sending';

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative flex flex-col gap-5"
      aria-busy={sending}
    >
      <div>
        <label htmlFor={nameProps.id} className="mb-1.5 block text-sm font-medium">
          Nome
        </label>
        <input
          {...nameProps}
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          required
          onChange={(e) => update('name', e.target.value)}
        />
        {errorText('name', nameError)}
      </div>

      <div>
        <label htmlFor={emailProps.id} className="mb-1.5 block text-sm font-medium">
          E-mail
        </label>
        <input
          {...emailProps}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="seu@email.com"
          required
          onChange={(e) => update('email', e.target.value)}
        />
        {errorText('email', emailError)}
      </div>

      <div>
        <label htmlFor={messageProps.id} className="mb-1.5 block text-sm font-medium">
          Mensagem
        </label>
        <textarea
          {...messageProps}
          rows={5}
          placeholder="Conte um pouco sobre o seu projeto"
          required
          minLength={MIN_MESSAGE}
          onChange={(e) => update('message', e.target.value)}
          className={`${messageProps.className} resize-y`}
        />
        {errorText('message', messageError)}
      </div>

      {/* honeypot: invisível para pessoas; robôs que preenchem tudo são descartados pelo FormSubmit */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-honey`}>Não preencha este campo</label>
        <input id={`${uid}-honey`} type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="text-sm text-red-300">
            Não foi possível enviar agora. Tente de novo em instantes ou{' '}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-4"
            >
              fale comigo pelo WhatsApp
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary self-start disabled:cursor-wait disabled:opacity-60"
        disabled={sending}
      >
        {sending ? 'Enviando…' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
