import type { Question } from "../types";

const choice1 = crypto.randomUUID();
const choice2 = crypto.randomUUID();
const choice3 = crypto.randomUUID();
const choice4 = crypto.randomUUID();

export const initialQuestions: Question[] = [
  {
    id: crypto.randomUUID(),
    text: "問題文を入力",
    choices: [
      { id: choice1, label: "選択肢1" },
      { id: choice2, label: "選択肢2" },
      { id: choice3, label: "選択肢3" },
      { id: choice4, label: "選択肢4" },
    ],
    correctChoiceId: choice4, // 正解の選択肢
    explanation: "解説を入力", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'JavaScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  },
    {
    id: crypto.randomUUID(),
    text: "問題文を入力",
    choices: [
      { id: choice1, label: "選択肢1" },
      { id: choice2, label: "選択肢2" },
      { id: choice3, label: "選択肢3" },
      { id: choice4, label: "選択肢4" },
    ],
    correctChoiceId: choice4, // 正解の選択肢
    explanation: "解説を入力", // 解説文
    timeLimitSec: 10, // 制限時間
    category: 'JavaScript', // 'JavaScript', 'TypeScript', 'React'のどれか
  }
];