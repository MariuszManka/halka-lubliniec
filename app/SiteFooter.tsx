import Link from "next/link";
import type { SharedContent } from "../sanity/content";

export type SiteFooterContent = {
  mainNavigation: ReadonlyArray<{ label: string; href: string }>;
  header: Pick<SharedContent["header"], "homeAriaLabel" | "navigationLabel">;
  footer: Pick<SharedContent["footer"], "brand" | "tagline" | "copyrightLong" | "logoAlt">;
};

export function SiteFooter({ shared }: { shared: SiteFooterContent }) {
  return (
    <footer className="site-footer site-footer-shell">
      <Link className="site-footer-brand" href="/" aria-label={shared.header.homeAriaLabel}>
        <img src="/logo.svg" alt={shared.footer.logoAlt} width="45" height="45" />
        <span>
          <strong>{shared.footer.brand}</strong>
          <small>{shared.footer.tagline}</small>
        </span>
      </Link>
      <nav aria-label={shared.header.navigationLabel}>
        {shared.mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <p>© {new Date().getFullYear()} {shared.footer.copyrightLong}</p>
    </footer>
  );
}
