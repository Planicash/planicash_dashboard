import type { Income } from "./incomes";

export const mockIncomes: Income[] = [
    {
        id: "1",
        source: "Salary",
        amount: 5000,
        frequency: "monthly",
        category: "Employment",
        status: "active",
        nextDate: "2024-02-01",
    },
    {
        id: "2",
        source: "Freelance Project",
        amount: 1200,
        frequency: "one-time",
        category: "Freelance",
        status: "active",
        nextDate: "2024-02-01",
    },
    {
        id: "3",
        source: "Investment Returns",
        amount: 300,
        frequency: "monthly",
        category: "Investment",
        status: "active",
        nextDate: "2024-02-15",
    },
]