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

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedExpense, setEditedExpense] = useState<Expense | null>(null);

    function handleEditClick(index: number) {
        setEditingIndex(index);
        setEditedExpense({ ...expenses[index] }); // clone for editing
    }

    function handleEditChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        if (!editedExpense) return;

        const { name, value } = e.target;
        setEditedExpense(prev => prev ? { ...prev, [name]: value } : null);
    }
    function handleSaveEdit() {
        if (editingIndex === null || !editedExpense) return;

        const updatedExpenses = [...expenses];
        updatedExpenses[editingIndex] = editedExpense;

        setExpenses(updatedExpenses);
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

        setEditingIndex(null);
        setEditedExpense(null);
    }



    return (
        <section className="dashboard">
            <h2>Expense Dashboard</h2>
            {expenses.length === 0 ? (
                <p>No expenses recorded yet. Add your first expense!</p>
            ) : (
                <div className="expenses-list">
                    {expenses.map((expense, index) => (
                        <div key={index} className="expense-card">
                            {expenses.map((expense, index) => (
                                <div key={index} className="expense-card">
                                    {editingIndex === index ? (
                                        <>
                                            <input
                                                name="amount"
                                                value={editedExpense?.amount || ""}
                                                onChange={handleEditChange}
                                            />

                                            <textarea
                                                name="description"
                                                value={editedExpense?.description || ""}
                                                onChange={handleEditChange}
                                            />

                                            <button onClick={handleSaveEdit}>Save</button>
                                            <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="expense-header">
                                                <h3>{expense.category}</h3>
                                                <button onClick={() => handleEditClick(index)}>Edit</button>
                                                <span>₹{expense.amount}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}


                            <div className="expense-header">
                                <h3>{expense.category}</h3>
                                <button onClick={() => handleEditClick(index)}>Edit</button>
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

