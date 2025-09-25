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
  fontWeight: 'bold'
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

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1.5rem',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto'
};

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

export function SettleUpPage({ onNavigate, onLogout }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

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
    alert(`Successfully settled up with ${selectedPeople.length} people!`);
    setSelectedPeople([]);
    setConfirmDialogOpen(false);
    onNavigate("dashboard");
  };

  const selectedTotal = getSelectedTotal();
  const selectedTransactionsList = getSelectedTransactions();

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-primary)' }}>
              Settle Up
            </h1>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              margin: '0.25rem 0 0 0',
              fontFamily: 'var(--font-body)'
            }}>
              Select people to settle outstanding balances with
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
              ✓
            </div>
            <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
              {selectedPeople.length} people selected. Net settlement: 
              <span style={{ 
                marginLeft: '0.25rem',
                fontWeight: 'bold',
                color: selectedTotal >= 0 ? '#10b981' : '#dc2626'
              }}>
                {selectedTotal >= 0 ? '+' : ''}${selectedTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* People to Settle With */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
              Outstanding Balances
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              margin: '0.25rem 0 0 0',
              fontFamily: 'var(--font-body)'
            }}>
              Choose who you'd like to settle up with
            </p>
          </div>
          <div style={cardContentStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {settleableTransactions.map((person, index) => (
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
                          margin: '0.125rem 0 0 0', 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          fontFamily: 'var(--font-body)'
                        }}>
                          {person.transactions.length} transaction{person.transactions.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        ...badgeStyle,
                        backgroundColor: person.type === "owes_you" ? '#000000' : '#f3f4f6',
                        color: person.type === "owes_you" ? 'white' : '#374151'
                      }}>
                        {person.type === "owes_you" ? "Owes you" : "You owe"}
                      </span>
                      <div style={{ 
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        color: person.type === "owes_you" ? '#10b981' : '#dc2626',
                        marginTop: '0.25rem',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {person.type === "owes_you" ? '+' : '-'}${person.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction Details */}
                  {selectedPeople.includes(person.id) && (
                    <div style={{ marginLeft: '3rem', marginTop: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {person.transactions.map((transaction) => (
                          <div key={transaction.id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            fontSize: '0.875rem',
                            borderLeft: '2px solid #e5e7eb',
                            paddingLeft: '0.75rem'
                          }}>
                            <span style={{ color: '#6b7280', fontFamily: 'var(--font-body)' }}>
                              {transaction.description}
                            </span>
                            <span style={{ fontFamily: 'var(--font-body)' }}>
                              ${transaction.amount.toFixed(2)} • {transaction.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {index < settleableTransactions.length - 1 && (
                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settlement Actions */}
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
            disabled={selectedPeople.length === 0}
            onClick={() => setConfirmDialogOpen(true)}
            style={selectedPeople.length === 0 ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={selectedPeople.length > 0 ? handleButtonHover : undefined}
            onMouseLeave={selectedPeople.length > 0 ? handleButtonLeave : undefined}
          >
            Settle Up ({selectedPeople.length})
          </button>
        </div>

        {/* Confirmation Modal */}
        {confirmDialogOpen && (
          <div style={modalOverlayStyle} onClick={() => setConfirmDialogOpen(false)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Confirm Settlement
                </h2>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  fontFamily: 'var(--font-body)'
                }}>
                  Are you sure you want to settle up with the selected people?
                </p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {selectedTransactionsList.map((person) => (
                    <div key={person.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{person.name}</span>
                      <span style={{ 
                        color: person.type === "owes_you" ? '#10b981' : '#dc2626',
                        fontFamily: 'var(--font-body)'
                      }}>
                        {person.type === "owes_you" ? '+' : '-'}${person.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #d1d5db' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
                    <span style={{ fontFamily: 'var(--font-body)' }}>Net Settlement</span>
                    <span style={{ 
                      color: selectedTotal >= 0 ? '#10b981' : '#dc2626',
                      fontFamily: 'var(--font-body)'
                    }}>
                      {selectedTotal >= 0 ? '+' : ''}${selectedTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{
                  ...alertStyle,
                  backgroundColor: '#fef3c7',
                  borderColor: '#fde68a',
                  marginTop: '1rem'
                }}>
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    backgroundColor: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    marginTop: '0.125rem'
                  }}>
                    !
                  </div>
                  <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                    This will mark these transactions as settled and cannot be undone.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setConfirmDialogOpen(false)}
                  style={buttonOutlineStyle}
                  onMouseEnter={handleOutlineButtonHover}
                  onMouseLeave={handleOutlineButtonLeave}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSettleUp}
                  style={buttonStyle}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  Confirm Settlement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}