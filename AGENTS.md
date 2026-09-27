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

- Keep restaurant content, contact details, menu, and builder prices in `src/lib/restaurant.ts` so fictional client data can be replaced in one place.
- Keep this as a single SSR route with in-page section links because the requested navigation is one continuous restaurant experience.
- Keep legal disclosures on their own SSR routes so footer policy links have standalone readable pages.
- Do not claim checkout or newsletter delivery is live: both are intentionally local UI flows until a real service is connected.
