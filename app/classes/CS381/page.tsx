import { useParams } from "next/navigation"; // To access the dynamic classId
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  const { classId } = useParams();  // Extract the classId from the URL
  
  // If classId is an array, take the first element
  const classIdString = Array.isArray(classId) ? classId[0] : classId;

  return classIdString ? <Quiz classId={classIdString} /> : <p>Loading...</p>;
}