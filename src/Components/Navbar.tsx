interface NavbarProps {
    activeTab: 'dashboard' | 'addExpense';
    onTabChange: (tab: 'dashboard' | 'addExpense') => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
    return (
        <nav className="navbar">
            <button
                className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => onTabChange('dashboard')}
            >
                Dashboard
            </button>
            <button
                className={`nav-tab ${activeTab === 'addExpense' ? 'active' : ''}`}
                onClick={() => onTabChange('addExpense')}
            >
                Add Expense
            </button>
        </nav>
    );
}

