import "./supplier-invoices.css";
import React, { useState, useEffect, useRef } from "react";

// Supplier Invoice Data Structure
export interface SupplierInvoice {
  invoiceNumber: string;
  supplier: string;
  poNumber: string;
  amount: number;
  paymentStatus: string;
}

// Props for SupplierInvoices component
export interface SupplierInvoicesProps {
  invoices: SupplierInvoice[];
  onView: (invoice: SupplierInvoice) => void;
  onProcessPayment: (invoice: SupplierInvoice) => void;
  onCancelPayment: (invoice: SupplierInvoice) => void;
  className?: string;
}

// Main Table Component
const SupplierInvoices: React.FC<SupplierInvoicesProps> = ({
  invoices,
  onView,
  onProcessPayment,
  onCancelPayment,
  className = "",
}) => {
  return (
    <div className={`${className} supplier-invoices`}>
      <p className="SupplierInvoices_p1 text-xl font-semibold p-4">
        Supplier Invoices
      </p>
      <table className="table-auto">
        <thead className="SupplierInvoices_thead1">
          <tr>
            <th>Invoice Number</th>
            <th>Supplier</th>
            <th>PO Number</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="SupplierInvoices_tbody1">
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.invoiceNumber}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.supplier}</td>
                <td>{invoice.poNumber}</td>
                <td>${invoice.amount.toFixed(2)}</td>
                <td>
                  <span
                    className={`${
                      invoice.paymentStatus === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {invoice.paymentStatus}
                  </span>
                </td>
                <td>
                  <DropdownActions
                    invoice={invoice}
                    onView={onView}
                    onProcessPayment={onProcessPayment}
                    onCancelPayment={onCancelPayment}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No invoices found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Dropdown component for actions
const DropdownActions: React.FC<{
  invoice: SupplierInvoice;
  onView: (invoice: SupplierInvoice) => void;
  onProcessPayment: (invoice: SupplierInvoice) => void;
  onCancelPayment: (invoice: SupplierInvoice) => void;
}> = ({ invoice, onView, onProcessPayment, onCancelPayment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Close dropdown on outside click
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative SupplierInvoices_div1" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Actions
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg SupplierInvoices_div2">
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
            onClick={() => {
              onView(invoice);
              setIsOpen(false);
            }}
          >
            View
          </button>
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
            onClick={() => {
              onProcessPayment(invoice);
              setIsOpen(false);
            }}
          >
            Process Payment
          </button>
          <button
            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
            onClick={() => {
              onCancelPayment(invoice);
              setIsOpen(false);
            }}
          >
            Cancel Payment
          </button>
        </div>
      )}
    </div>
  );
};

// Dummy data
const dummyInvoices: SupplierInvoice[] = [
  {
    invoiceNumber: "INV-001",
    supplier: "SL",
    poNumber: "PO-112",
    amount: 200.0,
    paymentStatus: "Paid",
  },
  {
    invoiceNumber: "INV-002",
    supplier: "ACME Corp",
    poNumber: "PO-113",
    amount: 450.0,
    paymentStatus: "Unpaid",
  },
];

// Render the component directly without needing App.tsx
const handleView = (invoice: SupplierInvoice) => {
  console.log("Viewing invoice:", invoice);
};

const handleProcessPayment = (invoice: SupplierInvoice) => {
  console.log("Processing payment for invoice:", invoice);
};

const handleCancelPayment = (invoice: SupplierInvoice) => {
  console.log("Cancelling payment for invoice:", invoice);
};

// Main component
const SupplierInvoicesComponent = () => (
  <SupplierInvoices
    invoices={dummyInvoices}
    onView={handleView}
    onProcessPayment={handleProcessPayment}
    onCancelPayment={handleCancelPayment}
  />
);

export default SupplierInvoicesComponent;
