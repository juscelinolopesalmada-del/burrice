import { Loader2 } from "lucide-react";

interface Props {
  message?: string;
}

const LoadingOverlay = ({ message = "Preparando seu checkout..." }: Props) => (
  <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-200">
    <Loader2 size={48} className="text-primary animate-spin" />
    <p className="text-sm font-medium text-foreground">{message}</p>
    <p className="text-xs text-muted-foreground">Aguarde um instante</p>
  </div>
);

export default LoadingOverlay;
