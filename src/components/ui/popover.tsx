import { useState, useRef, useEffect } from "preact/hooks"
import type { JSX } from "preact/jsx-runtime";

export function Popover({ trigger, children }: { trigger: JSX.Element; children: JSX.Element }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open && (
        <div className="absolute right-0 mt-2 w-96 rounded-md border bg-white shadow-md z-50">
          {children}
        </div>
      )}
    </div>
  )
}
