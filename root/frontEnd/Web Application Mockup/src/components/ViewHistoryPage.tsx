import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Search, CalendarIcon, Filter, Download, Eye } from "lucide-react";
import { format } from "date-fns";

interface ViewHistoryPageProps {
  onNavigate: (page: string) => void;
}

const allTransactionHistory = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    amount: 45.50,
    type: "owes_you",
    description: "Dinner at Olive Garden",
    category: "individual",
    date: "Dec 18, 2024",
    status: "pending",
    paidBy: "you"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/api/placeholder/32/32", 
    amount: 23.75,
    type: "you_owe",
    description: "Coffee and groceries",
    category: "individual",
    date: "Dec 17, 2024",
    status: "pending",
    paidBy: "them"
  },
  {
    id: 3,
    name: "College Friends",
    avatar: "/api/placeholder/32/32",
    amount: 85.25,
    type: "owes_you",
    description: "Group dinner at Italian restaurant",
    category: "group",
    date: "Dec 16, 2024",
    status: "pending",
    participants: ["Alex Johnson", "Mike Rodriguez", "Emma Wilson"],
    paidBy: "you"
  },
  {
    id: 4,
    name: "Mike Rodriguez",
    avatar: "/api/placeholder/32/32",
    amount: 120.00,
    type: "owes_you",
    description: "Concert tickets",
    category: "individual", 
    date: "Dec 15, 2024",
    status: "pending",
    paidBy: "you"
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/api/placeholder/32/32",
    amount: 67.80,
    type: "you_owe",
    description: "Weekend brunch split",
    category: "individual",
    date: "Dec 14, 2024", 
    status: "settled",
    paidBy: "them",
    settledDate: "Dec 16, 2024"
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "/api/placeholder/32/32",
    amount: 95.20,
    type: "owes_you",
    description: "Shared taxi to airport",
    category: "individual",
    date: "Dec 13, 2024",
    status: "settled", 
    paidBy: "you",
    settledDate: "Dec 15, 2024"
  },
  {
    id: 7,
    name: "Roommates",
    avatar: "/api/placeholder/32/32",
    amount: 180.00,
    type: "you_owe",
    description: "November utilities bill",
    category: "group",
    date: "Dec 1, 2024",
    status: "settled",
    participants: ["Sarah Chen", "David Kim"],
    paidBy: "Sarah Chen", 
    settledDate: "Dec 5, 2024"
  },
  {
    id: 8,
    name: "Lisa Anderson",
    avatar: "/api/placeholder/32/32",
    amount: 42.30,
    type: "owes_you",
    description: "Shared office lunch",
    category: "individual",
    date: "Nov 28, 2024",
    status: "settled",
    paidBy: "you",
    settledDate: "Dec 1, 2024"
  },
  {
    id: 9,
    name: "Work Team", 
    avatar: "/api/placeholder/32/32",
    amount: 76.50,
    type: "owes_you",
    description: "Team happy hour drinks",
    category: "group",
    date: "Nov 25, 2024",
    status: "settled",
    participants: ["Alex Johnson", "Lisa Anderson", "Mike Rodriguez"],
    paidBy: "you",
    settledDate: "Nov 30, 2024"
  },
  {
    id: 10,
    name: "Travel Group",
    avatar: "/api/placeholder/32/32",
    amount: 320.00,
    type: "you_owe", 
    description: "Hotel booking for Vegas trip",
    category: "group",
    date: "Nov 20, 2024",
    status: "settled",
    participants: ["Lisa Anderson", "David Kim", "Emma Wilson"],
    paidBy: "Lisa Anderson",
    settledDate: "Nov 25, 2024"
  }
];

export function ViewHistoryPage({ onNavigate }: ViewHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Filter transactions based on all filters
  const filteredTransactions = allTransactionHistory.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    
    // Date filtering (simple string comparison for demo)
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const transactionDate = new Date(transaction.date);
      if (dateFrom && transactionDate < dateFrom) matchesDate = false;
      if (dateTo && transactionDate > dateTo) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesDate;
  });

  const totalTransactions = filteredTransactions.length;
  const settledCount = filteredTransactions.filter(t => t.status === "settled").length;
  const pendingCount = filteredTransactions.filter(t => t.status === "pending").length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Transaction History</h1>
            <p className="text-muted-foreground">
              Complete history of all your expenses and settlements
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={() => onNavigate("landing")}>
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">{totalTransactions}</div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl text-green-600">{settledCount}</div>
              <p className="text-sm text-muted-foreground">Settled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl text-orange-600">{pendingCount}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="settled">Settled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="owes_you">They Owe You</SelectItem>
                    <SelectItem value="you_owe">You Owe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "MMM dd") : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "MMM dd") : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                  setCategoryFilter("all");
                  setDateFrom(undefined);
                  setDateTo(undefined);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Transactions ({totalTransactions})</CardTitle>
              <CardDescription>
                {searchQuery || statusFilter !== "all" || typeFilter !== "all" || categoryFilter !== "all" || dateFrom || dateTo
                  ? `Showing ${totalTransactions} filtered results`
                  : "All your transaction history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredTransactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={transaction.avatar} alt={transaction.name} />
                            <AvatarFallback>
                              {transaction.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{transaction.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {transaction.category}
                              </Badge>
                              <Badge 
                                variant={transaction.status === "settled" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{transaction.description}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">{transaction.date}</span>
                              {transaction.participants && (
                                <span className="text-xs text-muted-foreground">
                                  With {transaction.participants.join(", ")}
                                </span>
                              )}
                              {transaction.status === "settled" && (
                                <span className="text-xs text-green-600">
                                  Settled: {transaction.settledDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant={transaction.type === "owes_you" ? "default" : "secondary"}>
                              {transaction.type === "owes_you" ? "Owes you" : "You owe"}
                            </Badge>
                            <div className={`text-lg mt-1 ${
                              transaction.type === "owes_you" ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === "owes_you" ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {index < filteredTransactions.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                  
                  {filteredTransactions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions found matching your filters
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedTransaction.avatar} />
                    <AvatarFallback>
                      {selectedTransaction.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedTransaction.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedTransaction.description}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">${selectedTransaction.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedTransaction.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant={selectedTransaction.status === "settled" ? "default" : "secondary"}>
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Paid by</p>
                    <p className="font-medium">{selectedTransaction.paidBy}</p>
                  </div>
                  {selectedTransaction.participants && (
                    <>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Participants</p>
                        <p className="font-medium">{selectedTransaction.participants.join(", ")}</p>
                      </div>
                    </>
                  )}
                  {selectedTransaction.settledDate && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Settled Date</p>
                      <p className="font-medium text-green-600">{selectedTransaction.settledDate}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}