import React, { useState, useEffect } from 'react';
import { Download, Eye, Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import billingService from '../../services/billingService';
import './Invoices.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2025-001',
      date: '2025-01-15',
      dueDate: '2025-01-15',
      amount: 29.99,
      status: 'paid',
      plan: 'Professional Plan',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-15',
      dueDate: '2024-12-15',
      amount: 29.99,
      status: 'paid',
      plan: 'Professional Plan',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-15',
      dueDate: '2024-11-15',
      amount: 29.99,
      status: 'paid',
      plan: 'Professional Plan',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'INV-2024-010',
      date: '2024-10-15',
      dueDate: '2024-10-15',
      amount: 29.99,
      status: 'paid',
      plan: 'Professional Plan',
      paymentMethod: 'Mastercard •••• 5555'
    },
    {
      id: 'INV-2024-009',
      date: '2024-09-15',
      dueDate: '2024-09-15',
      amount: 19.99,
      status: 'paid',
      plan: 'Basic Plan',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'INV-2024-008',
      date: '2024-08-15',
      dueDate: '2024-08-25',
      amount: 19.99,
      status: 'overdue',
      plan: 'Basic Plan',
      paymentMethod: 'Visa •••• 4242'
    }
  ]);

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  // View invoice details modal
  const handleViewInvoice = async (invoiceId) => {
    setLoadingInvoice(true);
    setSelectedInvoice(invoiceId);
    try {
      const details = await billingService.getInvoiceDetails(invoiceId);
      setInvoiceDetails(details);
    } catch (e) {
      setInvoiceDetails(null);
    }
    setLoadingInvoice(false);
  };

  // Download invoice
  const handleDownloadInvoice = async (invoiceId) => {
    try {
      await billingService.downloadInvoice(invoiceId);
    } catch (e) {
      alert('Failed to download invoice.');
    }
  };

  useEffect(() => {
    let filtered = invoices.filter(invoice => {
      const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.plan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort invoices
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'date' || sortField === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortField === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      default:
        return '';
    }
  };

  const getTotalAmount = () => {
    return filteredInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  const getStatusCounts = () => {
    const counts = { all: invoices.length, paid: 0, pending: 0, overdue: 0 };
    invoices.forEach(invoice => {
      counts[invoice.status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="invoices-container">
      <div className="invoices-header">
        <div className="header-content">
          <h1>Invoice History</h1>
          <p>View and manage all your invoices</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-label">Total Invoices</span>
            <span className="stat-value">{filteredInvoices.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Amount</span>
            <span className="stat-value">${getTotalAmount().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="invoices-controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All ({statusCounts.all})
          </button>
          <button 
            className={`filter-tab ${statusFilter === 'paid' ? 'active' : ''}`}
            onClick={() => setStatusFilter('paid')}
          >
            Paid ({statusCounts.paid})
          </button>
          <button 
            className={`filter-tab ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({statusCounts.pending})
          </button>
          <button 
            className={`filter-tab ${statusFilter === 'overdue' ? 'active' : ''}`}
            onClick={() => setStatusFilter('overdue')}
          >
            Overdue ({statusCounts.overdue})
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="invoices-table-container">
        <div className="invoices-table">
          <div className="table-header">
            <div 
              className="header-cell sortable"
              onClick={() => handleSort('id')}
            >
              Invoice ID
              <ArrowUpDown className="sort-icon" />
            </div>
            <div 
              className="header-cell sortable"
              onClick={() => handleSort('date')}
            >
              Issue Date
              <ArrowUpDown className="sort-icon" />
            </div>
            <div 
              className="header-cell sortable"
              onClick={() => handleSort('dueDate')}
            >
              Due Date
              <ArrowUpDown className="sort-icon" />
            </div>
            <div 
              className="header-cell sortable"
              onClick={() => handleSort('amount')}
            >
              Amount
              <ArrowUpDown className="sort-icon" />
            </div>
            <div className="header-cell">Plan</div>
            <div 
              className="header-cell sortable"
              onClick={() => handleSort('status')}
            >
              Status
              <ArrowUpDown className="sort-icon" />
            </div>
            <div className="header-cell">Actions</div>
          </div>

          {filteredInvoices.map(invoice => (
            <div key={invoice.id} className="table-row" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr 1fr 0.8fr 1fr 0.8fr 0.8fr',alignItems:'center'}}>
              <div className="cell invoice-id">{invoice.id}</div>
              <div className="cell">{formatDate(invoice.date)}</div>
              <div className="cell">{formatDate(invoice.dueDate)}</div>
              <div className="cell amount">${invoice.amount}</div>
              <div className="cell">{invoice.plan}</div>
              <div className="cell">
                <span className={`status-badge ${getStatusClass(invoice.status)}`}>{invoice.status}</span>
              </div>
              <div className="cell actions" style={{display:'flex',gap:'8px'}}>
                <button 
                  className="btn-icon"
                  onClick={() => handleViewInvoice(invoice.id)}
                  title="View Invoice"
                >
                  <Eye className="icon" />
                </button>
                <button 
                  className="btn-icon"
                  title="Download PDF"
                  onClick={() => handleDownloadInvoice(invoice.id)}
                >
                  <Download className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="empty-state">
            <Calendar className="empty-icon" />
            <h3>No invoices found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => {setSelectedInvoice(null); setInvoiceDetails(null);}}>
          <div className="modal invoice-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Invoice Details</h3>
              <button className="modal-close" onClick={() => {setSelectedInvoice(null); setInvoiceDetails(null);}}>×</button>
            </div>
            <div className="modal-body">
              {loadingInvoice && <div>Loading...</div>}
              {!loadingInvoice && invoiceDetails && (
                <div className="invoice-detail">
                  <div className="invoice-header-detail">
                    <div className="invoice-info">
                      <h4>{invoiceDetails.id}</h4>
                      <span className={`status-badge ${getStatusClass(invoiceDetails.status)}`}>{invoiceDetails.status}</span>
                    </div>
                    <div className="invoice-dates">
                      <div className="date-item">
                        <span className="label">Issue Date:</span>
                        <span>{formatDate(invoiceDetails.date)}</span>
                      </div>
                      <div className="date-item">
                        <span className="label">Due Date:</span>
                        <span>{formatDate(invoiceDetails.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-items">
                    <h5>Items</h5>
                    <div className="item-row">
                      <span>{invoiceDetails.plan}</span>
                      <span>${invoiceDetails.amount}</span>
                    </div>
                    <div className="invoice-total">
                      <span>Total: ${invoiceDetails.amount}</span>
                    </div>
                  </div>
                  <div className="payment-info">
                    <h5>Payment Information</h5>
                    <p>Payment Method: {invoiceDetails.paymentMethod}</p>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => handleDownloadInvoice(invoiceDetails.id)}>
                      <Download className="icon" /> Download PDF
                    </button>
                  </div>
                </div>
              )}
              {!loadingInvoice && !invoiceDetails && <div>Failed to load invoice details.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Invoices;