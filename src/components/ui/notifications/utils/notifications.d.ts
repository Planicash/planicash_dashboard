export interface NotificationType {
    id: string
    title: string
    message: string
    type: "transaction" | "payment" | "income" | "alert" | "system"
    timestamp: string
    read: boolean
    amount?: number
}
