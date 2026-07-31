import type { Category, Expense } from "../types";

export function filterExpensesByCategory(
  expenses: Expense[],
  category: "すべて" | Category
): Expense[] {
  if (category === "すべて") {
    return expenses;
  }

  return expenses.filter(
    (expense) => expense.category === category
  );
}