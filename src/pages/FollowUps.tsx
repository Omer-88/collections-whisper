import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StatusBadge, ToneType } from "@/components/StatusBadge";
import { Clock, Mail } from "lucide-react";

// Sample follow-up data
const followUps = [
  {
    id: "FU-001",
    dateTime: "2024-01-18T10:30:00",
    customer: "TechStart Inc",
    invoiceId: "INV-002",
    subject: "Gentle Reminder: Invoice INV-002 Payment Due",
    tone: "gentle" as ToneType,
    emailBody: `Dear TechStart Inc team,

I hope this email finds you well. This is a gentle reminder that invoice INV-002 for $2,890.50 was due on January 20th, 2024.

We understand that payments can sometimes be overlooked in busy schedules. If you have any questions about this invoice or need any additional documentation, please don't hesitate to reach out.

We would appreciate your attention to this matter at your earliest convenience.

Best regards,
Invoice AI Manager`
  },
  {
    id: "FU-002",
    dateTime: "2024-01-17T14:15:00",
    customer: "Global Solutions",
    invoiceId: "INV-003",
    subject: "Important: Overdue Invoice INV-003 - Immediate Attention Required",
    tone: "firm" as ToneType,
    emailBody: `Dear Global Solutions,

This is an important notice regarding invoice INV-003 for $7,650.00, which was due on January 10th, 2024 and is now overdue.

We need to resolve this matter promptly to avoid any disruption to our business relationship. Please prioritize this payment or contact us immediately if there are any issues.

If payment has already been made, please provide us with the transaction details for our records.

Regards,
Invoice AI Manager`
  },
  {
    id: "FU-003",
    dateTime: "2024-01-16T09:00:00",
    customer: "Enterprise Systems",
    invoiceId: "INV-005",
    subject: "URGENT: Invoice INV-005 Severely Overdue - Action Required",
    tone: "urgent" as ToneType,
    emailBody: `Dear Enterprise Systems,

This is an URGENT notice regarding invoice INV-005 for $9,870.00, which was due on January 12th, 2024 and is now severely overdue.

Immediate payment is required to avoid escalation to our collections department. We must receive payment or hear from you within 48 hours.

Please contact us immediately at [contact information] to resolve this matter.

Urgently,
Invoice AI Manager`
  },
];

export default function FollowUps() {
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Follow-up Logs</h1>
        <p className="text-muted-foreground">
          AI-generated reminder emails sent to customers
        </p>
      </div>

      {/* Follow-ups List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Reminders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followUps.map((followUp) => (
              <Card key={followUp.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(followUp.dateTime)}
                        </span>
                        <StatusBadge status={followUp.tone} variant="tone" />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                        <div>
                          <span className="text-sm font-medium">Customer:</span>
                          <p className="text-sm text-muted-foreground">
                            {followUp.customer}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Invoice:</span>
                          <p className="text-sm text-muted-foreground">
                            {followUp.invoiceId}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Subject:</span>
                          <p className="text-sm text-muted-foreground">
                            {followUp.subject}
                          </p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={followUp.id} className="border-none">
                          <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:no-underline">
                            View Email Content
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="rounded-md bg-muted p-4">
                              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                                {followUp.emailBody}
                              </pre>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}