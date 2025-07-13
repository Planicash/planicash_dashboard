import type { Form } from "./forms";

export const mockForms: Form[] = [
    {
        id: "1",
        name: "Customer Registration",
        description: "Form for new customer registration",
        fields: 8,
        submissions: 45,
        status: "active",
        createdDate: "2024-01-10",
        lastModified: "2024-01-15",
    },
    {
        id: "2",
        name: "Expense Report",
        description: "Monthly expense reporting form",
        fields: 12,
        submissions: 23,
        status: "active",
        createdDate: "2024-01-05",
        lastModified: "2024-01-12",
    },
    {
        id: "3",
        name: "Feedback Survey",
        description: "Customer satisfaction survey",
        fields: 6,
        submissions: 0,
        status: "draft",
        createdDate: "2024-01-08",
        lastModified: "2024-01-08",
    },
]