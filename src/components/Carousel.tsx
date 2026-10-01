import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

/** Imagem já otimizada no build (getImage) — o React só recebe as URLs. */
export type CarouselImage = {
  src: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  images: CarouselImage[];
  /** Tempo entre slides em ms (padrão 5000). */
  interval?: number;
  /** Rótulo do carrossel para leitores de tela. */
  label: string;
  sizes?: string;
};

const SWIPE_THRESHOLD = 40;

export default function Carousel({
  images,
  interval = 5000,
  label,
  sizes = '(min-width: 1152px) 1104px, 100vw',
}: Props) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true); // sem autoplay até confirmar a preferência
  const pointerStart = useRef<number | null>(null);
  const id = useId();
  const total = images.length;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const goTo = useCallback((index: number) => setCurrent((index + total) % total), [total]);
  // relativo ao estado mais recente, para cliques rápidos seguidos não se perderem
  const step = useCallback(
    (delta: number) => setCurrent((c) => (c + delta + total) % total),
    [total],
  );

  const autoplay = total > 1 && !reducedMotion && !hovered && !focused;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => setCurrent((c) => (c + 1) % total), interval);
    return () => window.clearInterval(timer);
  }, [autoplay, interval, total, current]);

  // setas ← → navegam quando o foco está em qualquer botão do carrossel
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return;
    const delta = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) step(delta < 0 ? 1 : -1);
  };

  return (
    <section
      className="group relative overflow-hidden rounded border border-line bg-black"
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        id={id}
        className="flex touch-pan-y transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
        aria-live={autoplay ? 'off' : 'polite'}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            className="aspect-video w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== current}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={sizes}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
              className="size-full object-cover object-left-top select-none"
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-accent hover:text-bg"
            aria-controls={id}
            onKeyDown={onKeyDown}
            aria-label="Imagem anterior"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-accent hover:text-bg"
            aria-controls={id}
            onKeyDown={onKeyDown}
            aria-label="Próxima imagem"
            onClick={() => step(1)}
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/50 px-2 py-1">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className="flex size-6 items-center justify-center"
                aria-controls={id}
                onKeyDown={onKeyDown}
                aria-label={`Ir para a imagem ${i + 1}: ${image.alt}`}
                aria-current={i === current}
                onClick={() => goTo(i)}
              >
                <span
                  className={`block size-2 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-white/50'}`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
