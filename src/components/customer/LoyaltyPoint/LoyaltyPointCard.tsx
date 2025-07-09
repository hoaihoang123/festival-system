import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";
import { LoyaltyPoint } from "@/types/loyaltyPoint";

interface LoyaltyPointCardProps {
  totalPoints: number;
  history: LoyaltyPoint[];
}

const LoyaltyPointCard = ({ totalPoints, history }: LoyaltyPointCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Điểm thưởng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1">Tổng điểm thưởng</h3>
          <p className="text-3xl font-bold">{totalPoints}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Lịch sử điểm thưởng</h4>
          <ScrollArea className="max-h-[150px] pr-4">
            <div className="space-y-4">
              {history.map((point) => (
                <div
                  key={point.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Badge variant="outline" className="mt-1">
                    {point.type}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{point.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(point.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <span className="font-semibold text-green-600">
                    +{point.points}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyPointCard;
