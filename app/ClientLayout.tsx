// 'use client'; // This file is a Client Component

// import Header from '../components/Header/Header'; // Import the Header component
// import { usePathname } from 'next/navigation'; // Client-side hook

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname(); // Get the current path

//   // Define routes where the header should not appear, such as the login page
//   const hideHeaderRoutes = ['/login'];

//   const shouldShowHeader = !hideHeaderRoutes.includes(pathname); // Conditionally show header

//   return (
//     <>
//       {shouldShowHeader && <Header />} {/* Conditionally render header */}
//       {children}
//     </>
//   );
// }



'use client'; // This file is a Client Component

import Header from '../components/Header/Header'; // Import the Header component
import { usePathname } from 'next/navigation'; // Client-side hook
import { useAuth } from '../components/AuthContext'; // Import authentication context

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path
  const { auth } = useAuth(); // Get authentication state

  // Define routes where the header should not appear, such as the login page
  const hideHeaderRoutes = ['/login'];

  // Conditionally show header based on login status and route
  const shouldShowHeader = auth.isAuthenticated && !hideHeaderRoutes.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />} {/* Conditionally render header */}
      {children}
    </>
  );
}
