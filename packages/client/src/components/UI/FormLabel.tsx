import { LabelHTMLAttributes } from "react";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string
}

export function FormLabel({ htmlFor, className, text, ...rest }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`text-sm text-brand-blue-600 font-bold ${className}`} {...rest}>
      {text}
    </label>
  )
}