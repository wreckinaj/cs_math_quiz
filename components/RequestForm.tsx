import { useState } from "react";
import { firestore, auth } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const RequestForm = () => {
  const [requestType, setRequestType] = useState("class");
  const [content, setContent] = useState("");

  const handleRequest = async () => {
    await addDoc(collection(firestore, "requests"), {
      type: requestType,
      content,
      userId: auth.currentUser?.uid,
      status: "pending",
    });
    alert("Request submitted!");
  };

  return (
    <div>
      <h2>Request to Add</h2>
      <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
        <option value="class">New Class</option>
        <option value="question">New Question</option>
      </select>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleRequest}>Submit Request</button>
    </div>
  );
};

export default RequestForm;