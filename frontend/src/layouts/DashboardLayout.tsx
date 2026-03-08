import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

          {/* <h1 className="font-bold text-lg">
            BeyondChats Dashboard
          </h1> */}

          <div className="flex gap-4 text-sm">
            <Link to="/" className="hover:text-blue-600">
              Integrations
            </Link>

            <Link to="/chats" className="hover:text-blue-600">
              Chats
            </Link>
          </div>

        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Outlet />
      </div>

    </div>
  );
}