import { LoyaltyPoint } from "@/types/loyaltyPoint";

// Dữ liệu mẫu
const mockLoyaltyPoints: LoyaltyPoint[] = [
  {
    id: "1",
    userId: "1",
    points: 100,
    type: "REVIEW",
    description: "Đánh giá dịch vụ tiệc cưới",
    createdAt: "2024-01-15T10:30:00Z",
    orderId: "DH-2024-001",
  },
  {
    id: "2",
    userId: "1",
    points: 50,
    type: "BOOKING",
    description: "Đặt dịch vụ tiệc cưới",
    createdAt: "2024-01-14T15:20:00Z",
    orderId: "DH-2024-001",
  },
  {
    id: "3",
    userId: "1",
    points: 200,
    type: "REVIEW",
    description: "Đánh giá dịch vụ trang trí",
    createdAt: "2024-01-13T09:15:00Z",
    orderId: "DH-2024-002",
  },
];

export const loyaltyPointService = {
  // Lấy tổng điểm và lịch sử điểm thưởng
  getLoyaltyPoints: async (
    userId: string
  ): Promise<{ totalPoints: number; history: LoyaltyPoint[] }> => {
    // Lọc điểm thưởng theo userId
    const userPoints = mockLoyaltyPoints.filter(
      (point) => point.userId === userId
    );

    // Tính tổng điểm
    const totalPoints = userPoints.reduce(
      (sum, point) => sum + point.points,
      0
    );

    // Sắp xếp theo thời gian mới nhất
    const history = [...userPoints].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return {
      totalPoints,
      history,
    };
  },

  // Tính điểm thưởng cho đơn hàng
  calculateOrderPoints: async (orderId: string): Promise<number> => {
    // Tạm thời trả về điểm cố định
    return 50;
  },

  // Lấy lịch sử điểm theo khoảng thời gian
  getLoyaltyPointsByDateRange: async (
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<LoyaltyPoint[]> => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return mockLoyaltyPoints.filter((point) => {
      const pointDate = new Date(point.createdAt);
      return point.userId === userId && pointDate >= start && pointDate <= end;
    });
  },
};
