import { useMemo, useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Review, getReviewStats } from "@/data/reviews";

interface Props {
  reviews: Review[];
}

const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < Math.round(value) ? "fill-warning text-warning" : "fill-muted text-muted"}
      />
    ))}
  </div>
);

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-muted-foreground shrink-0">
      {initials}
    </div>
  );
};

const ProductReviews = ({ reviews }: Props) => {
  const sorted = useMemo(
    () => [...reviews].sort((a, b) => b.rating - a.rating),
    [reviews]
  );
  const [visible, setVisible] = useState(4);
  const { total, avg, dist, recommendPct } = getReviewStats(sorted);
  const maxCount = Math.max(...dist.map((d) => d.count), 1);

  return (
    <div className="mt-8 bg-card rounded-2xl border border-border/50 p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-foreground mb-2">Pergunte e veja opiniões de quem já comprou</p>
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">
          Veja o que estão falando sobre este produto
        </h2>
        <span className="inline-block bg-secondary text-foreground text-sm px-4 py-1.5 rounded-full">
          {total} avaliações de clientes
        </span>
      </div>

      {/* Summary card */}
      <div className="border border-border rounded-xl p-5 mb-6 max-w-md mx-auto">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-foreground">{avg.toFixed(1)}</span>
          <span className="text-base text-muted-foreground">/ 5</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Stars value={avg} size={18} />
          <span className="text-sm text-muted-foreground">({total})</span>
        </div>

        <div className="space-y-1.5 mb-5">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-sm">
              <span className="w-6 text-foreground">{d.star}</span>
              <Star size={12} className="text-muted-foreground" />
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full transition-all"
                  style={{ width: `${(d.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" className="stroke-secondary" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-warning"
                strokeWidth="3"
                strokeDasharray={`${(recommendPct / 100) * 94.25} 94.25`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
              99%
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-tight">
            dos clientes<br />recomendam<br />este produto
          </p>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {sorted.slice(0, visible).map((r, i) => (
          <div key={i} className="border-t border-border pt-6 first:border-0 first:pt-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <Avatar name={r.name} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Compra Verificada
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{r.date}</span>
            </div>

            <Stars value={r.rating} size={16} />
            <p className="font-semibold text-sm text-foreground mt-2 mb-1">{r.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{r.text}</p>

            {r.photos && r.photos.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {r.photos.map((src, idx) => (
                  <div
                    key={idx}
                    className="block w-20 h-20 rounded-md overflow-hidden border border-border bg-secondary"
                  >
                    <img
                      src={src}
                      alt={`Foto enviada por ${r.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {r.reply && (
              <div className="border-l-2 border-primary/40 pl-3 mt-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm font-semibold text-foreground">verdecasa</span>
                  <BadgeCheck size={14} className="text-primary fill-primary/20" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {visible < sorted.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => setVisible((v) => Math.min(v + 4, sorted.length))}
            className="rounded-md px-8"
          >
            Carregar mais avaliações
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
