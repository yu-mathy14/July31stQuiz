import QuestionItem from "./QuestionItem";
import type { Question } from "../types";

/* 【型エイリアス】型定義 */
type QuestionListProps = {
  /* Question型のオブジェクトが入った配列 */
  questions: Question[];
};

/* Reactコンポーネントを作るための関数 
export このファイルの外でも使えるようにする
default カッコ {} なしでシンプルに読み込める 読み込む側で好きな名前をつけられる
React では、function はただの計算ではなく、HTML（画面の見た目）を組み立てて返すための「コンポーネント」 として使います。
function は、プログラミング（JavaScript / TypeScript / React）における 「関数（かんすう）」 を作るためのキーワードです。
コンポーネント（Component）とは、Webサイトやアプリの画面を構成する「再利用可能な見た目と機能のパーツ（部品）」のことです。*/
export default function QuestionList({

  /* QuestionListProps型のオブジェクト */
  /* 初期値設定の必要なし 
  QuestionList（問題一覧コンポーネント）の関数宣言部分
　親コンポーネント(App.tsx)から渡された Propsから、先ほど定義した questions（問題データの配列） を取り出している所。*/
  questions,
}: QuestionListProps) {

  /* 【if文で条件分岐】配列の中身がない(問題が登録されていない)場合
  ∵ 早期リターンというReactでよく使われる書き方
  -> 可読性◎
    ・JSXのネストが増えない
    ・「データがない場合はここで終了」という処理の流れがわかりやすい
    questions.length === 0 で問題データが空かどうかを判定します。
　　　空の場合は 早期リターンを使い、これ以降のリスト描画処理を行わずに「登録された問題はありません。」というメッセージを返して終了します。 */
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
          
          /*子コンポーネント（QuestionItem）へデータを手渡す
            左側と右側で役割が違います。
            属性名（受け渡しの箱の名前）={実際のデータ（JavaScriptの変数）} */
          question={question}
        />
      ))}
    </ul>
  );
}