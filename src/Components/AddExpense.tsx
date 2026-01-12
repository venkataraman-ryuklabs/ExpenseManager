import React from 'react';
import './AddExpense.css';

export default function AddExpense() {

    const [expense, setExpense] = React.useState({
        amount: '',
        description: ''
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {                //realtime form input capture
        const { value, name } = event.target
        setExpense(prevExpense => {
            const updatedExpense = {
                ...prevExpense,
                [name]: value
            };
            console.log(updatedExpense);
            return updatedExpense;
        })
    }

    function receiveExpenseDetails(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();                                                                             //prevent refresh on form submission and url querystring

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const allData: any = {                                                                  //object to store form data
            ...data,
        };

        const expenseType = formData.getAll("expenseType");
        if (expenseType.length > 0) {                                                   // checkbox addition to object , only if user has selected checkbox 
            allData.expenseType = expenseType;
        }

        const existing = JSON.parse(localStorage.getItem("expenses") || "[]");      //read existing data from local storage
        existing.push(allData);
        localStorage.setItem("expenses", JSON.stringify(existing));         //Saves to existing expenses in local storage
        console.log("Saved expense:", allData);
        event.currentTarget.reset();                // Clear form after submit
    }

    return (
        <section className='add-expense-form'>
            <h2>Add your expenses below</h2>
            <form onSubmit={receiveExpenseDetails} className="expense-input-form">
                <label htmlFor="amount">Amount </label>
                <input id="amount" name="amount" type='number' onChange={handleChange} value={expense.amount} required />

                <label htmlFor="category">Category: </label>
                <select id="category" name="category" required>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="rent">Rent</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                </select>

                <label htmlFor="description">Description: </label>
                <textarea id="description" name="description" onChange={handleChange} value={expense.description} />

                <label htmlFor="date">Date </label>
                <input id="date" type='date' name="date" required />

                <fieldset>
                    <legend>Payment Method</legend>
                    <label>
                        <input type='radio' name="paymentMethod" value="upi" required />
                        UPI
                    </label>
                    <label>
                        <input type='radio' name="paymentMethod" value="cash" />
                        Cash
                    </label>
                    <label>
                        <input type='radio' name="paymentMethod" value="card" />
                        Credit/Debit Card
                    </label>
                </fieldset>
                <div className='checkbox-input'>
                    <label htmlFor="billable"> Billable
                        <input type='checkbox' name="expenseType" value="billable" id="billable" />
                    </label>

                    <label htmlFor="reimbursable"> Re-imbursable
                        <input type='checkbox' name="expenseType" value="re-imbursable" id="reimbursable" />
                    </label>

                    <label htmlFor="personal-expense"> Personal Expense
                        <input type='checkbox' name="expenseType" value="personal-expense" id="personal-expense" />
                    </label>

                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    );
}
