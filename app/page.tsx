'use client';

import { useState } from 'react';

type Property = {
  id: string;
  name: string;
  address: string;
  rent: number;
};

type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  rentAmount: number;
  moveInDate: string;
};

type Payment = {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'late';
  month: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'properties' | 'tenants' | 'payments'>('properties');
  const [properties, setProperties] = useState<Property[]>([
    { id: '1', name: 'Sunset Apartments', address: '123 Main St', rent: 1200 },
    { id: '2', name: 'Ocean View Condos', address: '456 Beach Blvd', rent: 1800 },
  ]);
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-0100', propertyId: '1', rentAmount: 1200, moveInDate: '2024-01-01' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', phone: '555-0101', propertyId: '2', rentAmount: 1800, moveInDate: '2024-02-01' },
  ]);
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', tenantId: '1', amount: 1200, date: '2024-11-01', status: 'paid', month: 'November 2024' },
    { id: '2', tenantId: '2', amount: 1800, date: '2024-11-01', status: 'paid', month: 'November 2024' },
  ]);

  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const [newProperty, setNewProperty] = useState({ name: '', address: '', rent: '' });
  const [newTenant, setNewTenant] = useState({ name: '', email: '', phone: '', propertyId: '', rentAmount: '', moveInDate: '' });
  const [newPayment, setNewPayment] = useState<{ tenantId: string; amount: string; date: string; status: 'paid' | 'pending' | 'late'; month: string }>({ tenantId: '', amount: '', date: '', status: 'paid', month: '' });

  const addProperty = () => {
    if (newProperty.name && newProperty.address && newProperty.rent) {
      setProperties([...properties, {
        id: Date.now().toString(),
        name: newProperty.name,
        address: newProperty.address,
        rent: parseFloat(newProperty.rent)
      }]);
      setNewProperty({ name: '', address: '', rent: '' });
      setShowAddProperty(false);
    }
  };

  const addTenant = () => {
    if (newTenant.name && newTenant.email && newTenant.propertyId && newTenant.rentAmount) {
      setTenants([...tenants, {
        id: Date.now().toString(),
        name: newTenant.name,
        email: newTenant.email,
        phone: newTenant.phone,
        propertyId: newTenant.propertyId,
        rentAmount: parseFloat(newTenant.rentAmount),
        moveInDate: newTenant.moveInDate
      }]);
      setNewTenant({ name: '', email: '', phone: '', propertyId: '', rentAmount: '', moveInDate: '' });
      setShowAddTenant(false);
    }
  };

  const addPayment = () => {
    if (newPayment.tenantId && newPayment.amount && newPayment.date && newPayment.month) {
      setPayments([...payments, {
        id: Date.now().toString(),
        tenantId: newPayment.tenantId,
        amount: parseFloat(newPayment.amount),
        date: newPayment.date,
        status: newPayment.status,
        month: newPayment.month
      }]);
      setNewPayment({ tenantId: '', amount: '', date: '', status: 'paid', month: '' });
      setShowAddPayment(false);
    }
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const deleteTenant = (id: string) => {
    setTenants(tenants.filter(t => t.id !== id));
  };

  const deletePayment = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const getTotalRent = () => {
    return properties.reduce((sum, prop) => sum + prop.rent, 0);
  };

  const getTotalPaid = () => {
    return payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getPropertyName = (propertyId: string) => {
    return properties.find(p => p.id === propertyId)?.name || 'Unknown';
  };

  const getTenantName = (tenantId: string) => {
    return tenants.find(t => t.id === tenantId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Rent Management System</h1>
        <p className="text-blue-100 mt-1">Manage your properties, tenants, and payments</p>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Properties</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{properties.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Tenants</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{tenants.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue (Monthly)</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">${getTotalRent().toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('properties')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'properties'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'tenants'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tenants
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payments
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Properties</h2>
                  <button
                    onClick={() => setShowAddProperty(!showAddProperty)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    + Add Property
                  </button>
                </div>

                {showAddProperty && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4">Add New Property</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Property Name"
                        value={newProperty.name}
                        onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="number"
                        placeholder="Monthly Rent"
                        value={newProperty.rent}
                        onChange={(e) => setNewProperty({ ...newProperty, rent: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={addProperty}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddProperty(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monthly Rent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {property.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {property.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${property.rent.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => deleteProperty(property.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tenants Tab */}
            {activeTab === 'tenants' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Tenants</h2>
                  <button
                    onClick={() => setShowAddTenant(!showAddTenant)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    + Add Tenant
                  </button>
                </div>

                {showAddTenant && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4">Add New Tenant</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Tenant Name"
                        value={newTenant.name}
                        onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={newTenant.email}
                        onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={newTenant.phone}
                        onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <select
                        value={newTenant.propertyId}
                        onChange={(e) => setNewTenant({ ...newTenant, propertyId: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="">Select Property</option>
                        {properties.map((prop) => (
                          <option key={prop.id} value={prop.id}>
                            {prop.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Rent Amount"
                        value={newTenant.rentAmount}
                        onChange={(e) => setNewTenant({ ...newTenant, rentAmount: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="date"
                        placeholder="Move-in Date"
                        value={newTenant.moveInDate}
                        onChange={(e) => setNewTenant({ ...newTenant, moveInDate: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={addTenant}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddTenant(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tenants.map((tenant) => (
                        <tr key={tenant.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {tenant.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tenant.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tenant.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getPropertyName(tenant.propertyId)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${tenant.rentAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => deleteTenant(tenant.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
                  <button
                    onClick={() => setShowAddPayment(!showAddPayment)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    + Record Payment
                  </button>
                </div>

                {showAddPayment && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-4">Record New Payment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={newPayment.tenantId}
                        onChange={(e) => setNewPayment({ ...newPayment, tenantId: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="">Select Tenant</option>
                        {tenants.map((tenant) => (
                          <option key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="date"
                        value={newPayment.date}
                        onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Month (e.g., November 2024)"
                        value={newPayment.month}
                        onChange={(e) => setNewPayment({ ...newPayment, month: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <select
                        value={newPayment.status}
                        onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value as 'paid' | 'pending' | 'late' })}
                        className="border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="late">Late</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={addPayment}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddPayment(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-semibold">Total Paid: <span className="text-green-600">${getTotalPaid().toLocaleString()}</span></p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tenant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {getTenantName(payment.tenantId)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payment.status === 'paid'
                                  ? 'bg-green-100 text-green-800'
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => deletePayment(payment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
