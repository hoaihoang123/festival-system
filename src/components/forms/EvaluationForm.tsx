import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  employeeName: z
    .string()
    .min(2, { message: "Tên nhân viên phải có ít nhất 2 ký tự." }),
  evaluator: z
    .string()
    .min(2, { message: "Tên người đánh giá phải có ít nhất 2 ký tự." }),
  date: z.date({ required_error: "Vui lòng chọn ngày đánh giá." }),
  score: z.coerce
    .number()
    .min(0, { message: "Điểm phải lớn hơn hoặc bằng 0." })
    .max(100, { message: "Điểm phải nhỏ hơn hoặc bằng 100." }),
  comments: z
    .string()
    .min(10, { message: "Bình luận phải có ít nhất 10 ký tự." }),
  kpisAchieved: z.string().optional(), // Can be a comma-separated string for simplicity, or a more complex array later
});

interface EvaluationFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export function EvaluationForm({ onSubmit, onCancel }: EvaluationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      evaluator: "",
      date: new Date(),
      score: 0,
      comments: "",
      kpisAchieved: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted", values);
    toast({
      title: "Tạo đánh giá thành công!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onSubmit(values); // Call the onSubmit prop with form data
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên nhân viên</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Nguyễn Văn A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="evaluator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Người đánh giá</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Quản lý X" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày đánh giá</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Điểm số (0-100)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ví dụ: 85" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bình luận</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập bình luận chi tiết về hiệu suất..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kpisAchieved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>KPIs đã đạt được (ngăn cách bởi dấu phẩy)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ví dụ: Hoàn thành mục tiêu X, Cải thiện kỹ năng Y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Liệt kê các KPI hoặc mục tiêu mà nhân viên đã đạt được.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit">Tạo đánh giá</Button>
        </div>
      </form>
    </Form>
  );
}
