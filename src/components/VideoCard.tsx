import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  /** URL do poster otimizado no build (primeiro frame do vídeo). */
  poster: string;
  title: string;
};

export default function VideoCard({ src, poster, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const play = () => {
    // play() rejeita se for interrompido por um pause logo em seguida; não é erro
    videoRef.current?.play().catch(() => {});
  };
  const pause = (reset = false) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (reset) video.currentTime = 0;
  };
  const toggle = () => (playing ? pause() : play());

  return (
    <div
      className="relative aspect-video overflow-hidden bg-black"
      onMouseEnter={canHover ? play : undefined}
      onMouseLeave={canHover ? () => pause(true) : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Vídeo de demonstração: ${title}`}
        className="size-full object-cover object-top"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Toque: o botão fica sempre visível. Mouse: some enquanto toca, mas segue acessível pelo teclado */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar vídeo de ${title}` : `Reproduzir vídeo de ${title}`}
        aria-pressed={playing}
        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
          playing ? (canHover ? 'opacity-0 focus-visible:opacity-100' : 'bg-transparent') : ''
        }`}
      >
        <span
          className={`flex size-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition ${
            playing && !canHover ? 'absolute right-3 bottom-3 size-10 opacity-80' : ''
          }`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
