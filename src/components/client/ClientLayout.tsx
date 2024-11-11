import Footer from "../Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-500 text-white p-4">
        <h1>Client Dashboard</h1>
      </header>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li>
            <a href="/client/profile" className="hover:underline">
              Profile
            </a>
          </li>
          <li>
            <a href="/client/orders" className="hover:underline">
              Orders
            </a>
          </li>
          <li>
            <a href="/client/settings" className="hover:underline">
              Settings
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default ClientLayout;
