import AuthForm from "../components/AuthForm";

const LOGIN_FIELDS = [
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

export default function LoginPage() {
  return (
    <AuthForm
      title="Welcome back."
      subtitle="Sign in to continue reading."
      fields={LOGIN_FIELDS}
      buttonText="Sign in"
      footerText="No account?"
      footerLink={{ href: "/signup", label: "Create one" }}
    />
  );
}
