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
    if (newExpenseName && newExpenseCost !== null) {
      const timestamp = Date.now()
      const newExpense: Expense = {
        id: timestamp,
        name: newExpenseName,
        cost: newExpenseCost
      }
      await api.postExpenses(newExpense);
      fetchExpenses();
      setNewExpenseName('');
      setNewExpenseCost(null);
    }
  };

  return (
    <div className='m-10' style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px', flexDirection: 'column' }}>
        <p style={{ color: '#66cdaa', fontSize: '48px' }}>Add Expense</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%' }}>
          <label htmlFor=""
            className='text-2xl text-white'>Name </label>
          <input
            type='text'
            placeholder='Expense name'
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            className='border border-solid #eee text-2xl my-2'
          />
          <br />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '52%' }}>
          <label htmlFor=""
            className='text-2xl text-white'>Cost </label>
          <input
            type='number'
            placeholder='Expense cost'
            value={newExpenseCost || ''}
            onChange={(e) => setNewExpenseCost(parseFloat(e.target.value))}
            className='border border-solid #eee text-2xl my-2'
          />
          <br />
        </div>
        <button style={{ backgroundColor: 'white', border: '2px solid blue', fontSize: '24px', margin: '4px', padding: '4px' }}
          onClick={handleAddExpense}>Add</button>
      </div>
      <div style={{ flex: 1 }}>
        {expenses.map((expense) => (
          <div key={expense.id} style={{
            fontSize: '24px', color: 'white', border: '3px solid #66cdaa', padding: '20px', marginBottom: '20px',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%'
          }}>
            <p> Name: {expense.name} <br /> Cost: {expense.cost} isk.
              <button style={{
                position: 'absolute', top: '10px', right: '10px', color: 'red'
              }} onClick={() => handleDelete(expense.id)}>X</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;

