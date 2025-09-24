import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AddExpensePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  "Food & Dining",
  "Transportation", 
  "Entertainment",
  "Groceries",
  "Utilities",
  "Shopping",
  "Travel",
  "Healthcare",
  "Other"
];

const friends = [
  { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
  { id: 2, name: "Sarah Chen", avatar: "/api/placeholder/32/32" },
  { id: 3, name: "Mike Rodriguez", avatar: "/api/placeholder/32/32" },
  { id: 4, name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
  { id: 5, name: "David Kim", avatar: "/api/placeholder/32/32" },
  { id: 6, name: "Lisa Anderson", avatar: "/api/placeholder/32/32" }
];

const groups = [
  { 
    id: 1, 
    name: "College Friends", 
    members: [1, 2, 3, 4],
    avatar: "/api/placeholder/32/32"
  },
  { 
    id: 2, 
    name: "Roommates", 
    members: [2, 5],
    avatar: "/api/placeholder/32/32"
  },
  { 
    id: 3, 
    name: "Work Team", 
    members: [1, 3, 6],
    avatar: "/api/placeholder/32/32"
  },
  { 
    id: 4, 
    name: "Travel Group", 
    members: [1, 4, 5, 6],
    avatar: "/api/placeholder/32/32"
  }
];

export function AddExpensePage({ onNavigate }: AddExpensePageProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [expenseType, setExpenseType] = useState("personal"); // personal, friends, group
  const [splitType, setSplitType] = useState("equal"); // equal, exact, percentage
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<number[]>([]);
  const [paidBy, setPaidBy] = useState("me");
  const [customAmounts, setCustomAmounts] = useState<Record<number, string>>({});

  const handleFriendSelection = (friendId: number, checked: boolean) => {
    if (checked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    }
  };

  const handleGroupSelection = (groupId: string) => {
    const group = groups.find(g => g.id === parseInt(groupId));
    if (group) {
      setSelectedGroup(group.id);
      setSelectedGroupMembers(group.members);
    }
  };

  const handleGroupMemberSelection = (memberId: number, checked: boolean) => {
    if (checked) {
      setSelectedGroupMembers([...selectedGroupMembers, memberId]);
    } else {
      setSelectedGroupMembers(selectedGroupMembers.filter(id => id !== memberId));
    }
  };

  const getParticipants = () => {
    const participants = [{ id: 0, name: "You", avatar: "" }];
    
    if (expenseType === "friends") {
      participants.push(...friends.filter(f => selectedFriends.includes(f.id)));
    } else if (expenseType === "group") {
      participants.push(...friends.filter(f => selectedGroupMembers.includes(f.id)));
    }
    
    return participants;
  };

  const calculateSplit = () => {
    const participants = getParticipants();
    const totalAmount = parseFloat(amount) || 0;
    
    if (splitType === "equal") {
      const splitAmount = totalAmount / participants.length;
      return participants.reduce((acc, p) => {
        acc[p.id] = splitAmount.toFixed(2);
        return acc;
      }, {} as Record<number, string>);
    }
    
    return customAmounts;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the expense
    alert("Expense added successfully!");
    onNavigate("landing");
  };

  const participants = getParticipants();
  const splits = calculateSplit();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Add Expense</h1>
          <Button variant="outline" onClick={() => onNavigate("landing")}>
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What was this expense for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Expense Type */}
          <Card>
            <CardHeader>
              <CardTitle>Who is involved?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={expenseType} onValueChange={setExpenseType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal">Just me (personal expense)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends">With friends</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group">With a group</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Friend/Group Selection */}
          {expenseType === "friends" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`friend-${friend.id}`}
                        checked={selectedFriends.includes(friend.id)}
                        onCheckedChange={(checked) => 
                          handleFriendSelection(friend.id, checked as boolean)
                        }
                      />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Label htmlFor={`friend-${friend.id}`} className="text-sm">
                        {friend.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {expenseType === "group" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedGroup?.toString()} onValueChange={handleGroupSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedGroup && (
                  <div className="space-y-3">
                    <Label>Select members from the group:</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {friends
                        .filter(f => groups.find(g => g.id === selectedGroup)?.members.includes(f.id))
                        .map((member) => (
                          <div key={member.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`member-${member.id}`}
                              checked={selectedGroupMembers.includes(member.id)}
                              onCheckedChange={(checked) => 
                                handleGroupMemberSelection(member.id, checked as boolean)
                              }
                            />
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <Label htmlFor={`member-${member.id}`} className="text-sm">
                              {member.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Split Configuration */}
          {expenseType !== "personal" && participants.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>How should this be split?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={splitType} onValueChange={setSplitType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equal" id="equal" />
                    <Label htmlFor="equal">Split equally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exact" id="exact" />
                    <Label htmlFor="exact">Enter exact amounts</Label>
                  </div>
                </RadioGroup>

                <Separator />

                <div className="space-y-3">
                  <h4>Split breakdown:</h4>
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{participant.name}</span>
                      </div>
                      
                      {splitType === "equal" ? (
                        <Badge variant="outline">
                          ${splits[participant.id] || "0.00"}
                        </Badge>
                      ) : (
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-24"
                          value={customAmounts[participant.id] || ""}
                          onChange={(e) => setCustomAmounts({
                            ...customAmounts,
                            [participant.id]: e.target.value
                          })}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Who paid for this?</Label>
                  <Select value={paidBy} onValueChange={setPaidBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="me">You paid</SelectItem>
                      {participants.slice(1).map((participant) => (
                        <SelectItem key={participant.id} value={participant.id.toString()}>
                          {participant.name} paid
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any additional notes about this expense..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Add Expense
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onNavigate("landing")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}