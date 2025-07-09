
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'complaint' | 'feature-request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdated: string;
  responseTime?: string;
  assignedTo?: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  attachments: TicketAttachment[];
  messages: TicketMessage[];
  satisfaction?: {
    rating: number;
    feedback?: string;
    date: string;
  };
}

export interface TicketAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: string;
}

export interface TicketMessage {
  id: string;
  content: string;
  sender: 'customer' | 'support';
  senderName: string;
  timestamp: string;
  attachments?: TicketAttachment[];
  isInternal?: boolean;
}

export interface TicketFilters {
  status?: string;
  category?: string;
  priority?: string;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  searchTerm?: string;
}
