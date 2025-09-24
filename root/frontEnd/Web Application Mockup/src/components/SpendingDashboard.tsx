import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface SpendingDashboardProps {
  onNavigate: (page: string) => void;
}

const categoryData = [
  { name: "Food & Dining", value: 425, color: "#8884d8" },
  { name: "Transportation", value: 180, color: "#82ca9d" },
  { name: "Entertainment", value: 320, color: "#ffc658" },
  { name: "Groceries", value: 240, color: "#ff7c7c" },
  { name: "Utilities", value: 150, color: "#8dd1e1" }
];

const monthlySpending = [
  { month: "Jul", amount: 1200 },
  { month: "Aug", amount: 1450 },
  { month: "Sep", amount: 1315 },
  { month: "Oct", amount: 1680 },
  { month: "Nov", amount: 1520 },
  { month: "Dec", amount: 1315 }
];

const groupInteractions = [
  {
    id: 1,
    name: "College Friends",
    avatar: "/api/placeholder/32/32",
    expenses: 8,
    totalAmount: 425.50,
    lastActivity: "2 days ago"
  },
  {
    id: 2,
    name: "Roommates",
    avatar: "/api/placeholder/32/32",
    expenses: 12,
    totalAmount: 680.75,
    lastActivity: "1 day ago"
  },
  {
    id: 3,
    name: "Work Team",
    avatar: "/api/placeholder/32/32",
    expenses: 5,
    totalAmount: 210.20,
    lastActivity: "5 days ago"
  },
  {
    id: 4,
    name: "Travel Group",
    avatar: "/api/placeholder/32/32",
    expenses: 3,
    totalAmount: 1200.00,
    lastActivity: "1 week ago"
  }
];

const monthlyBudget = 2000;
const currentSpending = 1315;

export function SpendingDashboard({ onNavigate }: SpendingDashboardProps) {
  const budgetUsed = (currentSpending / monthlyBudget) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Spending Analytics</h1>
            <p className="text-muted-foreground">December 2024</p>
          </div>
          <Button onClick={() => onNavigate("landing")}>
            Back to Dashboard
          </Button>
        </div>

        {/* Monthly Budget Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>
              Track your spending against your monthly budget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Spent this month</span>
                <span className="text-2xl">${currentSpending}</span>
              </div>
              <Progress value={budgetUsed} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${currentSpending} spent</span>
                <span>${monthlyBudget - currentSpending} remaining</span>
              </div>
              <div className="text-center">
                <Badge variant={budgetUsed > 80 ? "destructive" : budgetUsed > 60 ? "secondary" : "default"}>
                  {budgetUsed.toFixed(1)}% of budget used
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                Your expenses broken down by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      ${category.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trend</CardTitle>
              <CardDescription>
                Your spending over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Spending']} />
                    <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups with Most Interactions */}
        <Card>
          <CardHeader>
            <CardTitle>Groups with Most Activity</CardTitle>
            <CardDescription>
              Groups you've shared the most expenses with this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupInteractions.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.avatar} alt={group.name} />
                      <AvatarFallback>
                        {group.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {group.expenses} expenses • Last activity {group.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">${group.totalAmount.toFixed(2)}</div>
                    <Badge variant="outline">
                      {group.expenses} expenses
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">24</div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">$54.71</div>
              <p className="text-sm text-muted-foreground">Avg per Expense</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">8</div>
              <p className="text-sm text-muted-foreground">Active Groups</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl">15</div>
              <p className="text-sm text-muted-foreground">Friends Involved</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}