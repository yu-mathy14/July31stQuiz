import type { Expense } from "../types";

type Summary = {
  count: number;
  total: number;
  unapprovedTotal: number;
};

export function calcSummary(expenses: Expense[]): Summary {
  const count = expenses.length;

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const unapprovedTotal = expenses
    .filter((expense) => !expense.approved)
    .reduce((sum, expense) => sum + expense.amount, 0);

  return {
    count,
    total,
    unapprovedTotal,
  };
}