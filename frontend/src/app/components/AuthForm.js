"use client";

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

    var router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        router.push("/");
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
                                />
                            </div>
                        );
                    })}
                    <button type="submit" className={styles.button}>
                        {buttonText}
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
