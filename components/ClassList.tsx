import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Quiz from "@/components/Quiz";

const ClassList = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const classRef = collection(firestore, "classes");
      const snapshot = await getDocs(classRef);
      setClasses(snapshot.docs.map(doc => doc.id));
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Select a Class</h2>
      {classes.map(cls => (
        <button key={cls} onClick={() => setSelectedClass(cls)}>{cls}</button>
      ))}
      {selectedClass && <Quiz classId={selectedClass} />}
    </div>
  );
};

export default ClassList;