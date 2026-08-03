// ============================================================
// 作問画面全体を管理し、フォームと問題一覧をまとめて表示するコンポーネント
/* 作問に必要なコンポーネントをまとめる親コンポーネント */
// ============================================================

import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import type { Question } from "../types";

/* 【型エイリアス】型定義 */
type QuizAuthoringProps = {
  /* Question型のオブジェクトが入った配列 */
  questions: Question[];

  /* Question型を受け取って何も返さない関数 */
  onAdd: (question: Question) => void;
};

/* Reactコンポーネントを作るための関数 */
export default function QuizAuthoring({
  /* QuizAuthoringProps型のオブジェクト */
  questions,
  onAdd,
}: QuizAuthoringProps) {

  /* 画面の表示内容 */
  return (
    <>
      {/* QuestionFormへProps(値)を渡している */}
      <QuestionForm onAdd={onAdd} />

      {/* QuestionListへProps(値)を渡している */}
      <QuestionList questions={questions} />
    </>
  );
}