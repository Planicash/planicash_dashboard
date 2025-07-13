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