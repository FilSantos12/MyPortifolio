interface ImportMetaEnv {
  /** ID do formulário no FormSubmit. Opcional: sem ele, a seção de contato mostra só o WhatsApp. */
  readonly PUBLIC_FORMSUBMIT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
