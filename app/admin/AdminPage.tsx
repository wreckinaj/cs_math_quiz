import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminPanel from "@/components/AdminPanel";

const AdminPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin when the component is mounted
  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // If user is signed in, check their role in Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === "admin") {
              setIsAdmin(true);
            } else {
              router.push("/classes"); // Redirect to classes page if not admin
            }
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
          router.push("/"); // Redirect to Home if there's an error
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      router.push("/"); // Redirect to Home if not signed in
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null; // This is a fallback in case the user is redirected
  }

  return (
    <div>
      <h2>Admin Page</h2>
      <AdminPanel/>
    </div>
  );
};

export default AdminPage;