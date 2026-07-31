import { useState } from "react";
import QuizAuthoring from "./components/QuizAuthoring";
import type { Question } from "./types";

function App() {

  /* 【useState】
  問題一覧を管理するState */
  const [questions, setQuestions] = useState<Question[]>([]);

  /* 問題を追加する処理 */
  const handleAdd = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  return (
    <QuizAuthoring
      questions={questions}
      onAdd={handleAdd}
    />
  );
}

export default App;