import { useState } from 'react';
import AddExpense from './Components/AddExpense.tsx'
import Header from './Components/Header.tsx'
import Navbar from './Components/Navbar.tsx'
import Dashboard from './Components/Dashboard.tsx'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'addExpense'>('dashboard');

  return (
    <>
      <Header />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'dashboard' ? <Dashboard /> : <AddExpense />}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}
