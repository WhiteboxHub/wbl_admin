


import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/ip_logo1.jpg';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { useAuth } from '../../components/AuthContext';

interface MenuItem {
  name: string;
  href: string;
  subMenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Recruiting',
    href: '',
    subMenu: [
      { name: 'Leads', href: '/leads' },
      { name: 'Access', href: '/access' }
    ]
  },
  {
    name: 'Training',
    href: '',
    subMenu: [
      { name: 'Batch', href: '/batch' },
      { name: 'Candidates', href: '/candidate' },
    ],
  },
  {
    name: 'Marketing',
    href: '',
    subMenu: [  
      { name: 'Employees', href: '/employees' },
      { name: 'Candidates Status', href: '/candidate' },
      { name: 'Search', href: '/search' },
    ]
  },
  {
    name: 'HR',
    href: '',
    subMenu: [
    

          { name: 'PO', href: 'po' },
        
      
      {
        name: 'Invoice',
        href: '',
        subMenu: [
          { name: 'Overdue', href: '/overdue' },
          { name: 'By PO', href: '/bypo' },
          { name: 'By Month', href: '/bymonth' }
        ]
      },
      { name: 'Client', href: '/client' },
      { name: 'Vendor', href: '/vendor' },
      { name: 'Placement', href: '/placement' }
    ]
  },
];

const DropdownMenu: React.FC<{ item: MenuItem, level: number }> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li ref={menuRef} className="relative group list-none p-0 m-">
      <div
        className={`flex items-center justify-between px-4 py-2 text-white hover:bg-indigo-800 cursor-pointer transition-colors duration-300 ${level === 0 ? 'text-lg font-semibold' : 'text-base'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Link href={item.href || '#'} className="flex items-center w-full">
          {item.name}
          {item.subMenu && (
            level === 0 ? <HiChevronDown className="ml-1 w-4 h-4" /> : <HiChevronRight className="ml-1 w-4 h-4" />
          )}
        </Link>
      </div>
      {item.subMenu && (
        <ul className={`${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out list-none p-0 m-0 ${level === 0 ? 'absolute left-0 top-full bg-indigo-700 rounded-b-md shadow-lg w-48' : 'bg-indigo-800'}`}>
          {item.subMenu.map((subItem) => (
            <DropdownMenu key={subItem.name} item={subItem} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
     <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-full shadow-md">
              <Image src={logo} alt="Logo" width={150} height={150} className="rounded-full" />
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <DropdownMenu key={item.name} item={item} level={0} />
            ))}
          </div>
          <div className="hidden lg:block">
            <Link href="/login" className="text-lg font-semibold hover:text-red-300 transition duration-300" onClick={logout}>
              Logout
            </Link>
          </div>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
        <div className={`lg:hidden mt-4 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
          <ul className="flex flex-col space-y-2 list-none">
            {menuItems.map((item) => (
              <DropdownMenu key={item.name} item={item} level={0} />
            ))}
            <li>
              <Link href="/login" className="block py-2 text-lg font-semibold hover:text-red-300 transition duration-300" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
