import { useEffect, useState } from "react";
import { firestore, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const checkAdmin = async () => {
        const userRef = doc(firestore, "users", auth.currentUser!.uid);
        const userDoc = await getDoc(userRef);
        setIsAdmin(userDoc.exists() && userDoc.data()?.role === "admin");
      };

      checkAdmin();
    }
  }, [auth.currentUser]);

  return isAdmin;
};

export default useAdminStatus;