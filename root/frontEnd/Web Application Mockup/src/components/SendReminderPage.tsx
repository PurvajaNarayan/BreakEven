import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Bell, MessageSquare, Mail } from "lucide-react";

interface SendReminderPageProps {
  onNavigate: (page: string) => void;
}

const peopleWhoOweYou = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    totalAmount: 45.50,
    transactions: [
      { id: 1, description: "Dinner at Olive Garden", amount: 45.50, date: "Dec 18, 2024", daysSince: 2 }
    ],
    email: "alex.johnson@email.com",
    lastReminder: null
  },
  {
    id: 3,
    name: "Mike Rodriguez", 
    avatar: "/api/placeholder/32/32",
    totalAmount: 120.00,
    transactions: [
      { id: 4, description: "Concert tickets", amount: 120.00, date: "Dec 15, 2024", daysSince: 5 }
    ],
    email: "mike.rodriguez@email.com",
    lastReminder: "Dec 10, 2024"
  },
  {
    id: 7,
    name: "Travel Group",
    avatar: "/api/placeholder/32/32",
    totalAmount: 150.00,
    transactions: [
      { id: 7, description: "Hotel booking for weekend trip", amount: 150.00, date: "Dec 12, 2024", daysSince: 8 }
    ],
    email: "travelgroup@email.com",
    lastReminder: null
  },
  {
    id: 9,
    name: "Work Team",
    avatar: "/api/placeholder/32/32",
    totalAmount: 45.80,
    transactions: [
      { id: 9, description: "Team lunch at Thai place", amount: 45.80, date: "Dec 10, 2024", daysSince: 10 }
    ],
    email: "workteam@email.com",
    lastReminder: "Dec 8, 2024"
  }
];

const reminderTemplates = [
  {
    id: "friendly",
    name: "Friendly Reminder",
    template: "Hey [Name]! Just a friendly reminder about our shared expense for [Description]. The amount is $[Amount]. Thanks!"
  },
  {
    id: "polite",
    name: "Polite Request", 
    template: "Hi [Name], I hope you're doing well! When you get a chance, could you settle up for [Description]? The amount is $[Amount]. No rush, just wanted to keep track. Thanks!"
  },
  {
    id: "direct",
    name: "Direct Reminder",
    template: "Hi [Name], this is a reminder that you owe $[Amount] for [Description] from [Date]. Please let me know when you can settle up. Thanks!"
  },
  {
    id: "custom",
    name: "Custom Message",
    template: ""
  }
];

export function SendReminderPage({ onNavigate }: SendReminderPageProps) {
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [reminderType, setReminderType] = useState("email");
  const [templateId, setTemplateId] = useState("friendly");
  const [customMessage, setCustomMessage] = useState("");

  const handlePersonSelection = (personId: number, checked: boolean) => {
    if (checked) {
      setSelectedPeople([...selectedPeople, personId]);
    } else {
      setSelectedPeople(selectedPeople.filter(id => id !== personId));
    }
  };

  const generateMessage = (person: any) => {
    const template = reminderTemplates.find(t => t.id === templateId);
    if (!template || templateId === "custom") return customMessage;

    return template.template
      .replace("[Name]", person.name)
      .replace("[Description]", person.transactions[0].description)
      .replace("[Amount]", person.totalAmount.toFixed(2))
      .replace("[Date]", person.transactions[0].date);
  };

  const handleSendReminders = () => {
    const selectedCount = selectedPeople.length;
    alert(`Successfully sent ${reminderType} reminders to ${selectedCount} ${selectedCount === 1 ? 'person' : 'people'}!`);
    onNavigate("landing");
  };

  const selectedPersons = peopleWhoOweYou.filter(person => selectedPeople.includes(person.id));

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Send Reminders</h1>
            <p className="text-muted-foreground">
              Send friendly reminders to people who owe you money
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("landing")}>
            Cancel
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedPeople.length > 0 && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              {selectedPeople.length} {selectedPeople.length === 1 ? 'person' : 'people'} selected for reminder via {reminderType}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* People Selection */}
          <Card>
            <CardHeader>
              <CardTitle>People Who Owe You</CardTitle>
              <CardDescription>
                Select who you'd like to send reminders to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {peopleWhoOweYou.map((person, index) => (
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
                          {person.transactions[0].description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {person.transactions[0].daysSince} days ago
                          </span>
                          {person.lastReminder && (
                            <Badge variant="outline" className="text-xs">
                              Last reminded: {person.lastReminder}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg text-green-600">
                        +${person.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {index < peopleWhoOweYou.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reminder Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Reminder Settings</CardTitle>
              <CardDescription>
                Customize your reminder message and delivery method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Delivery Method */}
              <div className="space-y-3">
                <Label>Reminder Method</Label>
                <Select value={reminderType} onValueChange={setReminderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Reminder
                      </div>
                    </SelectItem>
                    <SelectItem value="push">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Push Notification
                      </div>
                    </SelectItem>
                    <SelectItem value="message">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        In-App Message
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Template */}
              <div className="space-y-3">
                <Label>Message Template</Label>
                <Select value={templateId} onValueChange={setTemplateId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reminderTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message Preview/Custom */}
              <div className="space-y-3">
                <Label>
                  {templateId === "custom" ? "Custom Message" : "Message Preview"}
                </Label>
                <Textarea
                  placeholder={templateId === "custom" ? "Write your custom message here..." : ""}
                  value={templateId === "custom" ? customMessage : (selectedPersons.length > 0 ? generateMessage(selectedPersons[0]) : "Select someone to see preview")}
                  onChange={(e) => templateId === "custom" && setCustomMessage(e.target.value)}
                  rows={4}
                  disabled={templateId !== "custom"}
                />
                {templateId !== "custom" && selectedPersons.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Preview shows message for {selectedPersons[0].name}. Messages will be personalized for each recipient.
                  </p>
                )}
              </div>

              {/* Template Variables Info */}
              {templateId !== "custom" && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Available Variables:</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>[Name] - Recipient's name</div>
                    <div>[Description] - Expense description</div>
                    <div>[Amount] - Amount owed</div>
                    <div>[Date] - Transaction date</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Send Actions */}
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={() => onNavigate("landing")}
          >
            Cancel
          </Button>
          <Button 
            disabled={selectedPeople.length === 0 || (templateId === "custom" && !customMessage.trim())}
            onClick={handleSendReminders}
            className="min-w-32"
          >
            Send Reminders ({selectedPeople.length})
          </Button>
        </div>
      </div>
    </div>
  );
}