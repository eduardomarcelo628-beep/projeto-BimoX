# 🚀 Bimo X! - Plataforma de Estudos em Programação

Plataforma interativa, acessível e visualmente moderna com artigos sobre fundamentos da computação e programação em linguagens populares (JavaScript, Python, Java, SQL, HTML/CSS).

---

## 🎨 Funcionalidades da Plataforma

1. **📚 Artigos Estruturados por Trilhas**:
   - Fundamentos da Computação, Front-End, Back-End e Bancos de Dados.
   - Exemplos práticos em JavaScript, Python, Java e SQL.

2. **📋 Botão de "Copiar Código" com 1 Clique**:
   - Em todos os blocos de código há um botão que copia o trecho para a área de transferência com confirmação visual.

3. **📊 Sistema de Progresso do Aluno**:
   - Botão para marcar leitura concluída no fim de cada artigo.
   - Barra de evolução dinâmica no Dashboard mostrando a porcentagem concluída.
   - Badges visuais de conclusão nos cards dos artigos.

4. **🔐 Autenticação Segura**:
   - Validação de formato de e-mail e regras de complexidade de senha.
   - Criptografia com Hash irreversível (SHA-256).
   - Proteção contra tentativas abusivas e recuperação de senha.

---

## 📂 Estrutura do Projeto

```
projeto-BimoX/
├── HTML/
│   ├── index.html        # Tela de Login, Cadastro e Recuperação de Senha
│   ├── dashboard.html    # Hub de Artigos, Barra de Progresso e Filtros
│   ├── article.html      # Leitor individual de artigo
│   └── admin.html        # Painel Administrativo de Usuários e Estatísticas
├── css/
│   ├── styles.css        # Variáveis globais, tema, toasts e responsividade
│   ├── dashboard.css     # Estilos de cards, filtros e busca
│   └── article.css       # Blocos de código com botão copiar e banner de conclusão
├── js/
│   └── supabase-auth.js  # Controle de Autenticação, Sessão e Progresso
├── data/
│   └── articles.js       # Base de artigos
└── img/                  # Imagens e ícones
```

---

## ⚡ Como Rodar o Projeto

1. Abra a pasta do projeto no VS Code ou navegador.
2. Dê dois cliques em `HTML/index.html` ou use a extensão **Live Server**.
3. Crie sua conta de estudante ou faça login para começar seus estudos!
