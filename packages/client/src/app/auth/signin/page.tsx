import { AuthPageTemplate } from "../components/AuthPageTemplate";

import signInPageImage from "@/../public/images/signin-page-image.jpg";
import { Metadata } from "next";
import { SignInForm } from "../components/SignInForm";

export const metadata: Metadata = {
  title: 'SystemRank | Entrar',
  description: 'Faça seu login quando quiser e volte a navegar',
}

export default function SignIn() {
  return (
    <AuthPageTemplate title="Entrar" backgroundImagePath={signInPageImage.src}>
      <SignInForm />
    </AuthPageTemplate>
  )
}