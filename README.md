# Victor Guilherme · Portfólio 2026

Portfólio pessoal interativo em **React + TypeScript + Vite + Three.js**. Projeto independente com identidade visual própria, inspirado na proposta de experiência imersiva e modo recrutador do repositório [Portfolio-Maria-2026](https://github.com/Marriesm/Portfolio-Maria-2026). Não utiliza o código nem as artes da autora.

## Instalação

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente http://localhost:5173).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

O diretório `dist/` pode ser publicado na Vercel, Netlify ou Render (Static Site).

## O que está pronto

- Cena original em Three.js com skyline digital, rolagem e resposta ao cursor;
- Botão **Modo recrutador** (visual claro e leve, sem 3D);
- Três paletas de destaque;
- Projetos com filtros e modal de detalhes;
- Paleta de comandos pelo atalho **Ctrl+K** / **⌘K**;
- Atalhos de e-mail, GitHub, LinkedIn e WhatsApp;
- Layout responsivo, suporte a `prefers-reduced-motion` e fallback sem WebGL;
- Currículo em `public/Curriculo-Victor-Guilherme.pdf`;
- Dados organizados em `src/data.ts` para editar com facilidade.

## Personalização

| Quero alterar... | Arquivo |
| --- | --- |
| Nome, redes, e-mail, WhatsApp, links, projetos, experiência, skills | `src/data.ts` |
| Textos das seções, navegação, interação | `src/App.tsx` |
| Cores, tipografia e componentes | `src/style.css` |
| Skyline 3D | `src/Universe.tsx` |
| Currículo para download | `public/Curriculo-Victor-Guilherme.pdf` |

**Atenção:** os painéis que ilustram os projetos são criações gráficas demonstrativas, não capturas de dados reais. Os links de código foram incluídos apenas nos repositórios verificados como públicos. O valor de R$ 440 mil veio do currículo fornecido; confirme que deseja expô-lo publicamente. Para outros projetos com repo privado, não há link para o código-fonte.

**Foto:** a versão atual usa monograma "VG" e não inventa uma foto. Quando quiser adicionar sua fotografia, crie um componente específico no hero ou substitua o símbolo no painel central.

**Dados acadêmicos:** "Engenharia de Software (em andamento)" foi incluído a partir de informações que você compartilhou antes, não da versão do currículo anexada. Confirme antes de publicar.

## Publicar na Vercel

1. Crie um repositório no seu GitHub e envie esta pasta.
2. Entre em https://vercel.com/new e selecione o repositório.
3. Build command: `npm run build`; Output directory: `dist`.
4. Clique em Deploy.

## Créditos

Projeto próprio. Referência conceitual: https://github.com/Marriesm/Portfolio-Maria-2026. Todos os layouts, desenhos CSS, componentes e cena Three.js desta versão foram escritos separadamente.

## Versão pronta, sem instalar dependências

A pasta **`site/`** contém uma versão HTML/CSS/JavaScript independente, com a mesma proposta visual e interações principais, inclusive uma skyline desenhada em Canvas 2D (sem pacote externo). Você pode abrir `site/index.html` diretamente no navegador, ou publicar os arquivos da pasta `site/` em uma hospedagem estática. Ela é a opção ideal para uma demonstração imediata.

A versão React em `src/` tem uma cena **Three.js de verdade** e pode ser compilada com `npm install && npm run build` quando houver acesso ao npm.

## GitHub Pages

A pasta `docs/` contém uma versão pronta para hospedar diretamente no GitHub Pages, sem instalar Node.js. Para ativar após enviar o código:

1. Abra **Settings > Pages** no repositório.
2. Selecione **Deploy from a branch**.
3. Escolha a branch **main** e a pasta **/docs**, depois **Save**.
4. O site poderá ser acessado em `https://vyiito.github.io/portfolio-victor-2026/` quando o GitHub Pages terminar a publicação.

O código-fonte React permanece em `src/`, enquanto `docs/` é uma exportação estática independente para o GitHub Pages.