const API_BASE_URL = "https://1epz8gbc84.execute-api.ap-southeast-5.amazonaws.com/dev";

// This will be replaced with the actual secret in production
const API_KEY = process.env.AWS_API_KEY || "";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function apiRequest(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, headers = {} } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  due_date: string;
  status: "paid" | "pending" | "overdue";
  created_at: string;
  days_overdue?: number;
}

export interface FollowUp {
  id: string;
  invoice_id: string;
  customer_name: string;
  invoice_number: string;
  email_subject: string;
  email_body: string;
  tone: "gentle" | "firm" | "urgent";
  sent_at: string;
}

export interface Escalation {
  id: string;
  invoice_id: string;
  customer_name: string;
  invoice_number: string;
  amount: number;
  days_overdue: number;
  reason: string;
  priority: "low" | "medium" | "high" | "urgent";
  created_at: string;
}

// API Functions
export const invoiceApi = {
  // Get all invoices
  getAll: (): Promise<Invoice[]> => apiRequest("/invoices"),
  
  // Get single invoice
  getById: (id: string): Promise<Invoice> => apiRequest(`/invoices/${id}`),
  
  // Create new invoice
  create: (invoice: Partial<Invoice>): Promise<Invoice> => 
    apiRequest("/invoices", { method: "POST", body: invoice }),
};

export const emailApi = {
  // Send email
  send: (emailData: {
    customer_email: string;
    invoice_number: string;
    amount: string;
    due_date: string;
    tone?: string;
  }) => apiRequest("/send-email", { method: "POST", body: emailData }),
};

// Mock functions for data not yet available from API
// These should be replaced when the backend provides these endpoints
export const followUpApi = {
  getAll: (): Promise<FollowUp[]> => {
    // This would be replaced with actual API call when endpoint is available
    return Promise.resolve([]);
  }
};

export const escalationApi = {
  getAll: (): Promise<Escalation[]> => {
    // This would be replaced with actual API call when endpoint is available
    return Promise.resolve([]);
  }
};