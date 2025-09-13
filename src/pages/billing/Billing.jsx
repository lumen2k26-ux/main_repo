import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, Download, Eye, Plus, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import billingService from '../../services/billingService';
import './Billing.css';

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Professional Plan',
    price: 29.99,
    billingCycle: 'monthly',
    nextBilling: '2025-02-15',
    status: 'active'
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/27',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ]);

  const [recentInvoices, setRecentInvoices] = useState([
    {
      id: 'INV-2025-001',
      date: '2025-01-15',
      amount: 29.99,
      status: 'paid',
      dueDate: '2025-01-15'
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-15',
      amount: 29.99,
      status: 'paid',
      dueDate: '2024-12-15'
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-15',
      amount: 29.99,
      status: 'paid',
      dueDate: '2024-11-15'
    }
  ]);

  const [showAddPayment, setShowAddPayment] = useState(false);
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

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleRemovePayment = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="billing-container">
      <div className="billing-header">
        <h1>Billing & Invoices</h1>
        <p>Manage your subscription, payment methods, and billing history</p>
      </div>

      <div className="billing-grid">
        {/* Current Plan Section */}
        <div className="billing-card">
          <div className="card-header">
            <h2>Current Plan</h2>
            <div className={`plan-status ${currentPlan.status}`}>
              {currentPlan.status}
            </div>
          </div>
          <div className="plan-details">
            <div className="plan-info">
              <h3>{currentPlan.name}</h3>
              <div className="plan-price">
                <span className="price">${currentPlan.price}</span>
                <span className="cycle">/{currentPlan.billingCycle}</span>
              </div>
            </div>
            <div className="next-billing">
              <Calendar className="icon" />
              <div>
                <span className="label">Next billing date</span>
                <span className="date">{formatDate(currentPlan.nextBilling)}</span>
              </div>
            </div>
          </div>
          <div className="plan-actions">
            <button className="btn-secondary">Change Plan</button>
            <button className="btn-danger">Cancel Subscription</button>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="billing-card">
          <div className="card-header">
            <h2>Payment Methods</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowAddPayment(true)}
            >
              <Plus className="icon" />
              Add Method
            </button>
          </div>
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <div key={method.id} className="payment-method">
                <div className="payment-info">
                  <CreditCard className="card-icon" />
                  <div className="card-details">
                    <span className="card-brand">{method.brand} •••• {method.last4}</span>
                    <span className="card-expiry">Expires {method.expiry}</span>
                  </div>
                  {method.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="payment-actions">
                  {!method.isDefault && (
                    <button 
                      className="btn-link"
                      onClick={() => handleSetDefaultPayment(method.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    className="btn-icon-danger"
                    onClick={() => handleRemovePayment(method.id)}
                  >
                    <Trash2 className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices Section */}
        <div className="billing-card invoices-card">
          <div className="card-header">
            <h2>Recent Invoices</h2>
            <button className="btn-secondary">View All</button>
          </div>
          <div className="invoices-table">
            <div className="table-header" style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr 1fr'}}>
              <span>Invoice</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {recentInvoices.map(invoice => (
              <div key={invoice.id} className="table-row" style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr 1fr',alignItems:'center'}}>
                <span className="invoice-id">{invoice.id}</span>
                <span className="invoice-date">{formatDate(invoice.date)}</span>
                <span className="invoice-amount">${invoice.amount}</span>
                <span className={`invoice-status ${getStatusClass(invoice.status)}`}>{invoice.status}</span>
                <div className="invoice-actions" style={{display:'flex',gap:'8px'}}>
                  <button className="btn-icon" title="View Invoice" onClick={() => handleViewInvoice(invoice.id)}>
                    <Eye className="icon" />
                  </button>
                  <button className="btn-icon" title="Download PDF" onClick={() => handleDownloadInvoice(invoice.id)}>
                    <Download className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => {setSelectedInvoice(null); setInvoiceDetails(null);}}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth:'500px'}}>
            <div className="modal-header">
              <h3>Invoice Details</h3>
              <button className="modal-close" onClick={() => {setSelectedInvoice(null); setInvoiceDetails(null);}}>×</button>
            </div>
            <div className="modal-body">
              {loadingInvoice && <div>Loading...</div>}
              {!loadingInvoice && invoiceDetails && (
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <h4>{invoiceDetails.id}</h4>
                      <span className={`status-badge ${getStatusClass(invoiceDetails.status)}`}>{invoiceDetails.status}</span>
                    </div>
                    <div>
                      <div><b>Issue Date:</b> {formatDate(invoiceDetails.date)}</div>
                      <div><b>Due Date:</b> {formatDate(invoiceDetails.dueDate)}</div>
                    </div>
                  </div>
                  <div>
                    <h5>Plan</h5>
                    <div>{invoiceDetails.plan}</div>
                  </div>
                  <div>
                    <h5>Amount</h5>
                    <div>${invoiceDetails.amount}</div>
                  </div>
                  <div>
                    <h5>Payment Method</h5>
                    <div>{invoiceDetails.paymentMethod}</div>
                  </div>
                  <div style={{display:'flex',justifyContent:'flex-end',gap:'12px'}}>
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

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="modal-overlay" onClick={() => setShowAddPayment(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Payment Method</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddPayment(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form className="payment-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowAddPayment(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Payment Method
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Billing;