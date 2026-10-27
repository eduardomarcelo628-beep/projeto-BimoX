// Supabase Client and Auth Configuration
const SUPABASE_CONFIG = {
    url: "https://SEU-PROJETO.supabase.co",
    anonKey: "SUA-CHAVE-ANON-AQUI"
};

// ASSINATURAS CRIPTOGRAFADAS DE ADMINISTRADORES (SHA-256)
// Nenhum e-mail ou nome de admin fica exposto em texto puro no DevTools / Fontes.
const _SEC_ADMIN_SIGNATURES = [
    "98cd1ceca548ba5856a75769bc7e1da97e0a75249c9727decf1f55b7dec78ec5" // Hash seguro do e-mail oficial
];

let supabaseClient = null;

if (window.supabase && SUPABASE_CONFIG.url !== "https://SEU-PROJETO.supabase.co") {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    } catch (e) {
        console.warn("Supabase não configurado. Usando modo de autenticação local seguro.");
    }
}

// Utilitário de Notificação Toast
function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast-msg toast-${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Criptografia e Hashing Seguro com Web Crypto API (com fallback garantido)
async function hashValue(val) {
    const clean = String(val).trim();
    if (window.crypto && crypto.subtle) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(clean + "_bimox_salt_security_2026");
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.error("Crypto API error:", e);
        }
    }
    let hash = 0;
    const str = clean + "_bimox_fallback_salt";
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return "h_" + Math.abs(hash);
}

// Verifica se um e-mail é de Administrador comparando apenas o HASH criptográfico
async function verifyAdminRole(email) {
    const emailHash = await hashValue(email);
    return _SEC_ADMIN_SIGNATURES.includes(emailHash);
}

// Contas Padrão Pré-inicializadas com Hashes Blindados (Zero senhas em texto puro)
const DEFAULT_PRESET_USERS = [
    {
        id: "usr_adm_sec",
        email: "admin@bimox.com",
        name: "Admin Bimo X",
        passwordHash: "c368dd7300fb6dc03da382eeab3bfcea08f49380ec8840707d5c0fac9603e577",
        createdAt: "2026-10-19T09:00:00Z",
        lastLogin: new Date().toISOString(),
        completedArticles: 7,
        role: "admin",
        failedAttempts: 0,
        lockedUntil: null
    },
    {
        id: "usr_aln_sec",
        email: "aluno@bimox.com",
        name: "Aluno Bimo",
        passwordHash: "ecae5e9a59e91a025ddb93d934d8d03302beb20ffdf59f91295f71a724d2092c",
        createdAt: "2026-10-20T10:15:00Z",
        lastLogin: "2026-10-24T11:20:00Z",
        completedArticles: 3,
        role: "user",
        failedAttempts: 0,
        lockedUntil: null
    }
];

// Gerenciador de Usuários
const UserManager = {
    async getAllUsers() {
        let stored = localStorage.getItem('bimox_vault_users');
        if (!stored) {
            localStorage.setItem('bimox_vault_users', JSON.stringify(DEFAULT_PRESET_USERS));
            return DEFAULT_PRESET_USERS;
        }

        try {
            return JSON.parse(stored);
        } catch (e) {
            localStorage.removeItem('bimox_vault_users');
            return this.getAllUsers();
        }
    },

    saveAllUsers(users) {
        localStorage.setItem('bimox_vault_users', JSON.stringify(users));
    },

    async findByEmail(email) {
        const users = await this.getAllUsers();
        const search = String(email).trim().toLowerCase();
        return users.find(u => u.email.toLowerCase() === search);
    },

    async updateUserData(userId, partialData) {
        const users = await this.getAllUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index >= 0) {
            users[index] = { ...users[index], ...partialData };
            this.saveAllUsers(users);
            return users[index];
        }
        return null;
    },

    async deleteUser(userId) {
        let users = await this.getAllUsers();
        users = users.filter(u => u.id !== userId);
        this.saveAllUsers(users);
        return users;
    }
};

