import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Organizadores para Cozinha",
    categorySlug: "organizacao",
    src: "https://gifs.widde.io/xl/widde-bucket-sp/1dce654f-8307-46e4-8c64-e09381f0e164/videos/701ba2d8-ae49-4f43-a9a6-ea30e68973cd-1753285166980-6680218/video.mp4?v=12345",
  },
  {
    id: 2,
    title: "Linha Brisa Completa",
    categorySlug: "organizacao",
    src: "https://gifs.widde.io/xl/widde-bucket-sp/1dce654f-8307-46e4-8c64-e09381f0e164/videos/59e50896-c517-4f65-b7a3-75ed1446dd77-1753285154055-8377854/video.mp4?v=12345",
  },
  {
    id: 3,
    title: "Potes Hermeticos em Uso",
    categorySlug: "cozinha",
    src: "https://gifs.widde.io/xl/widde-bucket-sp/1dce654f-8307-46e4-8c64-e09381f0e164/videos/456cc809-9a71-4b90-869c-d77f77b857d2-1753285153038-4695425/video.mp4?v=12345",
  },
];

const VideoCarousel = () => {
  const [active, setActive] = useState(0);
  const total = videos.length;
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navigate = useNavigate();

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === active) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        // Seek to a tiny offset to force the first frame to render (avoids white box)
        try {
          if (vid.readyState >= 1) {
            vid.currentTime = 0.01;
          } else {
            const onLoaded = () => {
              vid.currentTime = 0.01;
              vid.removeEventListener("loadedmetadata", onLoaded);
            };
            vid.addEventListener("loadedmetadata", onLoaded);
          }
        } catch {}
      }
    });
  }, [active]);

  const handleVideoEnded = useCallback(() => {
    setActive((a) => (a + 1) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  // Each video gets a position based on its offset from active
  const getOffset = (index: number) => {
    let diff = index - active;
    // Wrap around
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const getStyle = (index: number): React.CSSProperties => {
    const offset = getOffset(index);

    // Only show -1, 0, 1
    if (Math.abs(offset) > 1) {
      return { display: "none" };
    }

    const translateX = offset * 160; // px shift on mobile
    const translateXMd = offset * 300; // px shift on desktop (handled via CSS)
    const scale = offset === 0 ? 1 : 0.85;
    const opacity = offset === 0 ? 1 : 0.5;
    const zIndex = offset === 0 ? 20 : 10;

    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground text-center">
          Veja nossos produtos em acao
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Assista e descubra como transformar sua casa
        </p>
      </div>

      <div
        className="relative mx-auto max-w-3xl h-[320px] md:h-[440px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video, idx) => {
          const offset = getOffset(idx);
          if (Math.abs(offset) > 1) return null;
          const isCenter = offset === 0;

          return (
            <div
              key={video.id}
              onClick={() => {
                if (offset === -1) return prev();
                if (offset === 1) return next();
                navigate(`/produtos?categoria=${video.categorySlug}`);
              }}
              style={getStyle(idx)}
              className="w-[180px] md:w-[260px] h-[270px] md:h-[390px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={video.src}
                muted
                playsInline
                preload="auto"
                autoPlay={isCenter}
                onEnded={isCenter ? handleVideoEnded : undefined}
                className="w-full h-full object-cover bg-muted"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <p className={`font-heading font-semibold text-background leading-tight ${
                  isCenter ? "text-sm" : "text-xs"
                }`}>
                  {video.title}
                </p>
              </div>
            </div>
          );
        })}

        <button
          onClick={prev}
          className="flex absolute left-2 md:left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-card items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="flex absolute right-2 md:right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-card items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="hidden md:flex justify-center gap-2 mt-6">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default VideoCarousel;
