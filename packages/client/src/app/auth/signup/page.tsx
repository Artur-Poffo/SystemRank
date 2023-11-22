import { AuthPageTemplate } from "../components/AuthPageTemplate";

import signUpPageImage from "@/../public/images/signup-page-image.jpg";
import { Metadata } from "next";
import { SignUpForm } from "../components/SignUpForm";

export const metadata: Metadata = {
  title: 'SystemRank | Cadastro',
  description: 'Crie sua conta e comece a explorar',
}

export default function SignUp() {
  return (
    <AuthPageTemplate title="Criar conta" backgroundImagePath={signUpPageImage.src} >
      <SignUpForm />
    </AuthPageTemplate>
  )
}