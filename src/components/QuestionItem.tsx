import type { Question } from "../types";

/* 【型エイリアス】型定義 */
type QuestionItemProps = {
  /* Question型のオブジェクト */
  question: Question;
};

/* Reactコンポーネントを作るための関数 */
export default function QuestionItem({
  /* QuestionItemProps型のオブジェクト */
  /* 初期値設定の必要なし */
  question,
}: QuestionItemProps) {

  /* 画面の表示内容 */
  return (
    <li>
      {/* 問題文 */}
      <h3>
        {question.text}
      </h3>

      {/* カテゴリ */}
      <p>カテゴリ：{question.category}</p>

      {/* 制限時間 */}
      <p>制限時間：{question.timeLimitSec}秒</p>

      {/* 選択肢一覧 */}
      <div>
        <p>選択肢</p>

        <ol>
          {/* 【.map()メソッド】
          配列の中身を1つ1つ取り出して表示する処理 */}
          {question.choices.map((choice) => (
            /* 【.map()】
            keyに一意な値を指定する
            ∵ Reactが前回と今回の一覧を比較して
            変更された部分だけ再描画するため */
            <li key={choice.id}>
              {choice.label}

              {/* 【三項演算子】
              正解の選択肢のみ「（正解）」と表示する
              ∵ JSXの中ではif文が書けないため */}
              {choice.id === question.correctChoiceId
                ? " （正解）"
                : ""}
            </li>
          ))}
        </ol>
      </div>

      {/* 解説 */}
      <p>
        <strong>解説：</strong>
        {question.explanation}
      </p>
    </li>
  );
}