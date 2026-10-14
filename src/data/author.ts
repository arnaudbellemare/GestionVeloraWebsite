export const ARTICLE_AUTHOR_NAME = "Arnaud Bellemare";
export const ARTICLE_AUTHOR_LINKEDIN = "https://ca.linkedin.com/in/gestion-velora-48684b399";
export const ARTICLE_AUTHOR_SAME_AS = [ARTICLE_AUTHOR_LINKEDIN] as const;

/** A factual, first-party author profile used on the site and in Article schema. */
export const ARTICLE_AUTHOR_BIO = {
  fr: "Arnaud Bellemare est le fondateur de Gestion Velora, une firme de gestion immobilière du Grand Montréal. Membre du RGCQ, il écrit sur la gouvernance des copropriétés, la gestion locative et la réglementation immobilière au Québec.",
  en: "Arnaud Bellemare is the founder of Gestion Velora, a property management firm serving Greater Montreal. A member of RGCQ, he writes about condominium governance, rental management, and Quebec property regulations.",
} as const;
