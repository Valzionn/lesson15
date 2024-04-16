import React, { useEffect, useState } from 'react';
import { Expense, api } from './api';

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseCost, setNewExpenseCost] = useState<number | null>(null);

  const fetchExpenses = async () => {
    const fetchedExpenses = await api.getExpenses();
    setExpenses(fetchedExpenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    await api.deleteExpense(id);
    fetchExpenses();
  };

  const handleAddExpense = async () => {
    if (newExpenseName && newExpenseCost) {
      console.log('Adding expense: ', {name: newExpenseName, cost: newExpenseCost })
      await api.createExpense({ name: newExpenseName, cost: parseFloat(newExpenseCost) });
      fetchExpenses();
      setNewExpenseName('');
      setNewExpenseCost('');
    }
  };

  return (
    <div className='m-10'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Expense name'
          value={newExpenseName}
          onChange={(e) => setNewExpenseName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Expense cost'
          value={newExpenseCost || ''}
          onChange={(e) => setNewExpenseCost(parseFloat(e.target.value))}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>
            {expense.name}: {expense.cost}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Expenses;

