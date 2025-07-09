export interface LoyaltyPoint {
  id: string;
  userId: string;
  points: number;
  type: "REVIEW" | "BOOKING" | "REFERRAL";
  description: string;
  createdAt: string;
  orderId?: string;
}
