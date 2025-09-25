import { useState } from "react";

// Inline styles matching your design system
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  padding: '1rem'
};

const mainContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden'
};

const cardHeaderStyle = {
  padding: '1rem 1.5rem',
  borderBottom: '1px solid #e5e7eb'
};

const cardContentStyle = {
  padding: '1.5rem'
};

const buttonStyle = {
  padding: '0.75rem 1rem',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #000000',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem'
};

const buttonOutlineStyle = {
  padding: '0.75rem 1rem',
  backgroundColor: 'white',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem'
};

const buttonDisabledStyle = {
  ...buttonStyle,
  backgroundColor: '#9ca3af',
  borderColor: '#9ca3af',
  cursor: 'not-allowed'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'var(--font-body)',
  boxSizing: 'border-box'
};

const selectStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  backgroundColor: 'white',
  fontFamily: 'var(--font-body)',
  boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '0.5rem',
  display: 'block',
  fontFamily: 'var(--font-body)'
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  color: '#374151'
};

const checkboxStyle = {
  width: '18px',
  height: '18px',
  accentColor: '#000000'
};

const badgeStyle = {
  padding: '0.25rem 0.5rem',
  fontSize: '0.75rem',
  borderRadius: '4px',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  border: '1px solid #d1d5db'
};

const alertStyle = {
  padding: '1rem',
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem'
};

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

export function SendReminderPage({ onNavigate, onLogout }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [reminderType, setReminderType] = useState("email");
  const [templateId, setTemplateId] = useState("friendly");
  const [customMessage, setCustomMessage] = useState("");

  const handleButtonHover = (e) => {
    if (!e.target.disabled) {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = '#000000';
    }
  };

  const handleButtonLeave = (e) => {
    if (!e.target.disabled) {
      e.target.style.backgroundColor = '#000000';
      e.target.style.color = 'white';
    }
  };

  const handleOutlineButtonHover = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
    e.target.style.borderColor = '#9ca3af';
  };

  const handleOutlineButtonLeave = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.borderColor = '#d1d5db';
  };

  const handlePersonSelection = (personId, checked) => {
    if (checked) {
      setSelectedPeople([...selectedPeople, personId]);
    } else {
      setSelectedPeople(selectedPeople.filter(id => id !== personId));
    }
  };

  const generateMessage = (person) => {
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
    onNavigate("dashboard");
  };

  const selectedPersons = peopleWhoOweYou.filter(person => selectedPeople.includes(person.id));

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-primary)' }}>
              Send Reminders
            </h1>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              margin: '0.25rem 0 0 0',
              fontFamily: 'var(--font-body)'
            }}>
              Send friendly reminders to people who owe you money
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => onNavigate("dashboard")}
              style={buttonOutlineStyle}
              onMouseEnter={handleOutlineButtonHover}
              onMouseLeave={handleOutlineButtonLeave}
            >
              Cancel
            </button>
            {onLogout && (
              <button 
                onClick={onLogout}
                style={{
                  ...buttonOutlineStyle,
                  color: '#dc2626',
                  borderColor: '#dc2626'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#fef2f2';
                  e.target.style.borderColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#dc2626';
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Selection Summary */}
        {selectedPeople.length > 0 && (
          <div style={alertStyle}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.75rem',
              marginTop: '0.125rem'
            }}>
              🔔
            </div>
            <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
              {selectedPeople.length} {selectedPeople.length === 1 ? 'person' : 'people'} selected for reminder via {reminderType}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* People Selection */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                People Who Owe You
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                Select who you'd like to send reminders to
              </p>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {peopleWhoOweYou.map((person, index) => (
                  <div key={person.id}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          style={checkboxStyle}
                          type="checkbox"
                          id={`person-${person.id}`}
                          checked={selectedPeople.includes(person.id)}
                          onChange={(e) => handlePersonSelection(person.id, e.target.checked)}
                        />
                        <div style={avatarStyle}>
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                            {person.name}
                          </p>
                          <p style={{ 
                            margin: '0.125rem 0', 
                            fontSize: '0.875rem', 
                            color: '#6b7280',
                            fontFamily: 'var(--font-body)'
                          }}>
                            {person.transactions[0].description}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              color: '#9ca3af',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {person.transactions[0].daysSince} days ago
                            </span>
                            {person.lastReminder && (
                              <span style={{
                                ...badgeStyle,
                                fontSize: '0.75rem'
                              }}>
                                Last reminded: {person.lastReminder}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '1.125rem',
                          fontWeight: 'bold',
                          color: '#10b981',
                          fontFamily: 'var(--font-body)'
                        }}>
                          +${person.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {index < peopleWhoOweYou.length - 1 && (
                      <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reminder Configuration */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Reminder Settings
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                Customize your reminder message and delivery method
              </p>
            </div>
            <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Delivery Method */}
              <div>
                <label style={labelStyle}>Reminder Method</label>
                <select 
                  style={selectStyle}
                  value={reminderType} 
                  onChange={(e) => setReminderType(e.target.value)}
                >
                  <option value="email">📧 Email Reminder</option>
                  <option value="push">🔔 Push Notification</option>
                  <option value="message">💬 In-App Message</option>
                </select>
              </div>

              {/* Message Template */}
              <div>
                <label style={labelStyle}>Message Template</label>
                <select 
                  style={selectStyle}
                  value={templateId} 
                  onChange={(e) => setTemplateId(e.target.value)}
                >
                  {reminderTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Preview/Custom */}
              <div>
                <label style={labelStyle}>
                  {templateId === "custom" ? "Custom Message" : "Message Preview"}
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                  placeholder={templateId === "custom" ? "Write your custom message here..." : ""}
                  value={templateId === "custom" ? customMessage : (selectedPersons.length > 0 ? generateMessage(selectedPersons[0]) : "Select someone to see preview")}
                  onChange={(e) => templateId === "custom" && setCustomMessage(e.target.value)}
                  disabled={templateId !== "custom"}
                />
                {templateId !== "custom" && selectedPersons.length > 1 && (
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#9ca3af', 
                    margin: '0.5rem 0 0 0',
                    fontFamily: 'var(--font-body)'
                  }}>
                    Preview shows message for {selectedPersons[0].name}. Messages will be personalized for each recipient.
                  </p>
                )}
              </div>

              {/* Template Variables Info */}
              {templateId !== "custom" && (
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 'bold', 
                    margin: '0 0 0.25rem 0',
                    fontFamily: 'var(--font-body)'
                  }}>
                    Available Variables:
                  </p>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280',
                    fontFamily: 'var(--font-body)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div>[Name] - Recipient's name</div>
                    <div>[Description] - Expense description</div>
                    <div>[Amount] - Amount owed</div>
                    <div>[Date] - Transaction date</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Send Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => onNavigate("dashboard")}
            style={buttonOutlineStyle}
            onMouseEnter={handleOutlineButtonHover}
            onMouseLeave={handleOutlineButtonLeave}
          >
            Cancel
          </button>
          <button
            disabled={selectedPeople.length === 0 || (templateId === "custom" && !customMessage.trim())}
            onClick={handleSendReminders}
            style={selectedPeople.length === 0 || (templateId === "custom" && !customMessage.trim()) ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={selectedPeople.length > 0 && !(templateId === "custom" && !customMessage.trim()) ? handleButtonHover : undefined}
            onMouseLeave={selectedPeople.length > 0 && !(templateId === "custom" && !customMessage.trim()) ? handleButtonLeave : undefined}
          >
            Send Reminders ({selectedPeople.length})
          </button>
        </div>
      </div>
    </div>
  );
}