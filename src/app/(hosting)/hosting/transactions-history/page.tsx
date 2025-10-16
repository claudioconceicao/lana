"use client";
import { useState, useMemo } from "react";
import { Database } from "../../../../lib/supabase/models";


interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
}
// TransactionCard component
const TransactionCard = ({ transaction} : {transaction: Transaction}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition mb-3">
      <div>
        <p className="font-semibold">{transaction.title}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
      <p
        className={`font-bold ${
          transaction.amount < 0 ? "text-red-500" : "text-green-600"
        }`}
      >
        {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
      </p>
    </div>
  );
};

const TransactionHistory = () => {
  const [transactions] = useState([
    { id: 1, title: "Payment from John Doe", date: "2025-09-01", amount: 120 },
    { id: 2, title: "Booking payout", date: "2025-08-29", amount: 240 },
    { id: 3, title: "Refund to Guest", date: "2025-08-25", amount: -75 },
    { id: 4, title: "Cleaning Fee", date: "2025-08-20", amount: -30 },
  ]);

  // Calculate summary stats
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold mb-6">History of Transactions</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            ${income.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-red-500">
            ${expenses.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Net Balance</p>
          <p className="text-2xl font-bold text-blue-600">
            ${balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-1 border rounded-lg p-2"
        />
        <select className="border rounded-lg p-2">
          <option>All</option>
          <option>Payments</option>
          <option>Payouts</option>
          <option>Refunds</option>
        </select>
      </div>

      {/* Transactions List */}
      <div>
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
