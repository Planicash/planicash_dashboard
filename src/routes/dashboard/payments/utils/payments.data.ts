import type { PaymentMethod } from "./payments";

export const mockPaymentMethods: PaymentMethod[] = [
    { id: "1", name: "Visa Principal", type: "credit", number: "**** 1234", status: "active" },
    { id: "2", name: "Cuenta Corriente", type: "bank", number: "**** 5678", status: "active" },
    { id: "3", name: "PayPal", type: "digital", number: "user@email.com", status: "inactive" },
]
