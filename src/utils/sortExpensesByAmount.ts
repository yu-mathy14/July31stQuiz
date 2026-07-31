import type { Expense } from "../types";

export function sortExpensesByAmount(
  expenses: Expense[],
  order: "asc" | "desc"
): Expense[] {
  return [...expenses].sort((a, b) => {
    return order === "asc"
      ? a.amount - b.amount
      : b.amount - a.amount;
  });
}