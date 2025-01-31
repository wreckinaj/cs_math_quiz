import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminPanel = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsRef = collection(firestore, "requests");
      const snapshot = await getDocs(requestsRef);
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchRequests();
  }, []);

  const handleDecision = async (id: string, approved: boolean) => {
    const requestRef = doc(firestore, "requests", id);
    await updateDoc(requestRef, { status: approved ? "approved" : "denied" });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {requests.map(req => (
        <div key={req.id}>
          <p>{req.type === "class" ? "New Class" : "New Question"}: {req.content}</p>
          <button onClick={() => handleDecision(req.id, true)}>Approve</button>
          <button onClick={() => handleDecision(req.id, false)}>Deny</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;