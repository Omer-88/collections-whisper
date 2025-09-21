import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample escalation data
const escalations = [
  {
    id: "ESC-001",
    customer: "Global Solutions",
    invoiceId: "INV-003",
    amount: 7650.00,
    daysOverdue: 8,
    reason: "No response to multiple reminders",
    timestamp: "2024-01-18T15:30:00",
    priority: "high"
  },
  {
    id: "ESC-002", 
    customer: "Enterprise Systems",
    invoiceId: "INV-005",
    amount: 9870.00,
    daysOverdue: 6,
    reason: "Large amount overdue",
    timestamp: "2024-01-18T11:20:00",
    priority: "urgent"
  },
  {
    id: "ESC-003",
    customer: "DevCorp Ltd",
    invoiceId: "INV-008",
    amount: 4320.50,
    daysOverdue: 12,
    reason: "Customer dispute unresolved",
    timestamp: "2024-01-17T09:45:00",
    priority: "high"
  },
  {
    id: "ESC-004",
    customer: "StartupTech",
    invoiceId: "INV-012",
    amount: 2150.00,
    daysOverdue: 15,
    reason: "Payment plan violation",
    timestamp: "2024-01-16T16:10:00",
    priority: "medium"
  },
];

export default function Escalations() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      urgent: "bg-destructive text-destructive-foreground",
      high: "bg-warning text-warning-foreground", 
      medium: "bg-muted text-muted-foreground",
    };

    return (
      <Badge 
        className={cn(
          "capitalize",
          priorityMap[priority as keyof typeof priorityMap]
        )}
      >
        {priority}
      </Badge>
    );
  };

  const getRowHighlight = (priority: string) => {
    return priority === "urgent" ? "bg-destructive-muted" : "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Escalations</h1>
        <p className="text-muted-foreground">
          Overdue invoices escalated to finance team
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Escalations
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {escalations.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active escalations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(escalations.reduce((sum, esc) => sum + esc.amount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              In escalated invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Urgent Cases
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {escalations.filter(esc => esc.priority === "urgent").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Escalations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Escalated Invoices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Escalation Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalations.map((escalation) => (
                <TableRow 
                  key={escalation.id}
                  className={getRowHighlight(escalation.priority)}
                >
                  <TableCell className="font-medium">
                    {escalation.customer}
                  </TableCell>
                  <TableCell>{escalation.invoiceId}</TableCell>
                  <TableCell>{formatCurrency(escalation.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">
                        {escalation.daysOverdue} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={escalation.reason}>
                      {escalation.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(escalation.priority)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(escalation.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}