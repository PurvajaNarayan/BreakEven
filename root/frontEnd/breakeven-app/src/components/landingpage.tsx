import { useState } from "react";

// Inline styles to match your LoginPage styling approach
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

const balanceCardStyle = {
  ...cardStyle,
  textAlign: 'center',
  minHeight: '120px'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #000000',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)'
};

const buttonOutlineStyle = {
  padding: '0.75rem 1rem',
  backgroundColor: 'white',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)'
};

const badgeStyle = {
  padding: '0.25rem 0.5rem',
  fontSize: '0.75rem',
  borderRadius: '4px',
  fontWeight: 'bold'
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

export function LandingPage({ onNavigate, onLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState("all");

  const allTransactions = [
    {
      id: 1,
      name: "Alex Johnson",
      amount: 45.50,
      type: "owes_you",
      description: "Dinner at Olive Garden",
      category: "individual",
      date: "Dec 18, 2024",
    },
    {
      id: 2,
      name: "Sarah Chen", 
      amount: 23.75,
      type: "you_owe",
      description: "Coffee and groceries",
      category: "individual",
      date: "Dec 17, 2024",
    },
    {
      id: 3,
      name: "College Friends",
      amount: 85.25,
      type: "owes_you",
      description: "Group dinner at Italian restaurant",
      category: "group",
      date: "Dec 16, 2024",
      participants: ["Alex Johnson", "Mike Rodriguez", "Emma Wilson"]
    },
    {
      id: 4,
      name: "Mike Rodriguez",
      amount: 120.00,
      type: "owes_you",
      description: "Concert tickets",
      category: "individual",
      date: "Dec 15, 2024",
    },
    {
      id: 5,
      name: "Roommates",
      amount: 67.33,
      type: "you_owe",
      description: "Monthly utilities split",
      category: "group",
      date: "Dec 14, 2024",
      participants: ["Sarah Chen", "David Kim"]
    }
  ];

  const totalOwedToYou = allTransactions
    .filter((transaction) => transaction.type === "owes_you")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalYouOwe = allTransactions
    .filter((transaction) => transaction.type === "you_owe")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netBalance = totalOwedToYou - totalYouOwe;

  const filteredTransactions = allTransactions.filter(transaction => {
    if (filter === "all") return true;
    if (filter === "owes_you" || filter === "you_owe") return transaction.type === filter;
    if (filter === "individual" || filter === "group") return transaction.category === filter;
    return true;
  });

  const displayedTransactions = isExpanded ? filteredTransactions : filteredTransactions.slice(0, 4);

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

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-primary)' }}>
            Dashboard
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => onNavigate("dashboard")}
              style={buttonStyle}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              View Spending
            </button>
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
          </div>
        </div>

        {/* Balance Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={balanceCardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
                Net Balance
              </h3>
            </div>
            <div style={cardContentStyle}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: netBalance >= 0 ? '#059669' : '#dc2626',
                fontFamily: 'var(--font-body)'
              }}>
                {netBalance >= 0 ? "+" : ""}${netBalance.toFixed(2)}
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.5rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                {netBalance >= 0 ? "You are owed more" : "You owe more"}
              </p>
            </div>
          </div>

          <div style={balanceCardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
                You Are Owed
              </h3>
            </div>
            <div style={cardContentStyle}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: '#059669',
                fontFamily: 'var(--font-body)'
              }}>
                +${totalOwedToYou.toFixed(2)}
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.5rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                From {allTransactions.filter(f => f.type === "owes_you").length} transactions
              </p>
            </div>
          </div>

          <div style={balanceCardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>
                You Owe
              </h3>
            </div>
            <div style={cardContentStyle}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: '#dc2626',
                fontFamily: 'var(--font-body)'
              }}>
                -${totalYouOwe.toFixed(2)}
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.5rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                To {allTransactions.filter(f => f.type === "you_owe").length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                  Unsettled Transactions
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontFamily: 'var(--font-body)'
                }}>
                  All pending payments and debts ({allTransactions.length} total)
                </p>
              </div>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <option value="all">All Transactions</option>
                <option value="owes_you">They Owe You</option>
                <option value="you_owe">You Owe</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>
          
          <div style={cardContentStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {displayedTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={avatarStyle}>
                        {transaction.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                            {transaction.name}
                          </p>
                          <span style={{
                            ...badgeStyle,
                            backgroundColor: '#f3f4f6',
                            color: '#374151'
                          }}>
                            {transaction.category}
                          </span>
                        </div>
                        <p style={{ 
                          margin: '0.25rem 0', 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          fontFamily: 'var(--font-body)'
                        }}>
                          {transaction.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: '#9ca3af',
                            fontFamily: 'var(--font-body)'
                          }}>
                            {transaction.date}
                          </span>
                          {transaction.participants && (
                            <span style={{ 
                              fontSize: '0.75rem', 
                              color: '#9ca3af',
                              fontFamily: 'var(--font-body)'
                            }}>
                              With {transaction.participants.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        ...badgeStyle,
                        backgroundColor: transaction.type === "owes_you" ? '#000000' : '#f3f4f6',
                        color: transaction.type === "owes_you" ? 'white' : '#374151'
                      }}>
                        {transaction.type === "owes_you" ? "Owes you" : "You owe"}
                      </span>
                      <div style={{ 
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        color: transaction.type === "owes_you" ? '#059669' : '#dc2626',
                        marginTop: '0.25rem',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {transaction.type === "owes_you" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {index < displayedTransactions.length - 1 && (
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                  )}
                </div>
              ))}
            </div>
            
            {filteredTransactions.length > 4 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  ...buttonOutlineStyle,
                  width: '100%',
                  marginTop: '1rem',
                  height: '2rem'
                }}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                {isExpanded ? 
                  "↑ Show Less" : 
                  `↓ Show All ${filteredTransactions.length} Transactions`
                }
              </button>
            )}

            {filteredTransactions.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem 0', 
                color: '#6b7280',
                fontFamily: 'var(--font-body)'
              }}>
                No transactions match the selected filter
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
              Quick Actions
            </h3>
          </div>
          <div style={cardContentStyle}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '0.75rem' 
            }}>
              <button
                onClick={() => onNavigate("add-expense")}
                style={{...buttonOutlineStyle, height: '3rem'}}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                Add Expense
              </button>
              <button 
                onClick={() => onNavigate("settle-up")}
                style={{...buttonOutlineStyle, height: '3rem'}}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                Settle Up
              </button>
              <button 
                onClick={() => onNavigate("send-reminder")}
                style={{...buttonOutlineStyle, height: '3rem'}}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                Send Reminder
              </button>
              <button 
                onClick={() => onNavigate("view-history")}
                style={{...buttonOutlineStyle, height: '3rem'}}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}