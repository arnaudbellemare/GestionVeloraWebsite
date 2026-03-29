import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import { EN_PREFIX } from "../i18n";

const CONTACT_HASH = "contact-form";

function scrollToContactTarget() {
  const form = document.getElementById("contact-form");
  const section = document.getElementById("contact");
  (form ?? section)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Hash links to #contact often no-op on the homepage with React Router.
 * Scrolls to the contact form when present, else the #contact section.
 */
export function useGoToContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const homePath = locale === "fr" ? "/" : EN_PREFIX;
  const contactHref = `${homePath}#${CONTACT_HASH}`;

  const goToContact = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      const onHome = location.pathname === homePath;
      if (onHome) {
        scrollToContactTarget();
        void navigate({ pathname: homePath, hash: CONTACT_HASH }, { replace: true });
      } else {
        void navigate({ pathname: homePath, hash: CONTACT_HASH });
        window.setTimeout(() => {
          scrollToContactTarget();
        }, 320);
      }
    },
    [homePath, location.pathname, navigate]
  );

  return { contactHref, goToContact };
}
