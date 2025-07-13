export type Income = {
    id: string
    source: string
    amount: number
    frequency: "monthly" | "weekly" | "yearly" | "one-time"
    category: string
    nextDate?: string //
    status: "active" | "inactive"
}
