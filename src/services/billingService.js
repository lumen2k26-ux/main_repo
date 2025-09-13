// Billing Service - API calls for billing functionality
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class BillingService {
  async getCurrentPlan() {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/current-plan`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch current plan');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching current plan:', error);
      throw error;
    }
  }

  async getPaymentMethods() {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  async addPaymentMethod(paymentMethodData) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/payment-methods`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethodData),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  async removePaymentMethod(paymentMethodId) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing payment method:', error);
      throw error;
    }
  }

  async setDefaultPaymentMethod(paymentMethodId) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/payment-methods/${paymentMethodId}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to set default payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      throw error;
    }
  }

  async getInvoices(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('start_date', filters.startDate);
      if (filters.endDate) params.append('end_date', filters.endDate);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.offset) params.append('offset', filters.offset);

      const response = await fetch(`${API_BASE_URL}/billing/invoices?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  }

  async getInvoiceDetails(invoiceId) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/invoices/${invoiceId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      throw error;
    }
  }

  async downloadInvoice(invoiceId) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/invoices/${invoiceId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }

      // Handle PDF download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return true;
    } catch (error) {
      console.error('Error downloading invoice:', error);
      throw error;
    }
  }

  async updateSubscription(subscriptionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/subscription`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  async cancelSubscription(reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/billing/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  async getBillingHistory(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.startDate) params.append('start_date', filters.startDate);
      if (filters.endDate) params.append('end_date', filters.endDate);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await fetch(`${API_BASE_URL}/billing/history?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch billing history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching billing history:', error);
      throw error;
    }
  }
}

export default new BillingService();
