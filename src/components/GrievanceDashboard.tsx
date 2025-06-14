
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ArrowUp, 
  User, 
  MapPin,
  Calendar,
  Star,
  Bell
} from "lucide-react";

const GrievanceDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const grievances = [
    {
      id: "GR001",
      title: "Water supply disruption - Kondapally",
      citizen: "Ramesh Goud",
      category: "Water Supply",
      priority: "high",
      status: "escalated",
      assignedTo: "AE, PHED",
      daysOpen: 4,
      deadline: "Today",
      satisfaction: null,
      description: "No water supply for the past 3 days in Ward 5"
    },
    {
      id: "GR002", 
      title: "Street light maintenance - Yellareddy",
      citizen: "Lakshmi Devi",
      category: "Infrastructure",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Electrical Dept",
      daysOpen: 2,
      deadline: "Tomorrow",
      satisfaction: null,
      description: "5 street lights not working near temple area"
    },
    {
      id: "GR003",
      title: "Garbage collection delay - Armoor",
      citizen: "Venkat Rao", 
      category: "Sanitation",
      priority: "medium",
      status: "resolved",
      assignedTo: "Municipal Worker",
      daysOpen: 1,
      deadline: "Completed",
      satisfaction: 4,
      description: "Garbage not collected for a week in main market"
    },
    {
      id: "GR004",
      title: "Road repair needed - Banswada",
      citizen: "Anjali Sharma",
      category: "Roads",
      priority: "high",
      status: "assigned",
      assignedTo: "PWD Engineer",
      daysOpen: 6,
      deadline: "Overdue",
      satisfaction: null,
      description: "Large potholes causing vehicle damage on main road"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-500"; 
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "escalated": return "bg-red-100 text-red-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "assigned": return "bg-orange-100 text-orange-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDeadlineColor = (deadline: string) => {
    switch (deadline) {
      case "Overdue": return "text-red-600 font-semibold";
      case "Today": return "text-orange-600 font-semibold";
      case "Tomorrow": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const filteredGrievances = selectedFilter === "all" 
    ? grievances 
    : grievances.filter(g => g.status === selectedFilter);

  const escalationQueue = grievances.filter(g => g.daysOpen > 3 && g.status !== "resolved");

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-700">
              {grievances.filter(g => g.status === "escalated").length}
            </div>
            <div className="text-sm text-red-600">Escalated</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-700">
              {grievances.filter(g => g.status === "in-progress").length}
            </div>
            <div className="text-sm text-orange-600">In Progress</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">
              {grievances.filter(g => g.status === "resolved").length}
            </div>
            <div className="text-sm text-green-600">Resolved Today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <ArrowUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-700">
              {escalationQueue.length}
            </div>
            <div className="text-sm text-purple-600">Auto-Escalation Queue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {["all", "escalated", "in-progress", "assigned", "resolved"].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className="capitalize"
          >
            {filter.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Grievance List */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Active Grievances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrievances.map((grievance) => (
                  <div key={grievance.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{grievance.title}</span>
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(grievance.priority)}`}></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{grievance.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {grievance.citizen}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {grievance.daysOpen} days open
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(grievance.status)}>
                        {grievance.status.replace("-", " ")}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned to: </span>
                        <span className="font-medium">{grievance.assignedTo}</span>
                      </div>
                      <div className={`text-sm ${getDeadlineColor(grievance.deadline)}`}>
                        {grievance.deadline}
                      </div>
                    </div>

                    {grievance.satisfaction && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-xs text-gray-600">Citizen Rating:</span>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < grievance.satisfaction! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Escalation & Analytics */}
        <div className="space-y-6">
          {/* Auto-Escalation Alert */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <ArrowUp className="h-5 w-5" />
                Auto-Escalation Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {escalationQueue.map((item) => (
                  <div key={item.id} className="p-3 bg-white/80 rounded-lg border-l-4 border-red-500">
                    <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.daysOpen} days overdue → Escalating to higher official
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                Process Escalations
              </Button>
            </CardContent>
          </Card>

          {/* Resolution Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Resolution Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>This Week</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>This Month</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Citizen Satisfaction</span>
                    <span>4.2/5</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDashboard;
