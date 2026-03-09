import { useTransition } from "../context/TransitionContext";
import { Link, useNavigate } from "react-router-dom";

type InternalLinkProps = React.ComponentProps<typeof Link> & {
  to: string;
};

export function InternalLink({ to, onClick, children, ...rest }: InternalLinkProps) {
  const navigate = useNavigate();
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = typeof to === "string" ? to : "/";
    const targetPath = target.split("#")[0] || "/";
    const currentPath = window.location.pathname;
    if (targetPath !== currentPath) {
      e.preventDefault();
      startTransition();
      setTimeout(() => {
        navigate(target);
      }, 260);
    }
    onClick?.(e);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
