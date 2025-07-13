export interface PaymentMethod {
    id: string
    name: string
    type: "credit" | "debit" | "bank" | "digital"
    number: string
    status: "active" | "inactive"
}
