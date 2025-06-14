
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Filter, 
  Search, 
  Download, 
  MapPin, 
  Clock, 
  User, 
  Star,
  Mic,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Eye,
  TrendingUp
} from "lucide-react";

const AllComplaints = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null);

  const complaints = [
    {
      id: "VC001",
      citizen: "Ramesh Goud",
      phone: "+91 9876543210",
      village: "Kondapally",
      issue: "Water supply irregular for 3 days. Many families affected.",
      status: "processing",
      priority: "high",
      time: "2 mins ago",
      language: "Telugu",
      category: "Water Supply",
      audioLength: "2:34",
      transcript: "మా గ్రామంలో మూడు రోజులుగా నీటి సమస్య ఉంది. చాలా కుటుంబాలు ప్రభావితమయ్యాయి.",
      assignedTo: "Water Department - Mr. Kumar",
      satisfaction: null,
      response: null
    },
    {
      id: "VC002", 
      citizen: "Lakshmi Devi",
      phone: "+91 9876543211",
      village: "Yellareddy",
      issue: "Street lights not working near temple area for a week",
      status: "assigned",
      priority: "medium",
      time: "8 mins ago",
      language: "Telugu",
      category: "Infrastructure", 
      audioLength: "1:45",
      transcript: "దేవాలయం దగ్గర వీధి దీపాలు పని చేయడం లేదు. ఒక వారంగా చీకటిగా ఉంది.",
      assignedTo: "Electrical Department - Ms. Priya",
      satisfaction: null,
      response: "Engineers dispatched. Expected resolution by tomorrow."
    },
    {
      id: "VC003",
      citizen: "Venkat Rao",
      phone: "+91 9876543212", 
      village: "Armoor",
      issue: "Garbage not collected for a week in main market area",
      status: "resolved",
      priority: "medium",
      time: "15 mins ago",
      language: "Hindi",
      category: "Sanitation",
      audioLength: "3:12",
      transcript: "मुख्य बाजार में एक सप्ताह से कचरा नहीं उठाया गया है। बहुत गंदगी हो गई है।",
      assignedTo: "Sanitation Department - Mr. Reddy",
      satisfaction: 4,
      response: "Garbage collection team deployed. Area cleaned and sanitized."
    },
    {
      id: "VC004",
      citizen: "Anjali Sharma", 
      phone: "+91 9876543213",
      village: "Banswada",
      issue: "Road has big potholes causing vehicle damage",
      status: "escalated",
      priority: "high",
      time: "1 hour ago",
      language: "English",
      category: "Roads",
      audioLength: "2:56",
      transcript: "The main road has developed several large potholes. Many vehicles have been damaged.",
      assignedTo: "PWD - District Engineer",
      satisfaction: null,
      response: null
    },
    {
      id: "VC005",
      citizen: "Srinivas Goud",
      phone: "+91 9876543214",
      village: "Kondapally", 
      issue: "Primary school needs urgent repair work",
      status: "in-progress",
      priority: "high",
      time: "2 hours ago",
      language: "Telugu",
      category: "Education",
      audioLength: "4:23",
      transcript: "ప్రాథమిక పాఠశాల భవనం చాలా చెడిపోయింది. పిల్లలకు ప్రమాదం ఉంది.",
      assignedTo: "Education Department - Ms. Sudhha",
      satisfaction: null,
      response: "Structural engineer assessment scheduled for tomorrow."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-blue-500";
      case "assigned": return "bg-orange-500";
      case "in-progress": return "bg-purple-500";
      case "escalated": return "bg-red-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = selectedFilter === "all" || complaint.status === selectedFilter;
    const matchesSearch = complaint.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.issue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: complaints.length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    pending: complaints.filter(c => c.status !== "resolved").length,
    escalated: complaints.filter(c => c.status === "escalated").length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
            <div className="text-sm text-blue-600">Total Complaints</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">{stats.resolved}</div>
            <div className="text-sm text-green-600">Resolved</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-700">{stats.pending}</div>
            <div className="text-sm text-orange-600">Pending</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-700">{stats.escalated}</div>
            <div className="text-sm text-red-600">Escalated</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by citizen, village, or issue..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select 
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-orange-600" />
                Voice Complaints ({filteredComplaints.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredComplaints.map((complaint, index) => (
                  <div 
                    key={complaint.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedComplaint === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedComplaint(selectedComplaint === index ? null : index)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{complaint.citizen}</span>
                          <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                            {complaint.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {complaint.language}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {complaint.village}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {complaint.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mic className="h-4 w-4" />
                            {complaint.audioLength}
                          </div>
                        </div>
                        
                        <p className="text-gray-800 mb-2">{complaint.issue}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                            Priority: {complaint.priority.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {complaint.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedComplaint === index && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-fade-in">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Original Transcript:</h4>
                          <p className="text-sm text-gray-700 italic bg-gray-50 p-2 rounded">
                            "{complaint.transcript}"
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Contact:</span>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3" />
                              {complaint.phone}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Assigned To:</span>
                            <p className="text-blue-600 mt-1">{complaint.assignedTo}</p>
                          </div>
                        </div>

                        {complaint.response && (
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Official Response:</h4>
                            <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                              {complaint.response}
                            </p>
                          </div>
                        )}

                        {complaint.satisfaction && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Citizen Rating:</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < complaint.satisfaction! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Contact Citizen
                          </Button>
                          {complaint.status !== "resolved" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <TrendingUp className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolution Rate</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg Response Time</span>
                    <span className="font-semibold">2.4 hrs</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Citizen Satisfaction</span>
                    <span className="font-semibold">4.2/5</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-sm">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Water Supply</span>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Infrastructure</span>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sanitation</span>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Roads</span>
                  <Badge variant="outline">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllComplaints;
