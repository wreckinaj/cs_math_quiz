import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const Quiz = ({ classId }: { classId: string }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsRef = collection(firestore, `classes/${classId}/questions`);
      const snapshot = await getDocs(questionsRef);
      const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, [classId]);

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
  };

  return (
    <div>
      <h2>Quiz for {classId}</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>
          <input
            type="text"
            value={answers[q.id] || ""}
            onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your Score: {score}/{questions.length}</p>}
    </div>
  );
};

export default Quiz;
