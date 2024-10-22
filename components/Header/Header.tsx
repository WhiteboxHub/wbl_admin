
// import Link from 'next/link';
// import Image from 'next/image';
// import logo from '../../public/images/ip_logo1.jpg'; // Adjust the path to your logo image
// import { HiChevronDown } from 'react-icons/hi'; // Import an icon for the down arrow
// import { useState } from 'react'; // Import useState for managing submenu state

// const Header = () => {
//   // State to manage which submenu is open

//   const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); 
//   // Function to toggle submenu
  
// // Function to toggle submenu
// const toggleSubMenu = (name: string | null) => { // Accept null as a valid type
//   setOpenSubMenu(openSubMenu === name ? null : name);
// };

// return (
//   <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
//     <nav className="container mx-auto flex justify-between items-center px-4">
//       <div className="flex items-center">
//         <Image src={logo} alt="Logo" width={170} height={170} className="rounded-full" />
//         <ul className="flex ml-8 space-x-12"> {/* Increased space between menu items */}
//           {/* Menu Items */}
//           {[
//             { name: 'Recruiting',
//               href: '',
//               subMenu: [
//                 { name: 'Leads', href: '/leads' },
//                 { name:'Access',href:'/access'}
//               ] },
//             {
//               name: 'Training',
//               href: '',
//               subMenu: [
//                 { name: 'Batch', href: '/batch' },
//                 { name: 'Candidates', href: '/candidate' },
//               ],
//             },
//             { name: 'Marketing', href: '/marketing', subMenu: [] },
//             { name: 'HR', href: '/hr', subMenu: [] },
//           ].map((item) => (
//             <li
//               key={item.name}
//               className="relative group"
//               onMouseEnter={() => toggleSubMenu(item.name)} // Show submenu on hover
//               onMouseLeave={() => toggleSubMenu(null)} // Hide submenu on mouse leave
//             >
//               <div
//                 onClick={(e) => {
//                   e.preventDefault(); // Prevent navigation
//                   toggleSubMenu(item.name); // Toggle submenu
//                 }}
//                 className="flex items-center text-xl font-semibold hover:text-gray-300 transition duration-300 cursor-pointer" // Increased font size
//               >
//                 <Link href={item.href}>
//                   {item.name}
//                 </Link>
//                 {item.subMenu.length > 0 && (
//                   <HiChevronDown className="ml-1 w-5 h-5" /> // Increased arrow size
//                 )}
//               </div>
//               {/* Submenu */}
//               {openSubMenu === item.name && item.subMenu.length > 0 && (
//                 <ul className="absolute left-0 flex flex-col bg-indigo-700 rounded-md shadow-lg mt-1 py-2 z-30">
//                   {item.subMenu.map((subItem) => (
//                     <li key={subItem.name}>
//                       <Link
//                         href={subItem.href}
//                         className="block px-4 py-2 text-sm text-white hover:bg-indigo-600 transition duration-300"
//                       >
//                         {subItem.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <Link href="/login" className="text-lg font-semibold hover:text-red-300 transition duration-300">
//           Logout
//         </Link>
//       </div>
//     </nav>
//   </header>
// );
// };

// export default Header;


import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/ip_logo1.jpg'; // Adjust the path to your logo image
import { HiChevronDown } from 'react-icons/hi'; // Import an icon for the down arrow
import { useState } from 'react'; // Import useState for managing submenu state
import { useAuth } from '../../components/AuthContext'; // Import the useAuth hook

const Header = () => {
  // State to manage which submenu is open
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openNestedSubMenu, setOpenNestedSubMenu] = useState<string | null>(null); // State for nested submenus

  const { logout } = useAuth(); // Get the logout function from the context

  // Function to toggle submenu
  const toggleSubMenu = (name: string | null) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
    setOpenNestedSubMenu(null); // Close nested submenu when opening a new top-level submenu
  };

  // Function to toggle nested submenu
  const toggleNestedSubMenu = (name: string | null) => {
    setOpenNestedSubMenu(openNestedSubMenu === name ? null : name);
  };

  const menuItems = [
    {
      name: 'Recruiting',
      href: '', // Add a valid href or ensure it's handled properly
      subMenu: [
        { name: 'Leads', href: '/leads' },
        { name: 'Access', href: '/access' }
      ]
    },
    {
      name: 'Training',
      href: '', // Add a valid href or ensure it's handled properly
      subMenu: [
        { name: 'Batch', href: '/batch' },
        { name: 'Candidates', href: '/candidate' },
      ],
    },
    {
      name: 'Marketing',
      href: '/marketing',
      subMenu: []
    },
    {
      name: 'HR',
      href: '/hr',
      subMenu: [
        {
       
        
             name: 'PO', href: '/Po' 
          
        },
        {
          name: 'Invoice',
          subMenu: [
            { name: 'Overdue', href: '/overdue' },
            { name: 'By PO', href: '/by-po' },
            { name: 'By Month', href: '/by-month' }
          ]
        },
        { name: 'Client', href: '/client', subMenu: [] },
        { name: 'Vendor', href: '/vendor', subMenu: [] },
        { name: 'Placement', href: '/placement', subMenu: [] }
      ]
    },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={170} height={170} className="rounded-full" />
          <ul className="flex ml-8 space-x-12"> {/* Increased space between menu items */}
            {/* Menu Items */}
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative group"
                onMouseEnter={() => toggleSubMenu(item.name)} // Show submenu on hover
                onMouseLeave={() => toggleSubMenu(null)} // Hide submenu on mouse leave
              >
                <div
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    toggleSubMenu(item.name); // Toggle submenu
                  }}
                  className="flex items-center text-xl font-semibold hover:text-gray-300 transition duration-300 cursor-pointer" // Increased font size
                >
                  <Link href={item.href || '#'}> {/* Use '#' as a fallback */}
                    {item.name}
                  </Link>
                  {item.subMenu.length > 0 && (
                    <HiChevronDown className="ml-1 w-5 h-5" /> // Increased arrow size
                  )}
                </div>
                {/* Submenu */}
                {openSubMenu === item.name && item.subMenu.length > 0 && (
                  <ul className="absolute left-0 flex flex-col bg-indigo-700 rounded-md shadow-lg mt-1 py-2 z-30">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.name} className="relative group">
                        <div
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            toggleNestedSubMenu(subItem.name); // Toggle nested submenu
                          }}
                          className="block px-4 py-2 text-sl text-white hover:bg-indigo-600 transition duration-300 cursor-pointer"
                        >
                          <Link href={subItem.href || '#'}> {/* Use '#' as a fallback */}
                            {subItem.name}
                          </Link>
                          {subItem.subMenu && subItem.subMenu.length > 0 && (
                            <HiChevronDown className="ml-1 w-5 h-5 inline-block" /> // Show arrow for nested submenu
                          )}
                        </div>
                        {/* Nested Submenu */}
                        {openNestedSubMenu === subItem.name && subItem.subMenu && (
                          <ul className="absolute left-full top-0 flex flex-col bg-indigo-800 rounded-md shadow-lg mt-3 py-2 z-30"> {/* Align to the right of parent */}
                            {subItem.subMenu.map((nestedSubItem) => (
                              <li key={nestedSubItem.name}>
                                <Link
                                  href={nestedSubItem.href || '#'} // Use '#' as a fallback
                                  className="block px-4 py-2 text-sl text-white hover:bg-indigo-700 transition duration-300"
                                >
                                  {nestedSubItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link href="/login" className="text-lg font-semibold hover:text-red-300 transition duration-300" onClick={logout}>
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