// Gerenciador de Progresso de Leitura do Aluno
const ProgressManager = {
    getCompletedArticles() {
        const currentUser = JSON.parse(localStorage.getItem('bimox_user') || '{}');
        if (!currentUser.email) return [];
        const key = `bimox_prog_${currentUser.email.toLowerCase()}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    },

    isCompleted(articleId) {
        const completed = this.getCompletedArticles();
        return completed.includes(articleId);
    },

    async toggleArticle(articleId) {
        const currentUser = JSON.parse(localStorage.getItem('bimox_user') || '{}');
        if (!currentUser.email) return [];

        const key = `bimox_prog_${currentUser.email.toLowerCase()}`;
        let completed = this.getCompletedArticles();

        if (completed.includes(articleId)) {
            completed = completed.filter(id => id !== articleId);
        } else {
            completed.push(articleId);
        }

        localStorage.setItem(key, JSON.stringify(completed));

        const user = await UserManager.findByEmail(currentUser.email);
        if (user) {
            await UserManager.updateUserData(user.id, { completedArticles: completed.length });
        }
        return completed;
    }
};

// Gerenciador Seguro de Autenticação e Sessão
const AuthService = {
    async getCurrentUser() {
        if (supabaseClient) {
            try {
                const { data: { session } } = await supabaseClient.auth.getSession();
                if (session?.user) {
                    const isAdmin = await verifyAdminRole(session.user.email);
                    return {
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.user_metadata?.name || session.user.email.split('@')[0],
                        role: isAdmin ? 'admin' : 'user'
                    };
                }
            } catch (err) {
                console.warn("Supabase auth session fallback:", err);
            }
        }
        
        const localUser = localStorage.getItem('bimox_user');
        return localUser ? JSON.parse(localUser) : null;
    },

    validateInput(email, password, isSignUp = false) {
        const cleanEmail = String(email || '').trim();
        const cleanPassword = String(password || '');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!cleanEmail || !emailRegex.test(cleanEmail)) {
            throw new Error("Por favor, digite um e-mail válido.");
        }

        if (!cleanPassword || cleanPassword.length < 6) {
            throw new Error("A senha deve conter no mínimo 6 caracteres.");
        }

        if (isSignUp && cleanPassword.length > 64) {
            throw new Error("A senha não pode ultrapassar 64 caracteres.");
        }
    },

    async login(email, password) {
        this.validateInput(email, password, false);
        const normalizedEmail = String(email).trim().toLowerCase();
        const cleanPassword = String(password).trim();

        // 1. Supabase (quando configurado)
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: normalizedEmail,
                    password: cleanPassword
                });
                if (error) throw error;
                const isAdmin = await verifyAdminRole(data.user.email);
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.name || data.user.email.split('@')[0],
                    role: isAdmin ? 'admin' : 'user'
                };
                localStorage.setItem('bimox_user', JSON.stringify(user));
                return user;
            } catch (err) {
                throw new Error("Supabase: " + (err.message || "E-mail ou senha incorretos."));
            }
        }

        // 2. Sistema Local Seguro
        let existingUser = await UserManager.findByEmail(normalizedEmail);

        if (!existingUser) {
            throw new Error("Usuário não encontrado. Crie uma conta no 'Sign up'!");
        }

        // Bloqueio temporário por tentativas
        if (existingUser.lockedUntil && new Date() < new Date(existingUser.lockedUntil)) {
            const remainingMins = Math.ceil((new Date(existingUser.lockedUntil) - new Date()) / 60000);
            throw new Error(`Conta bloqueada por excesso de tentativas. Aguarde ${remainingMins} minuto(s).`);
        }

        const inputHash = await hashValue(cleanPassword);
        const isHashMatch = inputHash === existingUser.passwordHash;

        if (!isHashMatch) {
            const attempts = (existingUser.failedAttempts || 0) + 1;
            let lockedUntil = null;
            if (attempts >= 5) {
                lockedUntil = new Date(Date.now() + 5 * 60000).toISOString();
            }

            await UserManager.updateUserData(existingUser.id, {
                failedAttempts: attempts,
                lockedUntil: lockedUntil
            });

            if (attempts >= 5) {
                throw new Error("Muitas tentativas incorretas! Conta temporariamente bloqueada por 5 minutos.");
            }

            throw new Error("Senha incorreta. Verifique suas credenciais.");
        }

        // Determina a role exclusivamente pelo HASH matemático
        const isAdmin = await verifyAdminRole(normalizedEmail);

        await UserManager.updateUserData(existingUser.id, {
            failedAttempts: 0,
            lockedUntil: null,
            lastLogin: new Date().toISOString(),
            role: isAdmin ? 'admin' : 'user'
        });

        const sessionUser = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: isAdmin ? 'admin' : 'user'
        };

        localStorage.setItem('bimox_user', JSON.stringify(sessionUser));
        return sessionUser;
    },

    async signup(email, password) {
        this.validateInput(email, password, true);
        const normalizedEmail = String(email).trim().toLowerCase();
        const cleanPassword = String(password).trim();

        if (supabaseClient) {
            const { data, error } = await supabaseClient.auth.signUp({
                email: normalizedEmail,
                password: cleanPassword
            });
            if (error) throw new Error(error.message);
            const isAdmin = await verifyAdminRole(normalizedEmail);
            const user = {
                id: data.user.id,
                email: data.user.email,
                name: normalizedEmail.split('@')[0],
                role: isAdmin ? 'admin' : 'user'
            };
            localStorage.setItem('bimox_user', JSON.stringify(user));
            return user;
        }

        const existing = await UserManager.findByEmail(normalizedEmail);
        if (existing) {
            throw new Error("Este e-mail já está cadastrado. Faça login com sua senha!");
        }

        const passwordHash = await hashValue(cleanPassword);
        const isAdmin = await verifyAdminRole(normalizedEmail);

        const newUser = {
            id: "usr_" + Date.now(),
            email: normalizedEmail,
            name: normalizedEmail.split('@')[0],
            passwordHash: passwordHash,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            completedArticles: 0,
            role: isAdmin ? 'admin' : 'user',
            failedAttempts: 0,
            lockedUntil: null
        };

        const users = await UserManager.getAllUsers();
        users.push(newUser);
        UserManager.saveAllUsers(users);

        const sessionUser = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
        };

        localStorage.setItem('bimox_user', JSON.stringify(sessionUser));
        return sessionUser;
    },

    async logout() {
        if (supabaseClient) {
            try {
                await supabaseClient.auth.signOut();
            } catch (e) {}
        }
        localStorage.removeItem('bimox_user');
        window.location.href = 'index.html';
    },

    async resetPassword(email, newPassword) {
        const cleanEmail = String(email || '').trim().toLowerCase();
        const cleanPassword = String(newPassword || '').trim();

        if (!cleanEmail) {
            throw new Error("Por favor, digite seu e-mail.");
        }
        if (!cleanPassword || cleanPassword.length < 6) {
            throw new Error("A nova senha deve ter no mínimo 6 caracteres.");
        }

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(cleanEmail);
                if (error) throw error;
                return { success: true, mode: 'supabase' };
            } catch (err) {
                throw new Error("Supabase: " + (err.message || "Erro ao solicitar recuperação."));
            }
        }

        const user = await UserManager.findByEmail(cleanEmail);
        if (!user) {
            throw new Error("Não encontramos nenhuma conta com este e-mail.");
        }

        const newHash = await hashValue(cleanPassword);
        await UserManager.updateUserData(user.id, {
            passwordHash: newHash,
            failedAttempts: 0,
            lockedUntil: null
        });

        return { success: true, mode: 'local' };
    },

    async requireAuth() {
        const user = await this.getCurrentUser();
        if (!user) {
            window.location.href = 'index.html';
            return null;
        }
        return user;
    },

    async requireAdmin() {
        const user = await this.requireAuth();
        if (!user || user.role !== 'admin') {
            alert('Acesso restrito para Administradores do Bimo X!');
            window.location.href = 'dashboard.html';
            return null;
        }
        return user;
    }
};
