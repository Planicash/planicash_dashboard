/** @jsxImportSource preact */
import { useState } from "preact/hooks"
import { Plus, Edit, Trash2, FileText, Eye } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FormModal } from "@/components/modals/forms-modal"
import type { Form } from "./utils/forms"
import { mockForms } from "./utils/forms.data"
import { Label } from "@/components/ui/label"

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>(mockForms)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingForm, setEditingForm] = useState<Form | null>(null)

  const handleCreate = () => {
    setEditingForm(null)
    setIsModalOpen(true)
  }

  const handleEdit = (form: Form) => {
    setEditingForm(form)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setForms((forms) => forms.filter((f) => f.id !== id))
  }

  const handleSave = (form: Omit<Form, "id">) => {
    if (editingForm) {
      setForms((forms) =>
        forms.map((f) => (f.id === editingForm.id ? { ...form, id: editingForm.id } : f))
      )
    } else {
      const newForm = { ...form, id: Date.now().toString() }
      setForms((forms) => [...forms, newForm])
    }
    setIsModalOpen(false)
  }

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }
}


  const totalSubmissions = forms.reduce((sum, form) => sum + form.submissions, 0)
  const activeForms = forms.filter((f) => f.status === "active").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="title">Forms</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage your forms</p>
        </div>
        <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Forms</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">{activeForms}</p>
              </div>
              <FileText className="h-12 w-12 text-indigo-600 dark:text-indigo-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-300">{totalSubmissions}</p>
              </div>
              <Eye className="h-12 w-12 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{form.name}</CardTitle>
                <Badge className={getStatusColor(form.status)}>{form.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label>{form.description}</Label>
                <div className="flex justify-between items-center">
                  <Label>Fields:</Label>
                  <span className="text-sm font-semibold dark:text-white">{form.fields}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Submissions:</Label>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-300">{form.submissions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Created:</Label>                  <span className="text-sm dark:text-white">{form.createdDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label >Modified:</Label>
                  <span className="text-sm dark:text-white">{form.lastModified}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(form)} className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(form.id)}
                    className="flex-1"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={editingForm}
      />
    </div>
  )
}
