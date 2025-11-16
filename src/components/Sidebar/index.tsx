import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, FileText, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavClick: (view: string) => void;
}

type NavItem = {
  name: string;
  icon: React.ReactNode;
};

export const Sidebar = ({ activeView, onNavClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', icon: <Users size={20} /> },
    { name: 'Reports', icon: <FileText size={20} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {

        setIsOpen(true);

      } else {

        setIsOpen(false);

      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (name: string) => {
    onNavClick(name);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>

      <button

        onClick={toggleSidebar}

        className={`fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden ${isOpen ? 'hidden' : 'block'

          }`}

      >

        <Menu size={24} />

      </button>


      <div

        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'

          } md:translate-x-0 w-64`}

      >


        <div className="flex justify-between items-center p-4 border-b">

          <h1 className="text-xl font-semibold">Dashboard</h1>

          <button

            onClick={toggleSidebar}

            className="md:hidden p-1 rounded-md hover:bg-gray-100"

          >

            <X size={24} />

          </button>

        </div>



        <nav className="p-4">

          {navItems.map((item) => (

            <button

              key={item.name}

              onClick={() => handleNavClick(item.name)}

              className={`flex items-center w-full p-3 mb-2 rounded-md transition-colors ${activeView === item.name

                ? 'bg-indigo-100 text-indigo-700'

                : 'text-gray-700 hover:bg-gray-100'

                }`}

            >

              <span className="mr-3">{item.icon}</span>

              <span>{item.name}</span>

            </button>

          ))}

        </nav>
      </div>

      {isOpen && isMobile && (

        <div

          onClick={toggleSidebar}

          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"

        />

      )}
    </>
  );
};

export default Sidebar;
