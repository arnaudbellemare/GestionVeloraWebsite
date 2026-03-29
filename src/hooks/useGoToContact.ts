import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import { EN_PREFIX } from "../i18n";

/**
 * Hash links to #contact often no-op on the homepage with React Router.
 * This always scrolls to the section and syncs the URL hash.
 */
export function useGoToContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const homePath = locale === "fr" ? "/" : EN_PREFIX;
  const contactHref = `${homePath}#contact`;

  const goToContact = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      const onHome = location.pathname === homePath;
      if (onHome) {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        void navigate({ pathname: homePath, hash: "contact" }, { replace: true });
      } else {
        void navigate({ pathname: homePath, hash: "contact" });
        window.setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 320);
      }
    },
    [homePath, location.pathname, navigate]
  );

  return { contactHref, goToContact };
}
