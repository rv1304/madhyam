"use client";

import AuthForm from "../components/AuthForm";
import { login } from "../../lib/api";

const LOGIN_FIELDS = [
    { id: "username", label: "Username", type: "text", placeholder: "your_username" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

async function handleLogin(data, router) {
    await login({ username: data.username, password: data.password });
    router.push("/homepage");
}

export default function LoginPage() {
    return (
        <AuthForm
            title="Welcome back."
            subtitle="Sign in to continue reading."
            fields={LOGIN_FIELDS}
            buttonText="Sign in"
            footerText="No account?"
            footerLink={{ href: "/signup", label: "Create one" }}
            onSubmit={handleLogin}
        />
    );
}
