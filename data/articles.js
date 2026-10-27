const ARTICLES_DATA = [
    {
        id: "variaveis-e-tipos",
        title: "Variáveis e Tipos de Dados",
        category: "fundamentos",
        categoryName: "Fundamentos",
        readTime: "5 min",
        icon: "📦",
        excerpt: "Entenda o que são variáveis, como a memória do computador armazena informações e conheça os tipos primitivos fundamentais.",
        content: `
            <h2>O que é uma Variável?</h2>
            <p>Imagine uma variável como uma caixa etiquetada no seu armário. O nome da etiqueta é o <strong>identificador</strong> da variável, e o objeto guardado dentro é o seu <strong>valor</strong>.</p>
            
            <p>Em linguagens de programação, usamos variáveis para armazenar valores que serão manipulados, comparados ou exibidos pelo nosso algoritmo.</p>

            <h3>Exemplo prático em JavaScript, Python e Java</h3>
            
            <div class="code-container">
                <span class="code-badge">JavaScript</span>
                <pre><code>// Declarando variáveis
let nome = "Bimo";
const versao = 1.0;
let ativo = true;

console.log(\`Olá, meu nome é \${nome} e estou na versão \${versao}\`);</code></pre>
            </div>

            <div class="code-container">
                <span class="code-badge">Python</span>
                <pre><code># Em Python a tipagem é dinâmica e não precisa de palavra-chave
nome = "Bimo"
versao = 1.0
ativo = True

print(f"Olá, meu nome é {nome} e estou na versão {versao}")</code></pre>
            </div>

            <div class="code-container">
                <span class="code-badge">Java</span>
                <pre><code>// Java possui tipagem estática rigorosa
String nome = "Bimo";
double versao = 1.0;
boolean ativo = true;

System.out.println("Olá, meu nome é " + nome + " versão " + versao);</code></pre>
            </div>

            <h2>Tipos de Dados Primitivos Mais Comuns</h2>
            <ul>
                <li><strong>String:</strong> Cadeias de caracteres (textos) envolvidas em aspas. Ex: <code>"Olá mundo"</code></li>
                <li><strong>Number / Int / Float:</strong> Números inteiros ou decimais. Ex: <code>42</code>, <code>3.14</code></li>
                <li><strong>Boolean:</strong> Representa apenas dois estados de verdade: <code>true</code> (verdadeiro) ou <code>false</code> (falso).</li>
                <li><strong>Null / Undefined / None:</strong> Representam a ausência deliberada de valor ou valor não definido.</li>
            </ul>

            <div class="article-tip">
                💡 <strong>Dica de Ouro:</strong> Escolha sempre nomes claros para suas variáveis! Em vez de <code>x</code> ou <code>d</code>, prefira <code>precoTotal</code> ou <code>dataCriacao</code>.
            </div>
        `
    },
    {
        id: "estruturas-condicionais",
        title: "Estruturas Condicionais (if / else)",
        category: "fundamentos",
        categoryName: "Fundamentos",
        readTime: "6 min",
        icon: "🔀",
        excerpt: "Aprenda a tomar decisões nos seus programas usando if, else if, else e operadores lógicos booleanos.",
        content: `
            <h2>Tomando Decisões no Código</h2>
            <p>Todo software precisa tomar decisões baseado em condições: "Se o usuário inseriu a senha correta, dê acesso; senão, mostre uma mensagem de erro".</p>
            
            <h3>Sintaxe e Exemplos</h3>
            <div class="code-container">
                <span class="code-badge">JavaScript</span>
                <pre><code>let media = 7.5;

if (media >= 7.0) {
    console.log("Aprovado com sucesso! 🎉");
} else if (media >= 5.0) {
    console.log("Em recuperação. 📚");
} else {
    console.log("Reprovado. Não desista! 💪");
}</code></pre>
            </div>

            <div class="code-container">
                <span class="code-badge">Python</span>
                <pre><code>media = 7.5

if media >= 7.0:
    print("Aprovado com sucesso! 🎉")
elif media >= 5.0:
    print("Em recuperação. 📚")
else:
    print("Reprovado. Não desista! 💪")</code></pre>
            </div>

            <h2>Operadores Lógicos Essenciais</h2>
            <ul>
                <li><code>&&</code> ou <code>and</code>: <strong>E</strong> (todas as condições precisam ser verdadeiras)</li>
                <li><code>||</code> ou <code>or</code>: <strong>OU</strong> (basta uma condição ser verdadeira)</li>
                <li><code>!</code> ou <code>not</code>: <strong>NÃO</strong> (inverte o valor booleano)</li>
            </ul>
        `
    },
    {
        id: "lacos-de-repeticao",
        title: "Laços de Repetição (Loops: for, while)",
        category: "fundamentos",
        categoryName: "Fundamentos",
        readTime: "7 min",
        icon: "🔁",
        excerpt: "Automatize tarefas repetitivas dominando estruturas como for, while e iterações sobre coleções.",
        content: `
            <h2>Por que precisamos de loops?</h2>
            <p>Se você precisasse imprimir 100 números ou enviar um email para 500 clientes, escrever 500 linhas idênticas seria inviável. É aí que os laços de repetição entram!</p>
            
            <h3>O Laço <code>for</code></h3>
            <p>Utilizado principalmente quando você <strong>sabe de antemão quantas vezes</strong> o bloco deve rodar.</p>

            <div class="code-container">
                <span class="code-badge">JavaScript</span>
                <pre><code>for (let i = 1; i <= 5; i++) {
    console.log("Iteração número: " + i);
}</code></pre>
            </div>

            <div class="code-container">
                <span class="code-badge">Python</span>
                <pre><code>for i in range(1, 6):
    print(f"Iteração número: {i}")</code></pre>
            </div>

            <h3>O Laço <code>while</code></h3>
            <p>Utilizado quando a repetição depende de uma <strong>condição dinâmica</strong> que não sabemos exatamente quando se tornará falsa.</p>
            <div class="code-container">
                <span class="code-badge">JavaScript</span>
                <pre><code>let bateria = 100;
while (bateria > 0) {
    bateria -= 20;
    console.log("Nível de bateria: " + bateria + "%");
}</code></pre>
            </div>
        `
    },
    {
        id: "html-css-fundamentos",
        title: "HTML5 Semântico e CSS Moderno",
        category: "frontend",
        categoryName: "Front-End",
        readTime: "8 min",
        icon: "🎨",
        excerpt: "Construa interfaces acessíveis com tags semânticas e domine o design responsivo com Flexbox e Grid.",
        content: `
            <h2>A Base da Web Moderna</h2>
            <p>O <strong>HTML</strong> representa o esqueleto e a estrutura do conteúdo. O <strong>CSS</strong> fornece as cores, espaçamentos, tipografia e animações.</p>

            <h3>Por que usar HTML Semântico?</h3>
            <p>Em vez de usar apenas <code>&lt;div&gt;</code> para tudo, o HTML5 introduziu tags com significado real para motores de busca (SEO) e leitores de tela de acessibilidade:</p>
            <ul>
                <li><code>&lt;header&gt;</code>: Cabeçalho com logo ou navegação</li>
                <li><code>&lt;nav&gt;</code>: Links de navegação principais</li>
                <li><code>&lt;main&gt;</code>: Conteúdo principal único da página</li>
                <li><code>&lt;section&gt;</code> e <code>&lt;article&gt;</code>: Seções temáticas e artigos independentes</li>
                <li><code>&lt;footer&gt;</code>: Rodapé com créditos, termos e contato</li>
            </ul>

            <h3>Centralizando com CSS Flexbox</h3>
            <div class="code-container">
                <span class="code-badge">CSS</span>
                <pre><code>.container {
    display: flex;
    justify-content: center; /* alinhamento horizontal */
    align-items: center;     /* alinhamento vertical */
    min-height: 100vh;
}</code></pre>
            </div>
        `
    },
    {
        id: "javascript-dom",
        title: "Manipulação do DOM com JavaScript",
        category: "frontend",
        categoryName: "Front-End",
        readTime: "6 min",
        icon: "⚡",
        excerpt: "Dê vida e interatividade às suas páginas capturando eventos de clique, teclado e alterando elementos dinamicamente.",
        content: `
            <h2>O que é o DOM?</h2>
            <p>O <strong>Document Object Model (DOM)</strong> é a representação em árvore que o navegador cria a partir do HTML. Com o JavaScript, podemos ler e alterar essa árvore a qualquer momento.</p>

            <h3>Selecionando e Reagindo a Eventos</h3>
            <div class="code-container">
                <span class="code-badge">JavaScript</span>
                <pre><code>// Selecionando botão e container
const botao = document.querySelector("#meuBotao");
const texto = document.querySelector("#mensagem");

// Escutando evento de clique
botao.addEventListener("click", () => {
    texto.textContent = "Você clicou no botão! Bimo X em ação 🚀";
    texto.style.color = "#f02eaa";
});</code></pre>
            </div>
        `
    },
    {
        id: "apis-rest-backend",
        title: "O que são APIs REST e Protocolo HTTP?",
        category: "backend",
        categoryName: "Back-End",
        readTime: "9 min",
        icon: "⚙️",
        excerpt: "Compreenda como o Front-End conversa com o Back-End através dos verbos GET, POST, PUT e DELETE no protocolo HTTP.",
        content: `
            <h2>Como a Internet se Comunica</h2>
            <p>Uma <strong>API (Interface de Programação de Aplicações)</strong> permite que dois sistemas se comuniquem. O modelo mais famoso é a arquitetura <strong>REST</strong> operando sobre o protocolo HTTP.</p>

            <h3>Os 4 Métodos HTTP Principais (CRUD)</h3>
            <ul>
                <li><strong>GET:</strong> Buscar ou ler dados (ex: listar artigos)</li>
                <li><strong>POST:</strong> Criar um novo recurso (ex: cadastrar um usuário)</li>
                <li><strong>PUT / PATCH:</strong> Atualizar dados existentes</li>
                <li><strong>DELETE:</strong> Remover um recurso</li>
            </ul>

            <h3>Códigos de Resposta (Status Code)</h3>
            <ul>
                <li><strong>200 OK:</strong> Sucesso na operação.</li>
                <li><strong>201 Created:</strong> Recurso criado com sucesso.</li>
                <li><strong>400 Bad Request:</strong> Dados enviados incorretos.</li>
                <li><strong>401 / 403:</strong> Não autenticado ou sem permissão.</li>
                <li><strong>404 Not Found:</strong> Recurso não encontrado.</li>
                <li><strong>500 Internal Server Error:</strong> Erro no servidor.</li>
            </ul>
        `
    },
    {
        id: "banco-de-dados-relacional",
        title: "Bancos de Dados: SQL e Modelagem",
        category: "database",
        categoryName: "Banco de Dados",
        readTime: "7 min",
        icon: "🗄️",
        excerpt: "Entenda tabelas, chaves primárias e relacionamentos com SQL (PostgreSQL, MySQL).",
        content: `
            <h2>Onde ficam guardados os dados?</h2>
            <p>Variáveis existem apenas enquanto o programa roda. Para salvar usuários, artigos e senhas de forma duradoura, usamos Bancos de Dados.</p>

            <h3>Comandos Fundamentais em SQL</h3>
            <div class="code-container">
                <span class="code-badge">SQL</span>
                <pre><code>-- Criar uma tabela
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados
INSERT INTO usuarios (nome, email) 
VALUES ('Eduardo', 'eduardo@exemplo.com');

-- Buscar dados
SELECT * FROM usuarios WHERE email = 'eduardo@exemplo.com';</code></pre>
            </div>
        `
    }
];
