import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const allTransactions = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    amount: 45.50,
    type: "owes_you",
    description: "Dinner at Olive Garden",
    category: "individual",
    date: "Dec 18, 2024",
    status: "pending"
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
    status: "pending"
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
    participants: ["Alex Johnson", "Mike Rodriguez", "Emma Wilson"]
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
    status: "pending"
  },
  {
    id: 5,
    name: "Roommates",
    avatar: "/api/placeholder/32/32",
    amount: 67.33,
    type: "you_owe",
    description: "Monthly utilities split",
    category: "group",
    date: "Dec 14, 2024",
    status: "pending",
    participants: ["Sarah Chen", "David Kim"]
  },
  {
    id: 6,
    name: "Emma Wilson",
    avatar: "/api/placeholder/32/32",
    amount: 15.20,
    type: "you_owe",
    description: "Uber ride home",
    category: "individual",
    date: "Dec 13, 2024",
    status: "pending"
  },
  {
    id: 7,
    name: "Travel Group",
    avatar: "/api/placeholder/32/32",
    amount: 150.00,
    type: "owes_you",
    description: "Hotel booking for weekend trip",
    category: "group", 
    date: "Dec 12, 2024",
    status: "pending",
    participants: ["Lisa Anderson", "David Kim", "Emma Wilson"]
  },
  {
    id: 8,
    name: "David Kim",
    avatar: "/api/placeholder/32/32",
    amount: 32.50,
    type: "you_owe",
    description: "Movie tickets and snacks",
    category: "individual",
    date: "Dec 11, 2024",
    status: "pending"
  },
  {
    id: 9,
    name: "Work Team",
    avatar: "/api/placeholder/32/32",
    amount: 45.80,
    type: "owes_you",
    description: "Team lunch at Thai place",
    category: "group",
    date: "Dec 10, 2024", 
    status: "pending",
    participants: ["Alex Johnson", "Lisa Anderson", "Mike Rodriguez"]
  },
  {
    id: 10,
    name: "Lisa Anderson",
    avatar: "/api/placeholder/32/32",
    amount: 28.90,
    type: "you_owe",
    description: "Birthday gift contribution",
    category: "individual",
    date: "Dec 9, 2024",
    status: "pending"
  },
  {
    id: 11,
    name: "College Friends",
    avatar: "/api/placeholder/32/32",
    amount: 75.60,
    type: "owes_you", 
    description: "Game night pizza and drinks",
    category: "group",
    date: "Dec 8, 2024",
    status: "pending",
    participants: ["Sarah Chen", "Mike Rodriguez", "Emma Wilson"]
  },
  {
    id: 12,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    amount: 89.40,
    type: "you_owe",
    description: "Weekend grocery shopping",
    category: "individual",
    date: "Dec 7, 2024",
    status: "pending"
  }
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState("all"); // all, owes_you, you_owe, individual, group

  const totalOwedToYou = allTransactions
    .filter((transaction) => transaction.type === "owes_you")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalYouOwe = allTransactions
    .filter((transaction) => transaction.type === "you_owe")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netBalance = totalOwedToYou - totalYouOwe;

  // Filter transactions based on selected filter
  const filteredTransactions = allTransactions.filter(transaction => {
    if (filter === "all") return true;
    if (filter === "owes_you" || filter === "you_owe") return transaction.type === filter;
    if (filter === "individual" || filter === "group") return transaction.category === filter;
    return true;
  });

  // Show limited transactions when collapsed, all when expanded
  const displayedTransactions = isExpanded ? filteredTransactions : filteredTransactions.slice(0, 4);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Dashboard</h1>
          <Button onClick={() => onNavigate("spending")}>
            View Spending
          </Button>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {netBalance >= 0 ? "+" : ""}$
                {netBalance.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                {netBalance >= 0
                  ? "You are owed more"
                  : "You owe more"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                You Are Owed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">
                +${totalOwedToYou.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                From{" "}
                {
                  allTransactions.filter(
                    (f) => f.type === "owes_you",
                  ).length
                }{" "}
                transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                You Owe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-red-600">
                -${totalYouOwe.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                To{" "}
                {
                  allTransactions.filter(
                    (f) => f.type === "you_owe",
                  ).length
                }{" "}
                transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Unsettled Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Unsettled Transactions</CardTitle>
                <CardDescription>
                  All pending payments and debts ({allTransactions.length} total)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="owes_you">They Owe You</SelectItem>
                    <SelectItem value="you_owe">You Owe</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <ScrollArea className={isExpanded ? "h-96" : "h-auto"}>
                <div className="space-y-4">
                  {displayedTransactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={transaction.avatar}
                              alt={transaction.name}
                            />
                            <AvatarFallback>
                              {transaction.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{transaction.name}</p>
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {transaction.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {transaction.description}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {transaction.date}
                              </span>
                              {transaction.participants && (
                                <span className="text-xs text-muted-foreground">
                                  With {transaction.participants.join(", ")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              transaction.type === "owes_you"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {transaction.type === "owes_you"
                              ? "Owes you"
                              : "You owe"}
                          </Badge>
                          <div
                            className={`text-lg mt-1 ${
                              transaction.type === "owes_you"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "owes_you" ? "+" : "-"}$
                            {transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      {index < displayedTransactions.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {filteredTransactions.length > 4 && (
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 h-8"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Show All {filteredTransactions.length} Transactions
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              )}
            </Collapsible>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions match the selected filter
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-12"
                onClick={() => onNavigate("add-expense")}
              >
                Add Expense
              </Button>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate("settle-up")}
              >
                Settle Up
              </Button>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate("send-reminder")}
              >
                Send Reminder
              </Button>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate("view-history")}
              >
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}