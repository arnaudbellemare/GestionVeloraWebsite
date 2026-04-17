import { useLocale } from "../context/LocaleContext";
import { Link, useNavigate } from "react-router-dom";

type InternalLinkProps = React.ComponentProps<typeof Link> & {
  to: string;
};

/*
 * ─────────────────────────────────────────────────────────────
 *  InternalLink - locale-aware navigation
 * ─────────────────────────────────────────────────────────────
 *  Navigates immediately via React Router.
 *  AnimatePresence in Layout.tsx handles the visual transition
 *  (exit old page → enter new page) automatically.
 *  No manual delay or transition context needed.
 * ─────────────────────────────────────────────────────────────
 */

export function InternalLink({ to, onClick, children, ...rest }: InternalLinkProps) {
  const navigate = useNavigate();
  const { localePath } = useLocale();

  const localizedTo = localePath(typeof to === "string" ? to : "/");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetPath = localizedTo.split("#")[0] || "/";
    const currentPath = window.location.pathname;

    if (targetPath !== currentPath) {
      e.preventDefault();
      navigate(localizedTo);
    }
    onClick?.(e);
  };

  return (
    <Link to={localizedTo} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
