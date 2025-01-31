"use client";

import ClassList from "@/components/ClassList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

const ClassListPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      // Redirect to Home page if not signed in
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h2>Select a Class</h2>
      <ClassList/>
    </div>
  );
};

export default ClassListPage;