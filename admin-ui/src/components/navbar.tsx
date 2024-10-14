import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown } from "lucide-react";

const AdminNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="flex items-center mr-4">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TURBOCODE⚡️
            </span>
          </a>
          {/* <div className="hidden md:flex items-center">
            <Button variant="ghost" className="mr-2">
              Dashboard
            </Button>
            <Button variant="ghost" className="mr-2">
              <Users className="h-4 w-4 mr-2" />
              Users
            </Button>
            <Button variant="ghost">
              <FileText className="h-4 w-4 mr-2" />
              Problems
            </Button>
          </div> */}
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <span className="mr-1">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
