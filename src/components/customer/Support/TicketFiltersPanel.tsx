import React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { TicketFilters } from "@/types/support";

interface TicketFiltersPanelProps {
  filters: TicketFilters;
  onFiltersChange: (filters: TicketFilters) => void;
}

const TicketFiltersPanel: React.FC<TicketFiltersPanelProps> = ({
  filters,
  onFiltersChange,
}) => {
  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "open", label: "Mở" },
    { value: "in-progress", label: "Đang xử lý" },
    { value: "pending", label: "Chờ phản hồi" },
    { value: "resolved", label: "Đã giải quyết" },
    { value: "closed", label: "Đã đóng" },
  ];

  const categoryOptions = [
    { value: "all", label: "Tất cả loại" },
    { value: "technical", label: "Kỹ thuật" },
    { value: "billing", label: "Thanh toán" },
    { value: "general", label: "Chung" },
    { value: "complaint", label: "Khiếu nại" },
    { value: "feature-request", label: "Yêu cầu tính năng" },
  ];

  const priorityOptions = [
    { value: "all", label: "Tất cả ưu tiên" },
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
    { value: "urgent", label: "Khẩn cấp" },
  ];

  const updateFilter = (key: keyof TicketFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value === "all" ? undefined : value });
  };

  const clearFilter = (key: keyof TicketFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(
      (key) => filters[key as keyof TicketFilters]
    ).length;
  };

  const getFilterLabel = (key: string, value: string) => {
    switch (key) {
      case "status":
        return statusOptions.find((opt) => opt.value === value)?.label || value;
      case "category":
        return (
          categoryOptions.find((opt) => opt.value === value)?.label || value
        );
      case "priority":
        return (
          priorityOptions.find((opt) => opt.value === value)?.label || value
        );
      default:
        return value;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <Select
          value={filters.status || "all"}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger className="w-40 focus:ring-black/50 focus:border-black/10">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.category || "all"}
          onValueChange={(value) => updateFilter("category", value)}
        >
          <SelectTrigger className="w-40 focus:ring-black/50 focus:border-black/10">
            <SelectValue placeholder="Loại vấn đề" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority || "all"}
          onValueChange={(value) => updateFilter("priority", value)}
        >
          <SelectTrigger className="w-40 focus:ring-black/50 focus:border-black/10">
            <SelectValue placeholder="Ưu tiên" />
          </SelectTrigger>
          <SelectContent>
            {priorityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* More Filters */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
            {getActiveFiltersCount() > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Bộ lọc nâng cao</h4>
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Xóa tất cả
                </Button>
              )}
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-sm font-medium">Khoảng thời gian</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input
                  type="date"
                  className="text-sm border rounded px-2 py-1"
                  value={
                    filters.dateRange?.from?.toISOString().split("T")[0] || ""
                  }
                  onChange={(e) =>
                    updateFilter("dateRange", {
                      ...filters.dateRange,
                      from: e.target.value
                        ? new Date(e.target.value)
                        : undefined,
                    })
                  }
                />
                <input
                  type="date"
                  className="text-sm border rounded px-2 py-1"
                  value={
                    filters.dateRange?.to?.toISOString().split("T")[0] || ""
                  }
                  onChange={(e) =>
                    updateFilter("dateRange", {
                      ...filters.dateRange,
                      to: e.target.value ? new Date(e.target.value) : undefined,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;

            return (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {getFilterLabel(key, value as string)}
                <button
                  onClick={() => clearFilter(key as keyof TicketFilters)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicketFiltersPanel;
