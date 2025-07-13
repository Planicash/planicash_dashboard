

// Income
export interface Income {
    id: string
    source: string
    amount: number
    frequency: "monthly" | "weekly" | "yearly" | "one-time"
    category: string
    status: "active" | "inactive"
    nextDate?: string
}

export interface IncomeModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (income: Omit<Income, "id">) => void
    income?: Income | null
}

// Transactions
export interface Transaction {
    id: string
    description: string
    amount: number
    type: "income" | "expense"
    category: string
    date: string
    paymentMethod: string
    status: "completed" | "pending" | "cancelled"
}

export interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (transaction: Omit<Transaction, "id">) => void
    transaction?: Transaction | null
}

// Savings

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

export interface SavingsModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (saving: Omit<Savings, "id">) => void
    saving?: Savings | null
}


// Payment

export interface PaymentMethod {
    id: string
    name: string
    type: "credit" | "debit" | "bank" | "digital"
    number: string
    status: "active" | "inactive"
}

export interface PaymentMethodModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (method: Omit<PaymentMethod, "id">) => void
    method?: PaymentMethod | null
}


// Form

export interface Form {
    id: string
    name: string
    description: string
    fields: number
    submissions: number
    status: "active" | "draft" | "archived"
    createdDate: string
    lastModified: string
}

export interface FormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (form: Omit<Form, "id">) => void
    form?: Form | null
}
