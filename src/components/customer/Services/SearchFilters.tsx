import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, Filter, X, CalendarIcon, MapPin, Users, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

interface FilterState {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
  location: string;
  dateRange: DateRange | undefined;
  guestCount: string;
  sortBy: string;
  viewType: 'grid' | 'list';
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isLoading?: boolean;
  resultCount?: number;
}

const SearchFilters = ({ filters, onFiltersChange, isLoading, resultCount }: SearchFiltersProps) => {
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Mock data
  const locations = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
    "Biên Hòa", "Huế", "Nha Trang", "Buôn Ma Thuột", "Quy Nhon"
  ];

  const categories = [
    { value: 'all', label: 'Tất cả dịch vụ' },
    { value: 'wedding', label: 'Tiệc cưới' },
    { value: 'birthday', label: 'Sinh nhật' },
    { value: 'corporate', label: 'Doanh nghiệp' },
    { value: 'anniversary', label: 'Kỷ niệm' },
    { value: 'conference', label: 'Hội nghị' }
  ];

  const guestCountOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: '1-20', label: '1-20 khách' },
    { value: '21-50', label: '21-50 khách' },
    { value: '51-100', label: '51-100 khách' },
    { value: '101-200', label: '101-200 khách' },
    { value: '200+', label: 'Trên 200 khách' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Tên A-Z' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'newest', label: 'Mới nhất' }
  ];

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length > 1) {
        // Mock autocomplete suggestions
        const suggestions = [
          'Tiệc cưới sang trọng',
          'Sinh nhật trẻ em',
          'Hội nghị doanh nghiệp',
          'Tiệc tốt nghiệp',
          'Tiệc kỷ niệm'
        ].filter(s => s.toLowerCase().includes(term.toLowerCase()));
        setSearchSuggestions(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(filters.searchTerm);
  }, [filters.searchTerm, debouncedSearch]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      category: 'all',
      priceRange: [0, 50000000],
      location: '',
      dateRange: undefined,
      guestCount: 'all',
      sortBy: 'name',
      viewType: filters.viewType
    });
    setShowSuggestions(false);
  };

  const activeFilterCount = [
    filters.category !== 'all',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 50000000,
    filters.location,
    filters.dateRange?.from || filters.dateRange?.to,
    filters.guestCount !== 'all'
  ].filter(Boolean).length;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dịch vụ tiệc..."
              value={filters.searchTerm}
              onChange={(e) => {
                updateFilter('searchTerm', e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10"
              aria-label="Tìm kiếm dịch vụ"
            />
          </div>
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {searchSuggestions.map((suggestion, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          updateFilter('searchTerm', suggestion);
                          setShowSuggestions(false);
                        }}
                        className="cursor-pointer"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {/* Filter Toggle & View Options */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex gap-2 flex-1">
            <Button
              variant={showAdvancedFilters ? "default" : "outline"}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex-shrink-0"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Bộ lọc {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
            
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} size="sm">
                <X className="mr-1 h-3 w-3" />
                Xóa bộ lọc
              </Button>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={filters.viewType === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => updateFilter('viewType', 'grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={filters.viewType === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => updateFilter('viewType', 'list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Loại tiệc</label>
              <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại tiệc" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Địa điểm</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    {filters.location || "Chọn địa điểm"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Tìm địa điểm..." />
                    <CommandList>
                      <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem onSelect={() => updateFilter('location', '')}>
                          Tất cả địa điểm
                        </CommandItem>
                        {locations.map((location) => (
                          <CommandItem
                            key={location}
                            onSelect={() => updateFilter('location', location)}
                          >
                            {location}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Guest Count Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Số lượng khách</label>
              <Select value={filters.guestCount} onValueChange={(value) => updateFilter('guestCount', value)}>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Chọn số khách" />
                </SelectTrigger>
                <SelectContent>
                  {guestCountOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Khoảng giá: {new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND' 
                }).format(filters.priceRange[0])} - {new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND' 
                }).format(filters.priceRange[1])}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={50000000}
                min={0}
                step={1000000}
                className="w-full"
              />
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Thời gian tổ chức</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange?.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                          {format(filters.dateRange.to, "dd/MM/yyyy", { locale: vi })}
                        </>
                      ) : (
                        format(filters.dateRange.from, "dd/MM/yyyy", { locale: vi })
                      )
                    ) : (
                      "Chọn ngày"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={filters.dateRange?.from}
                    selected={filters.dateRange}
                    onSelect={(range) => updateFilter('dateRange', range)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {/* Results Count */}
        {resultCount !== undefined && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-gray-600">
            <span>
              {isLoading ? "Đang tìm kiếm..." : `Tìm thấy ${resultCount} dịch vụ`}
            </span>
            
            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.category !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    {categories.find(c => c.value === filters.category)?.label}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter('category', 'all')} />
                  </Badge>
                )}
                {filters.location && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.location}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter('location', '')} />
                  </Badge>
                )}
                {filters.guestCount !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    {guestCountOptions.find(g => g.value === filters.guestCount)?.label}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter('guestCount', 'all')} />
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default SearchFilters;
export type { FilterState };
