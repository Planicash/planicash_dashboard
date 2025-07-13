import { useState, useEffect } from "preact/hooks"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Form, FormModalProps } from "./types"


export function FormModal({ isOpen, onClose, onSave, form }: FormModalProps) {
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState<Omit<Form, "id">>({
    name: "",
    description: "",
    fields: 1,
    submissions: 0,
    status: "draft",
    createdDate: today,
    lastModified: today,
  })

  useEffect(() => {
    if (form) {
      setFormData({
        name: form.name,
        description: form.description,
        fields: form.fields,
        submissions: form.submissions,
        status: form.status,
        createdDate: form.createdDate,
        lastModified: today,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        fields: 1,
        submissions: 0,
        status: "draft",
        createdDate: today,
        lastModified: today,
      })
    }
  }, [form, isOpen])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] card">
        <DialogHeader>
          <DialogTitle className="title">{form ? "Edit Form" : "Create Form"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Form Name</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="name"
              value={formData.name}
              onInput={(e) =>
                setFormData({ ...formData, name: (e.target as HTMLInputElement).value })
              }
              placeholder="e.g., Customer Registration"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea

              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="description"
              value={formData.description}
              onInput={(e) =>
                setFormData({ ...formData, description: (e.target as HTMLTextAreaElement).value })
              }
              placeholder="Describe the purpose of this form"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fields">Number of Fields</Label>
            <Input
              className="bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
              id="fields"
              type="number"
              value={formData.fields}
              onInput={(e) =>
                setFormData({
                  ...formData,
                  fields: Number.parseInt((e.target as HTMLInputElement).value) || 1,
                })
              }
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Form["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button className="text-indigo-600 border border-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-900"
              variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" >{form ? "Update" : "Create"} </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
