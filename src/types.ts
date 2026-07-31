export type Category = 'JavaScript' | 'TypeScript' | 'React';

export type Choice = {
    id: string;       // 選択肢id（crypto.randomUUID()）
    label: string;    // 選択肢の文言
};

export type Question = {
    id: string;             // 問題id（crypto.randomUUID()）
    text: string;           // 問題文
    choices: Choice[];      // 選択肢（4個）
    correctChoiceId: string;// 正解の選択肢id
    explanation: string;    // 解説
    timeLimitSec: number;   // 制限時間（秒）
    category: Category;      // カテゴリ
};