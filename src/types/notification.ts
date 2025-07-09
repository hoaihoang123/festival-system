
export interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'support' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdDate: string;
  actionUrl?: string;
  metadata?: NotificationMetadata;
}

export interface NotificationMetadata {
  orderId?: string;
  promotionCode?: string;
  ticketId?: string;
  priority?: 'low' | 'medium' | 'high';
  icon?: string;
}

export interface NotificationSettings {
  email: {
    order: boolean;
    promotion: boolean;
    support: boolean;
    system: boolean;
  };
  sms: {
    order: boolean;
    promotion: boolean;
    support: boolean;
    system: boolean;
  };
  push: {
    order: boolean;
    promotion: boolean;
    support: boolean;
    system: boolean;
  };
  inApp: {
    order: boolean;
    promotion: boolean;
    support: boolean;
    system: boolean;
  };
  frequency: 'instant' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface NotificationFilters {
  type?: string;
  isRead?: boolean;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}
