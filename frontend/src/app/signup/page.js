"use client";

import AuthForm from "../components/AuthForm";
import { signup } from "../../lib/api";

const SIGNUP_FIELDS = [
    { id: "username", label: "Username", type: "text", placeholder: "your_username" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

async function handleSignup(data, router) {
    await signup({ username: data.username, email: data.email, password: data.password });
    router.push("/login");
}

export default function SignupPage() {
    return (
        <AuthForm
            title="Join Madhyam."
            subtitle="Create an account to start writing."
            fields={SIGNUP_FIELDS}
            buttonText="Create account"
            footerText="Already a member?"
            footerLink={{ href: "/login", label: "Sign in" }}
            onSubmit={handleSignup}
        />
    );
}
