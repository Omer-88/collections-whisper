import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type InvoiceStatus = "paid" | "pending" | "overdue";
export type ToneType = "gentle" | "firm" | "urgent";

interface StatusBadgeProps {
  status: InvoiceStatus | ToneType;
  variant?: "default" | "tone";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const statusMap = {
      // Invoice statuses
      paid: "bg-success-muted text-success hover:bg-success-muted",
      pending: "bg-warning-muted text-warning hover:bg-warning-muted",
      overdue: "bg-destructive-muted text-destructive hover:bg-destructive-muted",
      
      // Tone statuses
      gentle: "bg-primary-muted text-primary hover:bg-primary-muted",
      firm: "bg-warning-muted text-warning hover:bg-warning-muted",
      urgent: "bg-destructive-muted text-destructive hover:bg-destructive-muted",
    };
    
    return statusMap[status as keyof typeof statusMap] || "bg-muted text-muted-foreground";
  };

  return (
    <Badge 
      variant="secondary" 
      className={cn(
        "capitalize",
        getStatusStyles(status)
      )}
    >
      {status}
    </Badge>
  );
}