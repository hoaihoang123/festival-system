import React, { useState } from "react";
import { Star, Send, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { loyaltyPointService } from "@/services/loyaltyPoint";

interface ReviewFormProps {
  orderId: number;
  onSuccess?: () => void;
  className?: string;
}

const ReviewForm = ({ orderId, onSuccess, className }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Vui lòng chọn số sao",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/reviews/order/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi đánh giá");
      }

      const points = await loyaltyPointService.calculatePointsForOrder(orderId);
      setEarnedPoints(points);

      toast({
        title: "Cảm ơn bạn đã đánh giá!",
        description: `Bạn đã nhận được ${points} điểm thưởng.`,
      });

      setRating(0);
      setComment("");
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi đánh giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label>Đánh giá của bạn</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Nhận xét của bạn</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
          className="min-h-[100px]"
        />
      </div>

      {earnedPoints !== null && (
        <div className="flex items-center gap-2 text-green-600">
          <Gift className="h-5 w-5" />
          <span>Bạn đã nhận được {earnedPoints} điểm thưởng!</span>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          "Đang gửi..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Gửi đánh giá
          </>
        )}
      </Button>
    </form>
  );
};

export default ReviewForm;
