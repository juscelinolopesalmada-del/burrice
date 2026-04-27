import { useEffect, useState } from "react";

interface LowStockIndicatorProps {
  productId: string;
  className?: string;
  maxStock?: number;
}

const LowStockIndicator = ({ productId, className = "", maxStock = 10 }: LowStockIndicatorProps) => {
  const [stock, setStock] = useState<number | null>(null);
  const [displayPercentage, setDisplayPercentage] = useState(100);

  useEffect(() => {
    // Generate a pseudo-random number based on the productId
    // This ensures the stock count stays consistent for the same product
    const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Random number between 3 and maxStock-1 (always < 10 if maxStock is 10)
    const randomStock = (seed % (maxStock - 3)) + 3; 
    setStock(randomStock);
    setDisplayPercentage(100);
    
    // Set percentage to 15% after a short delay to trigger the "decreasing" animation
    const timer = setTimeout(() => {
      setDisplayPercentage(15);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [productId, maxStock]);

  if (stock === null) return null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </div>
        <p className="text-[12px] md:text-[13px] font-bold text-primary leading-none">
          Restam apenas <span className="text-sm">{stock}</span> unidades em estoque!
        </p>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/10">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1500 ease-in-out"
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default LowStockIndicator;
