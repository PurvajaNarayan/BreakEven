import { useState } from "react";

// Inline styles matching your design system
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  padding: '1rem'
};

const mainContentStyle = {
  maxWidth: '800px',
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
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: '#374151'
};

const checkboxStyle = {
  width: '16px',
  height: '16px',
  accentColor: '#000000'
};

const radioStyle = {
  width: '16px',
  height: '16px',
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

export function AddExpensePage({ onNavigate, onLogout }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseType, setExpenseType] = useState("personal");
  const [splitType, setSplitType] = useState("equal");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [paidBy, setPaidBy] = useState("me");
  const [customAmounts, setCustomAmounts] = useState({});
  const [notes, setNotes] = useState("");

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#000000';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#000000';
    e.target.style.color = 'white';
  };

  const handleOutlineButtonHover = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
    e.target.style.borderColor = '#9ca3af';
  };

  const handleOutlineButtonLeave = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.borderColor = '#d1d5db';
  };

  const handleFriendSelection = (friendId, checked) => {
    if (checked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    }
  };

  const handleGroupSelection = (groupId) => {
    const group = groups.find(g => g.id === parseInt(groupId));
    if (group) {
      setSelectedGroup(group.id);
      setSelectedGroupMembers(group.members);
    }
  };

  const handleGroupMemberSelection = (memberId, checked) => {
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
      }, {});
    }
    
    return customAmounts;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Expense added successfully!");
    onNavigate("dashboard");
  };

  const participants = getParticipants();
  const splits = calculateSplit();

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-primary)' }}>
            Add Expense
          </h1>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Basic Details */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Expense Details
              </h3>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle} htmlFor="description">Description</label>
                  <input
                    id="description"
                    style={inputStyle}
                    placeholder="What was this expense for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle} htmlFor="amount">Amount ($)</label>
                    <input
                      id="amount"
                      style={inputStyle}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select 
                      style={selectStyle}
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="date">Date</label>
                  <input
                    id="date"
                    style={inputStyle}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expense Type */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Who is involved?
              </h3>
            </div>
            <div style={cardContentStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    style={radioStyle}
                    type="radio"
                    id="personal"
                    name="expenseType"
                    value="personal"
                    checked={expenseType === "personal"}
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                  <label style={{ ...labelStyle, margin: 0 }} htmlFor="personal">
                    Just me (personal expense)
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    style={radioStyle}
                    type="radio"
                    id="friends"
                    name="expenseType"
                    value="friends"
                    checked={expenseType === "friends"}
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                  <label style={{ ...labelStyle, margin: 0 }} htmlFor="friends">
                    With friends
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    style={radioStyle}
                    type="radio"
                    id="group"
                    name="expenseType"
                    value="group"
                    checked={expenseType === "group"}
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                  <label style={{ ...labelStyle, margin: 0 }} htmlFor="group">
                    With a group
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Friend Selection */}
          {expenseType === "friends" && (
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                  Select Friends
                </h3>
              </div>
              <div style={cardContentStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {friends.map((friend) => (
                    <div key={friend.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        style={checkboxStyle}
                        type="checkbox"
                        id={`friend-${friend.id}`}
                        checked={selectedFriends.includes(friend.id)}
                        onChange={(e) => handleFriendSelection(friend.id, e.target.checked)}
                      />
                      <div style={avatarStyle}>
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <label style={{ ...labelStyle, margin: 0, fontSize: '0.875rem' }} htmlFor={`friend-${friend.id}`}>
                        {friend.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group Selection */}
          {expenseType === "group" && (
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                  Select Group
                </h3>
              </div>
              <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <select 
                  style={selectStyle}
                  value={selectedGroup?.toString() || ""} 
                  onChange={(e) => handleGroupSelection(e.target.value)}
                >
                  <option value="">Choose a group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id.toString()}>
                      {group.name}
                    </option>
                  ))}
                </select>

                {selectedGroup && (
                  <div>
                    <label style={labelStyle}>Select members from the group:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {friends
                        .filter(f => groups.find(g => g.id === selectedGroup)?.members.includes(f.id))
                        .map((member) => (
                          <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              style={checkboxStyle}
                              type="checkbox"
                              id={`member-${member.id}`}
                              checked={selectedGroupMembers.includes(member.id)}
                              onChange={(e) => handleGroupMemberSelection(member.id, e.target.checked)}
                            />
                            <div style={avatarStyle}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <label style={{ ...labelStyle, margin: 0, fontSize: '0.875rem' }} htmlFor={`member-${member.id}`}>
                              {member.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Split Configuration */}
          {expenseType !== "personal" && participants.length > 1 && (
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                  How should this be split?
                </h3>
              </div>
              <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      style={radioStyle}
                      type="radio"
                      id="equal"
                      name="splitType"
                      value="equal"
                      checked={splitType === "equal"}
                      onChange={(e) => setSplitType(e.target.value)}
                    />
                    <label style={{ ...labelStyle, margin: 0 }} htmlFor="equal">
                      Split equally
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      style={radioStyle}
                      type="radio"
                      id="exact"
                      name="splitType"
                      value="exact"
                      checked={splitType === "exact"}
                      onChange={(e) => setSplitType(e.target.value)}
                    />
                    <label style={{ ...labelStyle, margin: 0 }} htmlFor="exact">
                      Enter exact amounts
                    </label>
                  </div>
                </div>

                <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontFamily: 'var(--font-body)' }}>Split breakdown:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {participants.map((participant) => (
                      <div key={participant.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={avatarStyle}>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontFamily: 'var(--font-body)' }}>{participant.name}</span>
                        </div>
                        
                        {splitType === "equal" ? (
                          <span style={badgeStyle}>
                            ${splits[participant.id] || "0.00"}
                          </span>
                        ) : (
                          <input
                            style={{ ...inputStyle, width: '100px' }}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
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
                </div>

                <div>
                  <label style={labelStyle}>Who paid for this?</label>
                  <select 
                    style={selectStyle}
                    value={paidBy} 
                    onChange={(e) => setPaidBy(e.target.value)}
                  >
                    <option value="me">You paid</option>
                    {participants.slice(1).map((participant) => (
                      <option key={participant.id} value={participant.id.toString()}>
                        {participant.name} paid
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Notes (Optional)
              </h3>
            </div>
            <div style={cardContentStyle}>
              <textarea
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                placeholder="Add any additional notes about this expense..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="submit"
              style={{ ...buttonStyle, flex: 1 }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Add Expense
            </button>
            <button 
              type="button"
              onClick={() => onNavigate("dashboard")}
              style={buttonOutlineStyle}
              onMouseEnter={handleOutlineButtonHover}
              onMouseLeave={handleOutlineButtonLeave}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}