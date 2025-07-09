
export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  images: string[];
  features: string[];
  duration: string;
  capacity: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isNew: boolean;
  availability: ServiceAvailability[];
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  policies: {
    cancellation: string;
    refund: string;
    rescheduling: string;
  };
  tags: string[];
  createdDate: string;
  updatedDate: string;
}

export interface ServiceAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price?: number;
}

export interface ServiceComparison {
  services: Service[];
  comparisonFields: ComparisonField[];
}

export interface ComparisonField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'array' | 'rating';
}

export interface ServiceFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  capacity?: {
    min: number;
    max: number;
  };
  features?: string[];
  location?: string;
  availability?: {
    date: string;
    timeRange?: {
      start: string;
      end: string;
    };
  };
  tags?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'popularity' | 'newest';
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'service' | 'category' | 'location';
  resultCount: number;
}

export interface SearchHistory {
  id: string;
  query: string;
  filters: ServiceFilters;
  timestamp: string;
  resultCount: number;
}

export interface WishlistItem {
  id: string;
  serviceId: string;
  service: Service;
  addedDate: string;
  notes?: string;
}
