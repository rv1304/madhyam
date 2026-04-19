const BASE = process.env.NEXT_PUBLIC_AUTH_URL || '/api/auth';

async function signup({ username, email, password }) {
    const res = await fetch(`${BASE}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Signup failed');
    }
    return res.text();
}

async function login({ username, password }) {
    const res = await fetch(`${BASE}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Login failed');
    }
    return res.json();
}

async function logout() {
    const res = await fetch(`${BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error('Logout failed');
    }
}

export { signup, login, logout };
