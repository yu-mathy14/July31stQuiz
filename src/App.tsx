// ===========================================
// アプリ全体の親コンポーネント
/* 問題一覧（questions）の状態を管理し、
   QuestionFormから追加された問題を保存する*/
// ===========================================

import { useState } from "react";
import QuizAuthoring from "./components/QuizAuthoring";
import type { Question } from "./types";

function App() {

  /* 【useState】問題一覧を管理するState */
  /* 初期値は空配列で、Question型のオブジェクトが入った配列型 */
  const [questions, setQuestions] = useState<Question[]>([]);

  /* QuestionFormから新しい問題が送られてきた時に実行するイベントハンドラー */
  const handleAdd = (question: Question) => {
    /* 配列の最後の要素に新しい問題を追加 */
    /* question -> 新しい問題オブジェクト */
    /* ...prev -> 配列の中身を全て取り出す */
    setQuestions((prev) => [...prev, question]);
  };

  return (
    <QuizAuthoring
      /* 現在登録されている問題一覧
      -> QuestionListで表示される */
      questions={questions}
      /* QuestionFormで登録ボタンが押された時に呼ばれる */
      onAdd={handleAdd}
    />
  );
}

export default App;