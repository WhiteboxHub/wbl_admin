// import Link from 'next/link';
// import Image from 'next/image';
// import logo from '../../public/images/ip_logo1.jpg'; // Adjust the path to your logo image

// const Header = () => {
//   // const handleLogoutAction = () => {
//   //   // Add your logout logic here
//   //   console.log('Logout button clicked');
//   // };

//   return (
//     <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
//       <nav className="container mx-auto flex justify-between items-center px-4">
//         {/* Logo and Navigation */}
//         <div className="flex items-center">
//           {/* Logo with larger margin */}
//           <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
//           {/* Add margin between logo and nav */}
//           <ul className="flex ml-8 space-x-8">
//             <li>
//               <Link href="/leads" className="relative text-lg font-semibold hover:text-gray-300 transition duration-300">
//                 Leads
//               </Link>
//             </li>
//             <li>
//               <Link href="/batch" className="relative text-lg font-semibold hover:text-gray-300 transition duration-300">
//                 Batch
//               </Link>
//             </li>
//             <li>
//               <Link href="/profile" className="relative text-lg font-semibold hover:text-gray-300 transition duration-300">
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <Link href="/candidate" className="relative text-lg font-semibold hover:text-gray-300 transition duration-300">
//                 Candidate
//               </Link>
//             </li>
//           </ul>
//         </div>
//         {/* Logout Button */}
//         <div>
//           <Link href="/login" className="relative text-lg font-semibold hover:text-red-300 transition duration-300">
//             Logout
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/ip_logo1.jpg'; // Adjust the path to your logo image

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
          <ul className="flex ml-8 space-x-6">
            <li>
              <Link href="/leads" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
                Leads
              </Link>
            </li>
            <li>
              <Link href="/batch" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
                Batch
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/candidate" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
                Candidate
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href="/login" className="text-lg font-semibold hover:text-red-300 transition duration-300">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
