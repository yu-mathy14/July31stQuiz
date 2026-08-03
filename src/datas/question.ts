import type { Question } from "../types";

const choice1 = crypto.randomUUID();
const choice2 = crypto.randomUUID();
const choice3 = crypto.randomUUID();
const choice4 = crypto.randomUUID();

export const initialQuestions: Question[] = [
  {
    id: crypto.randomUUID(),
    text: "falsyに当てはまらないものは？",
    choices: [
      { id: choice1, label: "false" },
      { id: choice2, label: "0n" },
      { id: choice3, label: "NAN" },
      { id: choice4, label: "''" },
    ],
    correctChoiceId: choice3, // 正解の選択肢
    explanation: "正しくはNANではなくNaNです。JavaScriptにおける非数（数字ではないもの）を表す、特別な値です。", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'JavaScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "タスクキューに入るものは？",
    choices: [
      { id: choice1, label: "setTimeout" },
      { id: choice2, label: "queueMicrotask" },
      { id: choice3, label: "Promise" },
      { id: choice4, label: "queueMacrotask" },
    ],
    correctChoiceId: choice4, // 正解の選択肢
    explanation: "正解はsetTimeoutです。PromiseとqueueMicrotaskはジョブキューに入ります。queueMacrotaskは存在しません。", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'JavaScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "クラス内及びサブクラス内からアクセス可能なアクセス修飾子は？",
    choices: [
      { id: choice1, label: "abstract" },
      { id: choice2, label: "private" },
      { id: choice3, label: "public" },
      { id: choice4, label: "protected" },
    ],
    correctChoiceId: choice4, // 正解の選択肢
    explanation: "abstractは抽象クラスを定義する時に使います。privateはクラスの内部でのみ、publicはクラスの内外問わずアクセス可能です。", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'TypeScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "どんな型でも代入可能であるが、型安全性の観点から無闇に使ってはいけないものは？",
    choices: [
      { id: choice1, label: "any" },
      { id: choice2, label: "unknown" },
      { id: choice3, label: "Record<T,K>" },
      { id: choice4, label: "Readonly<T>" },
    ],
    correctChoiceId: choice1, // 正解の選択肢
    explanation: "any型は型チェックが適用されないため、実行時にエラーが起きる原因となります。unknown型では型安全性を損なうことなく未知の型を扱えます。Record<T,K>やReadonly<T>は特定の型に制約されず、再利用可能なコードを作成する仕組みです。",
    timeLimitSec: 10, // 制限時間
    category: 'TypeScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "次の選択肢のうち、コンポーネントをメモするものは？",
    choices: [
      { id: choice1, label: "useComponent" },
      { id: choice2, label: "memo" },
      { id: choice3, label: "useMemo" },
      { id: choice4, label: "useBack" },
    ],
    correctChoiceId: choice2, // 正解の選択肢
    explanation: "解説を入力", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'React', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "「const[ A, B ] = useState(C);」A,Bの組み合わせとして適切なものは？",
    choices: [
      { id: choice1, label: "A:オブジェクト、B:再描画実行関数" },
      { id: choice2, label: "A:現在の状態値、B:状態更新用関数" },
      { id: choice3, label: "A:初期値の参照、B:直前の状態管理" },
      { id: choice4, label: "A:状態更新用関数、B:現在の状態値" },
    ],
    correctChoiceId: choice2, // 正解の選択肢
    explanation: "解説を入力", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'React', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "タイマーのID(setIntervalの戻り値)を保存する時、useStateではなくuseRefを使うのが推奨される一番の大きな理由は？",
    choices: [
      { id: choice1, label: "useStateだとタイマーが勝手に止まるから" },
      { id: choice2, label: "useStateでとIDを保存・更新する度に無駄な再描画が発生するから" },
      { id: choice3, label: "useRefを使わないとclearIntervalが動かないというルールだから" },
      { id: choice4, label: "useStateだと画面がフリーズしてしまうから" },
    ],
    correctChoiceId: choice2, // 正解の選択肢
    explanation: "useStateでタイマーIDを更新すると、その度に「画面を書き換えて！」という通知が入ってしまい無駄な再描画が起きます。画面に関係ないデータはuseRefで裏で静かに保持するのがベストです。", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'React', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
  {
    id: crypto.randomUUID(),
    text: "イベントのデフォルト動作(ブラウザが標準で行う挙動)をキャンセルするメソッド？",
    choices: [
      { id: choice1, label: "stopPropagation()" },
      { id: choice2, label: "preventDefault()" },
      { id: choice3, label: "stopImmediatePropagation()" },
      { id: choice4, label: "target.reset()" },
    ],
    correctChoiceId: choice2, // 正解の選択肢
    explanation: "preventDefault() はブラウザ標準の挙動をキャンセルします。", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'React', // 'JavaScript', 'TypeScript', 'React'のどれか
  }
];