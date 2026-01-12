import { useEffect, useState } from 'react';

interface Expense {
    amount: string;
    category: string;
    description: string;
    date: string;
    paymentMethod: string;
    expenseType?: string[];
}

export default function Dashboard() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');        // Load expenses from localStorage
        setExpenses(storedExpenses);
    }, []);

    return (
        <section className="dashboard">
            <h2>Expense Dashboard</h2>
            {expenses.length === 0 ? (
                <p>No expenses recorded yet. Add your first expense!</p>
            ) : (
                <div className="expenses-list">
                    {expenses.map((expense, index) => (
                        <div key={index} className="expense-card">
                            <div className="expense-header">
                                <h3>{expense.category}</h3>
                                <span className="expense-amount">₹{expense.amount}</span>
                            </div>
                            {expense.description && (
                                <p className="expense-description">{expense.description}</p>
                            )}
                            <div className="expense-details">
                                <span>Date: {expense.date}</span>
                                <span>Payment: {expense.paymentMethod}</span>
                                {expense.expenseType && expense.expenseType.length > 0 && (
                                    <span>Type: {expense.expenseType.join(', ')}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

