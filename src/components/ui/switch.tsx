import { useState } from "preact/hooks"
import { cn } from "@/utils/cn"

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ checked = false, onChange, className }: SwitchProps) {
  const [internalChecked, setChecked] = useState(checked)

  const toggle = () => {
    const newValue = !internalChecked
    setChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={internalChecked}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        internalChecked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform",
          internalChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}
