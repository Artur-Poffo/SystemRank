import { AuthPageTemplate } from "../components/AuthPageTemplate";

import signInPageImage from "@/../public/images/signin-page-image.jpg";
import { SignInForm } from "../components/SignInForm";

export default function signin() {
  return (
    <AuthPageTemplate title="Entrar" backgroundImagePath={signInPageImage.src}>
      <SignInForm />
    </AuthPageTemplate>
  )
}