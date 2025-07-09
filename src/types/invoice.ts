
export interface InvoiceItem {
  id: string;
  serviceName: string;
  serviceId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  description?: string;
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'success' | 'pending' | 'failed';
  transactionId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  createdDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  paymentMethod?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: InvoiceItem[];
  paymentHistory: PaymentHistory[];
  notes?: string;
  serviceType: string;
  eventDate?: string;
  createdBy?: string;
}
