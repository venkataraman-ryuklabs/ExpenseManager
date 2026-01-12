import { useState } from 'react';
import AddExpense from './Components/AddExpense.tsx'
import Header from './Components/Header.tsx'
import Navbar from './Components/Navbar.tsx'
import Dashboard from './Components/Dashboard.tsx'

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'addExpense'>('dashboard');

  return (
    <>
      <Header />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'dashboard' ? <Dashboard /> : <AddExpense />}
    </>
  )
}
