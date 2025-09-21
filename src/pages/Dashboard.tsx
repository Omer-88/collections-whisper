import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { invoiceApi, Invoice } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoiceApi.getAll();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
        toast({
          title: "Error",
          description: "Failed to load invoice data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [toast]);

  // Calculate metrics from real data
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === "paid").length;
  const pendingInvoices = invoices.filter(inv => inv.status === "pending").length;
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue").length;
  const escalations = overdueInvoices; // Assuming overdue invoices become escalations

  // Generate DSO data (mock trend based on current data)
  const dsoData = [
    { month: "Jan", dso: 28 },
    { month: "Feb", dso: 32 },
    { month: "Mar", dso: 35 },
    { month: "Apr", dso: 31 },
    { month: "May", dso: 29 },
    { month: "Jun", dso: overdueInvoices > 0 ? 30 + overdueInvoices : 25 },
  ];

  // Invoice breakdown from real data
  const invoiceBreakdown = [
    { name: "Paid", value: paidInvoices, color: "hsl(var(--success))" },
    { name: "Pending", value: pendingInvoices, color: "hsl(var(--warning))" },
    { name: "Overdue", value: overdueInvoices, color: "hsl(var(--destructive))" },
  ].filter(item => item.value > 0);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Loading invoice data...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your invoice management system
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Invoices Sent"
          value={totalInvoices.toString()}
          change={totalInvoices > 0 ? `${totalInvoices} total invoices` : "No invoices yet"}
          changeType="neutral"
          icon={FileText}
        />
        <MetricCard
          title="Paid Invoices"
          value={paidInvoices.toString()}
          change={`${paidInvoices} of ${totalInvoices} paid`}
          changeType="positive"
          icon={CheckCircle}
        />
        <MetricCard
          title="Pending / Overdue"
          value={(pendingInvoices + overdueInvoices).toString()}
          change={`${pendingInvoices} pending, ${overdueInvoices} overdue`}
          changeType={overdueInvoices > 0 ? "negative" : "neutral"}
          icon={Clock}
        />
        <MetricCard
          title="Escalations"
          value={escalations.toString()}
          change={escalations > 0 ? `${escalations} require attention` : "No escalations"}
          changeType={escalations > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* DSO Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Days Sales Outstanding (DSO) Trend</CardTitle>
            <CardDescription>
              Track how long it takes to collect payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dsoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="dso" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Invoice Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status Breakdown</CardTitle>
            <CardDescription>
              Current distribution of invoice statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={invoiceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {invoiceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}