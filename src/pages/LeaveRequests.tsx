import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

type LeaveRequest = {
  id: string;
  studentName: string;
  grade: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
};

export default function LeaveRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      studentName: "John Doe",
      grade: "Grade 10",
      reason: "Medical appointment",
      fromDate: "2024-03-25",
      toDate: "2024-03-25",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      grade: "Grade 9",
      reason: "Family emergency",
      fromDate: "2024-03-26",
      toDate: "2024-03-28",
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "approved" as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "rejected" as const } : req
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Requests</h1>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{request.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{request.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Reason:</p>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>From: {request.fromDate}</span>
                    <span>To: {request.toDate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge 
                    variant={
                      request.status === "approved" ? "default" : 
                      request.status === "rejected" ? "destructive" : 
                      "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(request.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
