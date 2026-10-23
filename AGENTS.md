<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Landing page é light-only por decisão de projeto: `color-scheme: only light` e tokens fixos em `src/styles.css`. Nunca adicionar overrides `prefers-color-scheme` nem variantes dark.
- Imagens promocionais (banner principal, vídeo, capa/mockup do e-book, imagem do bónus) são fornecidas manualmente pelo utilizador; o código mantém espaços reservados e nunca gera imagens substitutas.
- Checkout é a constante `CHECKOUT_URL` em `src/routes/index.tsx` (https://checkout.escalepay.com/5515180). Nunca inventar preços, preços anteriores ou descontos não confirmados.
- Temporizador: contagem de 10 minutos persistida em localStorage (chave `sqc-offer-timer-start`); ao chegar a zero mostra 00:00 e nunca esconde a oferta nem altera o preço.
