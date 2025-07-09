
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Image as ImageIcon, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Review } from '@/types/review';
import { useToast } from '@/hooks/use-toast';

interface ReviewCardProps {
  review: Review;
  onReaction: (reviewId: string, reaction: 'like' | 'dislike') => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReaction }) => {
  const { toast } = useToast();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleReaction = (reaction: 'like' | 'dislike') => {
    onReaction(review.id, reaction);
    toast({
      title: "Thành công",
      description: `Đã ${reaction === 'like' ? 'thích' : 'không thích'} đánh giá này`
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.userAvatar} />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold">{review.userName}</h4>
              {review.isVerified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Đã xác minh
                </Badge>
              )}
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="h-4 w-4" />
              {new Date(review.createdDate).toLocaleDateString('vi-VN')}
            </div>
            
            <h5 className="font-medium mb-2">{review.title}</h5>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{review.content}</p>
            
            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {review.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setSelectedImage(image.url);
                      setImageModalOpen(true);
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.caption || 'Review image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Reaction Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('like')}
                className={`flex items-center gap-1 ${
                  review.userReaction === 'like' ? 'text-blue-600 bg-blue-50' : ''
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                {review.likes}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('dislike')}
                className={`flex items-center gap-1 ${
                  review.userReaction === 'dislike' ? 'text-red-600 bg-red-50' : ''
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                {review.dislikes}
              </Button>
            </div>
            
            {/* Admin Response */}
            {review.response && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Phản hồi từ cửa hàng</Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(review.response.responseDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-gray-700">{review.response.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  - {review.response.responderName}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
