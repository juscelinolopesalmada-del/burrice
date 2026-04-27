import { X, Plus, Minus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/LoadingOverlay";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);

  const goToCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  if (!isOpen && !navigating) return null;

  return (
    <>
      {navigating && <LoadingOverlay />}
      {isOpen && <div className="fixed inset-0 bg-foreground/40 z-50" onClick={() => setIsOpen(false)} />}
      {isOpen && (
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-modal flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Carrinho
              {totalItems > 0 && (
                <span className="text-sm text-muted-foreground font-normal ml-1">
                  ({totalItems} {totalItems === 1 ? "item" : "itens"})
                </span>
              )}
            </h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground px-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag size={32} strokeWidth={1.5} className="text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium">Seu carrinho esta vazio</p>
            <p className="text-xs text-center">Adicione produtos para continuar</p>
            <Button onClick={() => setIsOpen(false)} variant="default" size="lg" className="mt-2 rounded-lg">
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-secondary/50 border border-border/50">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</h3>
                    <p className="text-sm font-bold text-primary mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-border space-y-3 bg-secondary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading font-bold text-lg text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <p className="text-xs text-pix font-medium">
                5% de desconto no PIX: R$ {(totalPrice * 0.95).toFixed(2).replace(".", ",")}
              </p>
              <Button
                className="w-full rounded-lg"
                size="lg"
                onClick={goToCheckout}
                disabled={navigating}
              >
                Finalizar Compra
              </Button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <ArrowLeft size={15} />
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </div>
      )}
    </>
  );
};

export default CartDrawer;
