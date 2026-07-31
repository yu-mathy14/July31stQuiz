export type Category = 'JavaScript' | 'TypeScript' | 'React';

export type Choice = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  timeLimitSec: number;
  category: Category;
};