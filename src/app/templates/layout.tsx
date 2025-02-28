import Link from "next/link";
import { UserIcon, UserRoundPlus } from "lucide-react"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">

      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col space-y-6">
        <h2 className="text-xl font-bold text-center text-white">Dashboard</h2>
        <nav className="space-y-4">
          <Link
            href="/users"
            className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
          >
            <UserIcon className="w-5 h-5 mr-3" />
            Users List
          </Link>

          <Link
            href="/create-users"
            className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
          >
            <UserRoundPlus className="w-5 h-5 mr-3" />
            Users Create
          </Link>

        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
