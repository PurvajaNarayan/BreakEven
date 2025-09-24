import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CheckCircle, AlertCircle } from "lucide-react";

interface SettleUpPageProps {
  onNavigate: (page: string) => void;
}

const settleableTransactions = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    totalAmount: 45.50,
    type: "owes_you",
    transactions: [
      { id: 1, description: "Dinner at Olive Garden", amount: 45.50, date: "Dec 18, 2024" }
    ]
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/api/placeholder/32/32", 
    totalAmount: 23.75,
    type: "you_owe",
    transactions: [
      { id: 2, description: "Coffee and groceries", amount: 23.75, date: "Dec 17, 2024" }
    ]
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    avatar: "/api/placeholder/32/32",
    totalAmount: 120.00,
    type: "owes_you",
    transactions: [
      { id: 4, description: "Concert tickets", amount: 120.00, date: "Dec 15, 2024" }
    ]
  },
  {
    id: 4,
    name: "Emma Wilson", 
    avatar: "/api/placeholder/32/32",
    totalAmount: 47.70,
    type: "you_owe",
    transactions: [
      { id: 6, description: "Uber ride home", amount: 15.20, date: "Dec 13, 2024" },
      { id: 13, description: "Lunch split", amount: 32.50, date: "Dec 5, 2024" }
    ]
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "/api/placeholder/32/32",
    totalAmount: 32.50,
    type: "you_owe",
    transactions: [
      { id: 8, description: "Movie tickets and snacks", amount: 32.50, date: "Dec 11, 2024" }
    ]
  }
];

export function SettleUpPage({ onNavigate }: SettleUpPageProps) {
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handlePersonSelection = (personId: number, checked: boolean) => {
    if (checked) {
      setSelectedPeople([...selectedPeople, personId]);
    } else {
      setSelectedPeople(selectedPeople.filter(id => id !== personId));
    }
  };

  const getSelectedTotal = () => {
    return settleableTransactions
      .filter(person => selectedPeople.includes(person.id))
      .reduce((total, person) => {
        return person.type === "owes_you" ? total + person.totalAmount : total - person.totalAmount;
      }, 0);
  };

  const getSelectedTransactions = () => {
    return settleableTransactions.filter(person => selectedPeople.includes(person.id));
  };

  const handleSettleUp = () => {
    // Here you would typically process the settlement
    alert(`Successfully settled up with ${selectedPeople.length} people!`);
    setSelectedPeople([]);
    setConfirmDialogOpen(false);
    onNavigate("landing");
  };

  const selectedTotal = getSelectedTotal();
  const selectedTransactionsList = getSelectedTransactions();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Settle Up</h1>
            <p className="text-muted-foreground">
              Select people to settle outstanding balances with
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("landing")}>
            Cancel
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedPeople.length > 0 && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {selectedPeople.length} people selected. Net settlement: 
              <span className={`ml-1 font-medium ${selectedTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {selectedTotal >= 0 ? '+' : ''}${selectedTotal.toFixed(2)}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* People to Settle With */}
        <Card>
          <CardHeader>
            <CardTitle>Outstanding Balances</CardTitle>
            <CardDescription>
              Choose who you'd like to settle up with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settleableTransactions.map((person, index) => (
              <div key={person.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`person-${person.id}`}
                      checked={selectedPeople.includes(person.id)}
                      onCheckedChange={(checked) => 
                        handlePersonSelection(person.id, checked as boolean)
                      }
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {person.transactions.length} transaction{person.transactions.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={person.type === "owes_you" ? "default" : "secondary"}>
                      {person.type === "owes_you" ? "Owes you" : "You owe"}
                    </Badge>
                    <div className={`text-lg mt-1 ${
                      person.type === "owes_you" ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {person.type === "owes_you" ? '+' : '-'}${person.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                {/* Transaction Details */}
                {selectedPeople.includes(person.id) && (
                  <div className="ml-12 mt-3 space-y-2">
                    {person.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center text-sm border-l-2 border-muted pl-3">
                        <span className="text-muted-foreground">{transaction.description}</span>
                        <span>${transaction.amount.toFixed(2)} • {transaction.date}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {index < settleableTransactions.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settlement Actions */}
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={() => onNavigate("landing")}
          >
            Cancel
          </Button>
          
          <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                disabled={selectedPeople.length === 0}
                className="min-w-32"
              >
                Settle Up ({selectedPeople.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Settlement</DialogTitle>
                <DialogDescription>
                  Are you sure you want to settle up with the selected people?
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  {selectedTransactionsList.map((person) => (
                    <div key={person.id} className="flex justify-between items-center">
                      <span>{person.name}</span>
                      <span className={person.type === "owes_you" ? 'text-green-600' : 'text-red-600'}>
                        {person.type === "owes_you" ? '+' : '-'}${person.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-medium">
                    <span>Net Settlement</span>
                    <span className={selectedTotal >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {selectedTotal >= 0 ? '+' : ''}${selectedTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This will mark these transactions as settled and cannot be undone.
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSettleUp}>
                  Confirm Settlement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}