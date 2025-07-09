
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const supportSchema = z.object({
  title: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Vui lòng chọn mức độ ưu tiên',
  }),
  category: z.enum(['technical', 'order', 'equipment', 'other'], {
    required_error: 'Vui lòng chọn loại vấn đề',
  }),
  description: z.string().min(20, 'Mô tả phải có ít nhất 20 ký tự'),
  orderId: z.string().optional(),
});

type SupportFormData = z.infer<typeof supportSchema>;

interface SupportRequestFormProps {
  onClose: () => void;
}

export function SupportRequestForm({ onClose }: SupportRequestFormProps) {
  const { toast } = useToast();
  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      title: '',
      priority: 'medium',
      category: 'other',
      description: '',
      orderId: '',
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Yêu cầu hỗ trợ đã được gửi',
        description: 'Quản lý sẽ phản hồi trong thời gian sớm nhất',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra',
        description: 'Không thể gửi yêu cầu hỗ trợ',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề yêu cầu hỗ trợ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mức độ ưu tiên</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ ưu tiên" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại vấn đề</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại vấn đề" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technical">Kỹ thuật</SelectItem>
                    <SelectItem value="order">Đơn hàng</SelectItem>
                    <SelectItem value="equipment">Thiết bị</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã đơn hàng (nếu có)</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mã đơn hàng liên quan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả chi tiết</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
