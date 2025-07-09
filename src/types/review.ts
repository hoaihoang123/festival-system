
export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: ReviewImage[];
  likes: number;
  dislikes: number;
  userReaction?: 'like' | 'dislike' | null;
  createdDate: string;
  updatedDate?: string;
  isVerified: boolean;
  response?: AdminResponse;
}

export interface ReviewImage {
  id: string;
  url: string;
  caption?: string;
}

export interface AdminResponse {
  content: string;
  responderName: string;
  responseDate: string;
}

export interface ReviewFilters {
  rating?: number;
  sortBy?: 'newest' | 'oldest' | 'rating_high' | 'rating_low' | 'most_helpful';
  hasImages?: boolean;
  verified?: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
