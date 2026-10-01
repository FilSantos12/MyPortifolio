import { useEffect, useId, useState } from 'react';

type Props = {
  links: { label: string; href: string }[];
};

export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    // fecha se a tela crescer para o layout desktop
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-lg"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block h-0.5 w-6 rounded bg-text transition duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 rounded bg-text transition duration-300 ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 rounded bg-text transition duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
        />
      </button>

      {/* sempre no DOM (só escondido) para o script de link ativo continuar marcando os itens */}
      <div
        id={panelId}
        className={`absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur ${open ? 'block' : 'hidden'}`}
      >
        <ul className="flex flex-col py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-nav-link
                className="block px-6 py-3 text-muted transition-colors hover:text-accent data-[active]:text-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
