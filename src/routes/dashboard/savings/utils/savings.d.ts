export interface Savings {
    id: string
    name: string
    description: string
    currentAmount: number
    targetAmount: number
    monthlyContribution: number
    category: "emergency" | "vacation" | "retirement" | "investment" | "other"
    status: "active" | "completed" | "paused"
    startDate: string
    targetDate: string
}
