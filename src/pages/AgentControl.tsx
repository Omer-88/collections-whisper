import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample agent log data
const agentLogs = [
  {
    id: 1,
    timestamp: "2024-01-18T14:30:00",
    action: "Analyzed 5 overdue invoices",
    type: "analysis",
    details: "Reviewed invoices INV-003, INV-005, INV-008, INV-012, INV-015"
  },
  {
    id: 2,
    timestamp: "2024-01-18T14:31:00", 
    action: "Sent 3 gentle reminders",
    type: "email",
    details: "Emails sent to TechStart Inc, DevCorp Ltd, StartupTech"
  },
  {
    id: 3,
    timestamp: "2024-01-18T14:32:00",
    action: "Escalated 1 invoice to finance",
    type: "escalation", 
    details: "Invoice INV-005 (Enterprise Systems) escalated due to large amount overdue"
  },
  {
    id: 4,
    timestamp: "2024-01-18T14:33:00",
    action: "Updated customer payment status",
    type: "update",
    details: "Marked invoice INV-001 as paid after bank confirmation"
  },
  {
    id: 5,
    timestamp: "2024-01-18T14:34:00",
    action: "Generated follow-up schedule",
    type: "scheduling",
    details: "Scheduled follow-ups for 8 pending invoices over next 7 days"
  },
];

export default function AgentControl() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(agentLogs);
  const { toast } = useToast();

  const handleRunAgent = async () => {
    setIsRunning(true);
    
    toast({
      title: "AI Agent Started",
      description: "Processing invoices and generating follow-ups...",
    });

    // Simulate agent processing
    setTimeout(() => {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString(),
        action: "Completed automated invoice review",
        type: "analysis",
        details: "Processed 12 invoices, sent 4 reminders, escalated 2 cases"
      };
      
      setLogs(prev => [newLog, ...prev]);
      setIsRunning(false);
      
      toast({
        title: "AI Agent Completed",
        description: "All tasks completed successfully!",
      });
    }, 3000);
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric", 
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getActionIcon = (type: string) => {
    const iconMap = {
      analysis: Clock,
      email: CheckCircle, 
      escalation: AlertTriangle,
      update: CheckCircle,
      scheduling: Clock,
    };
    
    const Icon = iconMap[type as keyof typeof iconMap] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const getActionBadge = (type: string) => {
    const badgeMap = {
      analysis: "bg-primary-muted text-primary",
      email: "bg-success-muted text-success",
      escalation: "bg-destructive-muted text-destructive", 
      update: "bg-success-muted text-success",
      scheduling: "bg-warning-muted text-warning",
    };

    return (
      <Badge className={badgeMap[type as keyof typeof badgeMap] || "bg-muted text-muted-foreground"}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Agent Control</h1>
        <p className="text-muted-foreground">
          Manage and monitor your AI invoice management agent
        </p>
      </div>

      {/* Agent Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Agent Control</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Manual Agent Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Run the AI agent to analyze invoices, send reminders, and handle escalations
                </p>
              </div>
              <Button
                onClick={handleRunAgent}
                disabled={isRunning}
                size="lg"
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>{isRunning ? "Running..." : "Run AI Agent Now"}</span>
              </Button>
            </div>
            
            {isRunning && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Agent is processing invoices and generating actions...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Agent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-surface-elevated"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(log.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        {log.action}
                      </span>
                      {getActionBadge(log.type)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDateTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {log.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}