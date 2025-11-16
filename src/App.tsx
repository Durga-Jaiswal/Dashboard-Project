// src/App.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import Users from './components/Users';
import UsersByCityChart from './components/Reports/UsersByCityChart';
import type { User } from './types/user';
import Dashboard from './components/Dashboard';
import type { Product } from './types/Product';
import UsersByCompanyChart from './components/Reports/UsersByCompanyChart';


function App() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);


  // Update the fetchProducts function
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };


    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard products={products} isLoading={isLoading} error={error} />;

      case 'Users':
        return <Users users={users} isLoading={isLoading} error={error} />;
     
        case 'Reports':
        return (
          <div className="w-full px-2 sm:px-4 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="w-full">
                <UsersByCityChart users={users} />
              </div>
              <div className="w-full">
                <UsersByCompanyChart users={users} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeView={activeView} onNavClick={setActiveView} />
      <main className="flex-1 transition-all duration-300 ease-in-out ml-20 md:ml-64 p-6">
        {!isMobile && (
          <button
            className="md:hidden fixed top-4 right-4 p-2 bg-white rounded-md shadow-md z-30"
            onClick={() => {
              const sidebar = document.querySelector('.fixed[class*="bg-slate-800"]') as HTMLElement;
              if (sidebar) {
                const isOpen = !sidebar.classList.contains('-translate-x-full');
                sidebar.classList.toggle('-translate-x-full', !isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
              }
            }}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;