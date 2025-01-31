import AdminPanel from "@/components/AdminPanel";
import useAdminStatus from "@/useAdminStatus";

export default function AdminPage() {
  const isAdmin = useAdminStatus();
  return isAdmin ? <AdminPanel /> : <p>Access Denied</p>;
}