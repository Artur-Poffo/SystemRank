interface FormErrorProps {
  errorMessage: string
}

export function FormError({ errorMessage }: FormErrorProps) {
  return (
    <span className="text-sm text-red-600 font-bold" >{errorMessage}</span>
  )
}