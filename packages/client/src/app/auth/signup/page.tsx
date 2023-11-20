import { AuthPageTemplate } from "../components/AuthPageTemplate";

import signUpPageImage from "@/../public/images/signup-page-image.jpg";
import { SignUpForm } from "../components/SignUpForm";

export default function signup() {
  return (
    <AuthPageTemplate title="Criar conta" backgroundImagePath={signUpPageImage.src} >
      <SignUpForm />
    </AuthPageTemplate>
  )
}