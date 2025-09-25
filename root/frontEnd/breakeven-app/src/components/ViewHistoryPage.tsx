import { useState } from "react";

// Inline styles matching your design system
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  padding: '1rem'
};

const mainContentStyle = {
  maxWidth: '1400px',
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

const statsCardStyle = {
  ...cardStyle,
  textAlign: 'center'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
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
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem'
};

const buttonSmallStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: 'white',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem'
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

const badgeStyle = {
  padding: '0.25rem 0.5rem',
  fontSize: '0.75rem',
  borderRadius: '4px',
  fontWeight: 'bold'
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
  zIndex: 1000,
  padding: '1rem'
};

const modalContentStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto'
};

const scrollAreaStyle = {
  maxHeight: '600px',
  overflowY: 'auto',
  padding: '0.5rem'
};

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

export function ViewHistoryPage({ onNavigate, onLogout }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
      if (dateFrom && transactionDate < new Date(dateFrom)) matchesDate = false;
      if (dateTo && transactionDate > new Date(dateTo)) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesDate;
  });

  const totalTransactions = filteredTransactions.length;
  const settledCount = filteredTransactions.filter(t => t.status === "settled").length;
  const pendingCount = filteredTransactions.filter(t => t.status === "pending").length;

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  const hasFilters = searchQuery || statusFilter !== "all" || typeFilter !== "all" || categoryFilter !== "all" || dateFrom || dateTo;

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-primary)' }}>
              Transaction History
            </h1>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              margin: '0.25rem 0 0 0',
              fontFamily: 'var(--font-body)'
            }}>
              Complete history of all your expenses and settlements
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button 
              style={buttonSmallStyle}
              onMouseEnter={handleOutlineButtonHover}
              onMouseLeave={handleOutlineButtonLeave}
            >
              📄 Export
            </button>
            <button 
              onClick={() => onNavigate("dashboard")}
              style={buttonOutlineStyle}
              onMouseEnter={handleOutlineButtonHover}
              onMouseLeave={handleOutlineButtonLeave}
            >
              Back to Dashboard
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

        {/* Stats Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={statsCardStyle}>
            <div style={cardContentStyle}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                {totalTransactions}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, fontFamily: 'var(--font-body)' }}>
                Total Transactions
              </p>
            </div>
          </div>
          <div style={statsCardStyle}>
            <div style={cardContentStyle}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', fontFamily: 'var(--font-body)' }}>
                {settledCount}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, fontFamily: 'var(--font-body)' }}>
                Settled
              </p>
            </div>
          </div>
          <div style={statsCardStyle}>
            <div style={cardContentStyle}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316', fontFamily: 'var(--font-body)' }}>
                {pendingCount}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, fontFamily: 'var(--font-body)' }}>
                Pending
              </p>
            </div>
          </div>
          <div style={statsCardStyle}>
            <div style={cardContentStyle}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, fontFamily: 'var(--font-body)' }}>
                Total Amount
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
          {/* Filters Panel */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔍 Filters
              </h3>
            </div>
            <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Search */}
              <div>
                <label style={labelStyle}>Search</label>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{ ...inputStyle, paddingLeft: '2rem' }}
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    left: '0.5rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#6b7280' 
                  }}>
                    🔍
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label style={labelStyle}>Status</label>
                <select 
                  style={selectStyle}
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="settled">Settled</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label style={labelStyle}>Type</label>
                <select 
                  style={selectStyle}
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="owes_you">They Owe You</option>
                  <option value="you_owe">You Owe</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label style={labelStyle}>Category</label>
                <select 
                  style={selectStyle}
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label style={labelStyle}>Date Range</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="date"
                    style={inputStyle}
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From date"
                  />
                  <input
                    type="date"
                    style={inputStyle}
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To date"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button 
                onClick={clearFilters}
                style={buttonOutlineStyle}
                onMouseEnter={handleOutlineButtonHover}
                onMouseLeave={handleOutlineButtonLeave}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Transactions ({totalTransactions})
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontFamily: 'var(--font-body)'
              }}>
                {hasFilters ? `Showing ${totalTransactions} filtered results` : "All your transaction history"}
              </p>
            </div>
            <div style={cardContentStyle}>
              <div style={scrollAreaStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredTransactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                          <div style={avatarStyle}>
                            {transaction.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                                {transaction.name}
                              </p>
                              <span style={{
                                ...badgeStyle,
                                backgroundColor: '#f3f4f6',
                                color: '#374151',
                                border: '1px solid #d1d5db'
                              }}>
                                {transaction.category}
                              </span>
                              <span style={{
                                ...badgeStyle,
                                backgroundColor: transaction.status === "settled" ? '#000000' : '#f3f4f6',
                                color: transaction.status === "settled" ? 'white' : '#374151',
                                border: transaction.status === "settled" ? 'none' : '1px solid #d1d5db'
                              }}>
                                {transaction.status}
                              </span>
                            </div>
                            <p style={{ 
                              margin: '0.125rem 0', 
                              fontSize: '0.875rem', 
                              color: '#6b7280',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {transaction.description}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
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
                              {transaction.status === "settled" && (
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  color: '#10b981',
                                  fontFamily: 'var(--font-body)'
                                }}>
                                  Settled: {transaction.settledDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{
                              ...badgeStyle,
                              backgroundColor: transaction.type === "owes_you" ? '#000000' : '#f3f4f6',
                              color: transaction.type === "owes_you" ? 'white' : '#374151',
                              border: transaction.type === "owes_you" ? 'none' : '1px solid #d1d5db'
                            }}>
                              {transaction.type === "owes_you" ? "Owes you" : "You owe"}
                            </span>
                            <div style={{ 
                              fontSize: '1.125rem',
                              fontWeight: 'bold',
                              color: transaction.type === "owes_you" ? '#10b981' : '#dc2626',
                              marginTop: '0.25rem',
                              fontFamily: 'var(--font-body)'
                            }}>
                              {transaction.type === "owes_you" ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedTransaction(transaction)}
                            style={buttonSmallStyle}
                            onMouseEnter={handleOutlineButtonHover}
                            onMouseLeave={handleOutlineButtonLeave}
                          >
                            👁️
                          </button>
                        </div>
                      </div>
                      {index < filteredTransactions.length - 1 && (
                        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                      )}
                    </div>
                  ))}
                  
                  {filteredTransactions.length === 0 && (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '2rem 0', 
                      color: '#6b7280',
                      fontFamily: 'var(--font-body)'
                    }}>
                      No transactions found matching your filters
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div style={modalOverlayStyle} onClick={() => setSelectedTransaction(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={cardHeaderStyle}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>
                  Transaction Details
                </h3>
              </div>
              <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ ...avatarStyle, width: '48px', height: '48px' }}>
                    {selectedTransaction.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                      {selectedTransaction.name}
                    </p>
                    <p style={{ 
                      margin: '0.125rem 0 0 0', 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      fontFamily: 'var(--font-body)'
                    }}>
                      {selectedTransaction.description}
                    </p>
                  </div>
                </div>
                
                <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #e5e7eb' }} />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Amount</p>
                    <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                      ${selectedTransaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Date</p>
                    <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                      {selectedTransaction.date}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Status</p>
                    <span style={{
                      ...badgeStyle,
                      backgroundColor: selectedTransaction.status === "settled" ? '#000000' : '#f3f4f6',
                      color: selectedTransaction.status === "settled" ? 'white' : '#374151'
                    }}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Paid by</p>
                    <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                      {selectedTransaction.paidBy}
                    </p>
                  </div>
                  {selectedTransaction.participants && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Participants</p>
                      <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-body)' }}>
                        {selectedTransaction.participants.join(", ")}
                      </p>
                    </div>
                  )}
                  {selectedTransaction.settledDate && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280', fontFamily: 'var(--font-body)' }}>Settled Date</p>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#10b981', fontFamily: 'var(--font-body)' }}>
                        {selectedTransaction.settledDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  style={{ ...buttonOutlineStyle, width: '100%' }}
                  onMouseEnter={handleOutlineButtonHover}
                  onMouseLeave={handleOutlineButtonLeave}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}