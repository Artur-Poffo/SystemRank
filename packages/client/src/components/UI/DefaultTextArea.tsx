import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { FormLabel } from "./FormLabel";

interface DefaultTextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  label?: string
}

export const DefaultTextArea = React.forwardRef<HTMLTextAreaElement, DefaultTextAreaProps>(({ name, className, label, placeholder, required = false, ...rest }: DefaultTextAreaProps, ref) => {
  return (
    label ? (
      <>
        <FormLabel htmlFor={name} text={label} />
        <textarea ref={ref} name={name} className={`min-h-[200px] outline-none bg-brand-blue-800 p-2 rounded-sm text-brand-blue-600 ${className}`} placeholder={placeholder} required={required} {...rest} />
      </>
    ) : (
      <textarea ref={ref} name={name} className={`min-h-[200px] outline-none bg-brand-blue-800 p-2 rounded-sm text-brand-blue-600 ${className}`} placeholder={placeholder} required={required} {...rest} />
    )
  )
})

DefaultTextArea.displayName = "DefaultTextArea"