import { cn } from "@/lib/utils";
import { FileText, Home, LucideIcon } from "lucide-react";

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}) => (
  <li>
    <a
      href="#"
      className={cn(
        "flex items-center p-2 text-base font-normal rounded-lg",
        isActive
          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
          : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      )}
    >
      <Icon className="w-6 h-6 transition duration-75" />
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

const AdminSidebar = () => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <ul className="space-y-2">
          <SidebarItem icon={Home} label="Dashboard" isActive={true} />
          <SidebarItem icon={FileText} label="Problems" />
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
