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

// Sample data
const dsoData = [
  { month: "Jan", dso: 28 },
  { month: "Feb", dso: 32 },
  { month: "Mar", dso: 35 },
  { month: "Apr", dso: 31 },
  { month: "May", dso: 29 },
  { month: "Jun", dso: 33 },
];

const invoiceBreakdown = [
  { name: "Paid", value: 156, color: "hsl(var(--success))" },
  { name: "Pending", value: 42, color: "hsl(var(--warning))" },
  { name: "Overdue", value: 18, color: "hsl(var(--destructive))" },
];

export default function Dashboard() {
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
          value="216"
          change="+12.5% from last month"
          changeType="positive"
          icon={FileText}
        />
        <MetricCard
          title="Paid Invoices"
          value="156"
          change="+8.2% from last month"
          changeType="positive"
          icon={CheckCircle}
        />
        <MetricCard
          title="Pending / Overdue"
          value="60"
          change="+5 from last week"
          changeType="negative"
          icon={Clock}
        />
        <MetricCard
          title="Escalations"
          value="8"
          change="+2 from last week"
          changeType="negative"
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