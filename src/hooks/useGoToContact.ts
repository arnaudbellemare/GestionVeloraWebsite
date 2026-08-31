import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
const CONTACT_HASH = "contact-form";

function scrollToContactTarget() {
  const form = document.getElementById("contact-form");
  const section = document.getElementById("contact");
  (form ?? section)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Opens the dedicated, crawlable contact route and scrolls to its form.
 */
export function useGoToContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const contactPath = locale === "fr" ? "/contact" : "/en/contact";
  const contactHref = `${contactPath}#${CONTACT_HASH}`;

  const goToContact = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      const onContactPage = location.pathname === contactPath;
      if (onContactPage) {
        scrollToContactTarget();
        void navigate({ pathname: contactPath, hash: CONTACT_HASH }, { replace: true });
      } else {
        void navigate({ pathname: contactPath, hash: CONTACT_HASH });
        window.setTimeout(() => {
          scrollToContactTarget();
        }, 320);
      }
    },
    [contactPath, location.pathname, navigate]
  );

  return { contactHref, goToContact };
}
