import { useState } from 'react';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  /** Seletor do contêiner com os itens filtráveis ([data-category]) e grupos ([data-filter-group]). */
  target: string;
};

const ALL = 'todos';

/** Mostra só os itens da categoria e esconde os grupos que ficarem vazios. Retorna quantos ficaram. */
function applyFilter(target: string, category: string): number {
  const root = document.querySelector(target);
  if (!root) return 0;

  let visible = 0;
  root.querySelectorAll<HTMLElement>('[data-category]').forEach((item) => {
    const show = category === ALL || item.dataset.category === category;
    item.hidden = !show;
    if (show) visible++;
  });
  root.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
    group.hidden = !group.querySelector('[data-category]:not([hidden])');
  });
  return visible;
}

/**
 * Filtro por categoria sobre cards renderizados no build: só alterna o atributo `hidden`.
 * Sem JS, todos os projetos continuam visíveis.
 */
export default function ProjectFilter({ options, target }: Props) {
  const [active, setActive] = useState(ALL);
  // só anuncia a contagem depois de usar o filtro
  const [count, setCount] = useState<number | null>(null);

  const select = (category: string) => {
    setActive(category);
    setCount(applyFilter(target, category));
  };

  const all: Option[] = [{ value: ALL, label: 'Todos' }, ...options];

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
        {all.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={active === option.value}
            onClick={() => select(option.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === option.value
                ? 'border-accent bg-accent text-bg'
                : 'border-line text-muted hover:border-accent/40 hover:text-text'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {count !== null && `${count} ${count === 1 ? 'projeto' : 'projetos'}`}
      </p>
    </div>
  );
}
