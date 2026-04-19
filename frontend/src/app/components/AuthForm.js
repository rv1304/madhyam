"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

export default function AuthForm(props) {
    var title = props.title;
    var subtitle = props.subtitle;
    var fields = props.fields;
    var buttonText = props.buttonText;
    var footerText = props.footerText;
    var footerLink = props.footerLink;
    var onSubmit = props.onSubmit; // async (data: object) => void

    var router = useRouter();
    var [loading, setLoading] = useState(false);
    var [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Collect all field values by their id
        var formData = new FormData(e.target);
        var data = {};
        fields.forEach(function (field) {
            data[field.id] = formData.get(field.id);
        });

        try {
            await onSubmit(data, router);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.logoWrapper}>
                <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <h1 className={styles.logoText}>माध्यम</h1>
                </Link>
            </div>
            <div className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
                <form onSubmit={handleSubmit}>
                    {fields.map(function (field) {
                        return (
                            <div className={styles.field} key={field.id}>
                                <label className={styles.label} htmlFor={field.id}>
                                    {field.label}
                                </label>
                                <input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={styles.input}
                                    required
                                />
                            </div>
                        );
                    })}
                    {error && (
                        <p style={{ color: "#e03e3e", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                            {error}
                        </p>
                    )}
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Please wait…" : buttonText}
                    </button>
                </form>
                <div className={styles.divider}>or</div>
                <p className={styles.footer}>
                    {footerText}{" "}
                    <Link href={footerLink.href} className={styles.link}>
                        {footerLink.label}
                    </Link>
                </p>
            </div>
        </div>
    );
}
