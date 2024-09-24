// import Link from 'next/link';

// const Header = () => {
//   return (
//     <header className="header">
//       <nav className="nav">
//         <ul className="nav-list">
//           <li><Link href="/leads">Leads</Link></li>
//           <li><Link href="/dashboard">Batch</Link></li>
//           <li><Link href="/profile">Profile</Link></li>
//           <li><Link href="/profile">Candidate</Link></li>
//           <li><Link href="/logout">Logout</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Avatar</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/leads" className="text-lg font-semibold hover:text-purple-400">
              Leads
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-lg font-semibold hover:text-purple-400">
              Batch
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-lg font-semibold hover:text-purple-400">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/candidate" className="text-lg font-semibold hover:text-purple-400">
              Candidate
            </Link>
          </li>
          <li>
            <Link href="/logout" className="text-lg font-semibold hover:text-purple-400">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
