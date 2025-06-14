
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Clock, 
  BarChart3,
  PieChart,
  Activity,
  Target
} from "lucide-react";

const AnalyticsDashboard = () => {
  const villageHeatmap = [
    { name: "Kondapally", complaints: 23, resolved: 18, population: 2400, heatLevel: "high" },
    { name: "Yellareddy", complaints: 15, resolved: 14, population: 1800, heatLevel: "medium" },
    { name: "Armoor", complaints: 8, resolved: 7, population: 3200, heatLevel: "low" },
    { name: "Banswada", complaints: 31, resolved: 22, population: 2100, heatLevel: "very-high" },
    { name: "Nizamabad", complaints: 12, resolved: 11, population: 2800, heatLevel: "medium" },
    { name: "Bodhan", complaints: 19, resolved: 15, population: 2200, heatLevel: "high" }
  ];

  const issueCategories = [
    { category: "Water Supply", count: 45, trend: "+12%", color: "bg-blue-500" },
    { category: "Roads", count: 38, trend: "+8%", color: "bg-orange-500" },
    { category: "Sanitation", count: 29, trend: "-5%", color: "bg-green-500" },
    { category: "Electricity", count: 22, trend: "+15%", color: "bg-yellow-500" },
    { category: "Infrastructure", count: 18, trend: "+3%", color: "bg-purple-500" }
  ];

  const monthlyTrends = [
    { month: "Jan", complaints: 89, resolved: 85 },
    { month: "Feb", complaints: 94, resolved: 91 },
    { month: "Mar", complaints: 108, resolved: 98 },
    { month: "Apr", complaints: 125, resolved: 118 },
    { month: "May", complaints: 134, resolved: 127 },
    { month: "Jun", complaints: 152, resolved: 139 }
  ];

  const getHeatColor = (level: string) => {
    switch (level) {
      case "very-high": return "bg-red-600";
      case "high": return "bg-red-400";
      case "medium": return "bg-orange-400";
      case "low": return "bg-green-400";
      default: return "bg-gray-400";
    }
  };

  const getHeatTextColor = (level: string) => {
    switch (level) {
      case "very-high": return "text-red-700";
      case "high": return "text-red-600";
      case "medium": return "text-orange-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-700">152</div>
            <div className="text-sm text-blue-600">Total Complaints</div>
            <Badge className="mt-1 bg-blue-500 text-white text-xs">+12% from last month</Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">91.4%</div>
            <div className="text-sm text-green-600">Resolution Rate</div>
            <Badge className="mt-1 bg-green-500 text-white text-xs">+2.3% improvement</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-700">2.1</div>
            <div className="text-sm text-orange-600">Avg Resolution Days</div>
            <Badge className="mt-1 bg-orange-500 text-white text-xs">-0.4 days faster</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-700">12.4K</div>
            <div className="text-sm text-purple-600">Citizens Reached</div>
            <Badge className="mt-1 bg-purple-500 text-white text-xs">+850 new users</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Village Heatmap */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Village Issue Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {villageHeatmap.map((village) => (
                <div key={village.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getHeatColor(village.heatLevel)}`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{village.name}</div>
                      <div className="text-xs text-gray-600">Population: {village.population.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getHeatTextColor(village.heatLevel)}`}>
                      {village.complaints}
                    </div>
                    <div className="text-xs text-gray-500">
                      {village.resolved} resolved
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-600 font-medium mb-2">Heat Level Legend:</div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Very High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Issue Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issueCategories.map((issue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${issue.color}`}></div>
                    <span className="font-medium text-gray-900">{issue.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">{issue.count}</span>
                    <Badge 
                      variant={issue.trend.startsWith('+') ? 'default' : 'secondary'}
                      className={issue.trend.startsWith('+') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                    >
                      {issue.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Monthly Complaint & Resolution Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {monthlyTrends.map((month) => (
              <div key={month.month} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{month.month}</div>
                <div className="space-y-2">
                  <div 
                    className="bg-red-400 rounded-t"
                    style={{ height: `${(month.complaints / 200) * 100}px` }}
                    title={`Complaints: ${month.complaints}`}
                  ></div>
                  <div 
                    className="bg-green-400 rounded-b"
                    style={{ height: `${(month.resolved / 200) * 100}px` }}
                    title={`Resolved: ${month.resolved}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs space-y-1">
                  <div className="text-red-600 font-semibold">{month.complaints}</div>
                  <div className="text-green-600 font-semibold">{month.resolved}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-400"></div>
              <span>Complaints Received</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-400"></div>
              <span>Complaints Resolved</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8" />
            <h3 className="text-xl font-bold">AI-Powered Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-2">Peak Complaint Time</div>
              <div>🕐 10-11 AM daily</div>
              <div className="text-xs opacity-80 mt-1">Citizens report issues after morning chores</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-2">Fastest Resolution</div>
              <div>⚡ Sanitation issues</div>
              <div className="text-xs opacity-80 mt-1">Average 1.2 days due to direct worker contact</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="font-semibold mb-2">Seasonal Trend</div>
              <div>🌧️ Water complaints +40%</div>
              <div className="text-xs opacity-80 mt-1">Monsoon season correlation detected</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
