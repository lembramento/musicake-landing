# Painel administrativo — setup

Painel custom em `/admin` (acesse: `https://musicake.app/admin`) onde você edita textos, imagens e visibilidade de seções. Cada "Salvar" comita o `content.json` (e novas imagens) direto no GitHub, e o Vercel atualiza o site em ~30 segundos.

## Como funciona

```
você abre /admin → digita senha → edita textos → clica salvar
            ↓
   POST /api/save (serverless function no Vercel)
            ↓
   função commita content.json via API do GitHub
            ↓
   Vercel detecta o push → redeploy automático (~30s)
            ↓
   site atualizado em musicake.app
```

## O que você precisa fazer uma única vez

### 1. Criar um GitHub Personal Access Token (PAT)

1. Abra https://github.com/settings/tokens?type=beta (fine-grained tokens)
2. Clique **Generate new token**
3. Nome: `musicake-admin`
4. Expiration: escolha **No expiration** (ou 1 ano e renova depois)
5. Repository access: **Only select repositories** → marque `musicake-landing`
6. Permissions → Repository permissions → **Contents: Read and write**
7. Gerar e **copiar o token** (ele começa com `github_pat_...`). Guarde — não vai aparecer de novo.

### 2. Configurar as variáveis de ambiente no Vercel

1. Abra https://vercel.com → o projeto `musicake-landing` → **Settings** → **Environment Variables**
2. Adicione cada uma destas variáveis (escopo: **Production**, **Preview**, **Development**):

| Nome              | Valor                                              |
|-------------------|----------------------------------------------------|
| `ADMIN_PASSWORD`  | senha que você quer usar pra logar (ex: `troca-isso-por-uma-senha-forte`) |
| `GITHUB_TOKEN`    | o token do passo 1 (`github_pat_...`)              |
| `GITHUB_OWNER`    | `lembramento`                                       |
| `GITHUB_REPO`     | `musicake-landing`                                  |
| `GITHUB_BRANCH`   | `main`                                              |

3. Salve. O Vercel vai usar essas variáveis no próximo deploy.

### 3. Redeploy

Faça um redeploy manual no Vercel (ou um commit qualquer) pra que as funções serverless e as env vars entrem em vigor.

## Usando o painel

- URL: `https://musicake.app/admin`
- Login: a senha que você configurou em `ADMIN_PASSWORD`
- Cada seção tem seus campos (textos, listas, toggles de visibilidade)
- Botão **trocar logo**: faz upload de novo PNG/SVG (sobe junto no save)
- Botão **salvar**: commita as mudanças no GitHub. Espere ~30s e atualize o site.
- Botão **descartar**: joga fora rascunho local não salvo.
- Botão **sair**: limpa a sessão do navegador.

Suas edições não-salvas ficam guardadas em rascunho no navegador, então pode fechar a aba e voltar depois sem perder.

## Limitações da v1

- Não dá pra criar seções 100% novas — só esconder/mostrar as que já existem (Slice, Baking, Audiência, Manifesto, Depoimentos, FAQ, CTA final).
- Cor, fonte, espaçamento — ainda no código. Mexer no `index.html` direto.
- Upload de imagens só pro logo. Outras imagens da página ainda são fixas no código.

Quando quiser expandir (cores via painel, mais imagens, criar seções novas, etc.), é só pedir.

## Diagnóstico

- **"Senha incorreta"**: confere `ADMIN_PASSWORD` no Vercel.
- **"Erro de conexão"**: o `/api/save` não está respondendo. Verifica se o último deploy do Vercel passou e se as env vars estão configuradas.
- **Salvou mas site não atualizou**: vai no GitHub e confere se o commit aparece. Se sim, dá uma olhada no Vercel se o deploy rodou. Pode levar 30-60s.
- **"GitHub PUT failed: 403"**: o token não tem permissão. Refaça com **Contents: Read and write** no repo correto.
