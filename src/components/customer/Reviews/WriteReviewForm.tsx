
import React, { useState } from 'react';
import { Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Review } from '@/types/review';
import { useToast } from '@/hooks/use-toast';

interface WriteReviewFormProps {
  serviceId: string;
  onSubmit: (review: Partial<Review>) => void;
  onCancel: () => void;
}

const WriteReviewForm: React.FC<WriteReviewFormProps> = ({ serviceId, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 5) {
      toast({
        title: "Lỗi",
        description: "Chỉ được upload tối đa 5 ảnh",
        variant: "destructive"
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Lỗi",
          description: `Ảnh ${file.name} quá lớn (>5MB)`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    setImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn số sao đánh giá",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title || !formData.content) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate image upload
      const reviewImages = images.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        caption: file.name
      }));

      const reviewData: Partial<Review> = {
        serviceId,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        images: reviewImages,
        userName: 'Nguyễn Văn A', // Simulate current user
        userId: 'user-1',
        likes: 0,
        dislikes: 0,
        isVerified: true,
        createdDate: new Date().toISOString()
      };

      onSubmit(reviewData);
      
      toast({
        title: "Thành công",
        description: "Đánh giá của bạn đã được gửi thành công"
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi đánh giá",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRatingChange(index + 1)}
        className={`p-1 ${
          index < formData.rating ? 'text-yellow-400' : 'text-gray-300'
        } hover:text-yellow-400 transition-colors`}
      >
        <Star className="h-6 w-6 fill-current" />
      </button>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Viết đánh giá</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Đánh giá của bạn *</Label>
            <div className="flex items-center gap-1 mt-2">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating > 0 && `${formData.rating}/5 sao`}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Tiêu đề đánh giá *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Tóm tắt trải nghiệm của bạn"
              required
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Nội dung đánh giá *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Chia sẻ chi tiết về trải nghiệm dịch vụ..."
              rows={5}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label>Thêm ảnh (tùy chọn)</Label>
            <div className="mt-2">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Thêm ảnh để đánh giá sinh động hơn
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (tối đa 5MB mỗi ảnh, 5 ảnh)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="mt-2 inline-block">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Chọn ảnh
                  </Button>
                </Label>
              </div>

              {/* Preview Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WriteReviewForm;
