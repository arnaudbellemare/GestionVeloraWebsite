import { useTransition } from "../context/TransitionContext";
import { useLocale } from "../context/LocaleContext";
import { Link, useNavigate } from "react-router-dom";

type InternalLinkProps = React.ComponentProps<typeof Link> & {
  to: string;
};

export function InternalLink({ to, onClick, children, ...rest }: InternalLinkProps) {
  const navigate = useNavigate();
  const { startTransition } = useTransition();
  const { localePath } = useLocale();

  const localizedTo = localePath(typeof to === "string" ? to : "/");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetPath = localizedTo.split("#")[0] || "/";
    const currentPath = window.location.pathname;
    if (targetPath !== currentPath) {
      e.preventDefault();
      startTransition();
      setTimeout(() => {
        navigate(localizedTo);
      }, 260);
    }
    onClick?.(e);
  };

  return (
    <Link to={localizedTo} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
