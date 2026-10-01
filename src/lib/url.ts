/**
 * Monta um link interno respeitando o `base` do Astro (/MyPortifolio).
 * Ex.: url('/projetos/') → '/MyPortifolio/projetos/'
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
