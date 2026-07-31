import QuestionItem from "./QuestionItem";
import type { Question } from "../types";

/* 【型エイリアス】型定義 */
type QuestionListProps = {
  /* Question型のオブジェクトが入った配列 */
  questions: Question[];
};

/* Reactコンポーネントを作るための関数 */
export default function QuestionList({
  /* QuestionListProps型のオブジェクト */
  /* 初期値設定の必要なし */
  questions,
}: QuestionListProps) {
  /* 【if文で条件分岐】配列の中身がない(問題が登録されていない)場合
  ∵ 早期リターン(Early Return)というReactでよく使われる書き方
  -> 可読性◎
    ・JSXのネストが増えない
    ・「データがない場合はここで終了」という処理の流れがわかりやすい */
  if (questions.length === 0) {
    return <p>登録された問題はありません。</p>;
  }

  /* 配列の中身がある(問題が1件以上登録されている)場合の処理 */
  return (
    <ul>
      {/* 【.map()メソッド】
      配列の中身を1つ1つ取り出して実行する処理 */}
      {questions.map((question) => (
        /* QuestionItemコンポーネントにProps(値)を渡している */
        <QuestionItem
          /* 【.map()】
          keyに一意な値を指定する(データ固有の重複しないidが最適)
          前回の一覧と今回の一覧を比較して変わったところだけ更新
          -> Reactの再描画を効率的に行う */
          key={question.id}
          question={question}
        />
      ))}
    </ul>
  );
}