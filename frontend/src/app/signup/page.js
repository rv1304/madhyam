import AuthForm from "../components/AuthForm";

const SIGNUP_FIELDS = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

export default function SignupPage() {
    return (
        <AuthForm
            title="Join Madhyam."
            subtitle="Create an account to start writing."
            fields={SIGNUP_FIELDS}
            buttonText="Create account"
            footerText="Already a member?"
            footerLink={{ href: "/login", label: "Sign in" }}
        />
    );
}
