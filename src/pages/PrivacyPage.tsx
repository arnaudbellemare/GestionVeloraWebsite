import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";

export function PrivacyPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-white dark:bg-velora-charcoal">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <Link to="/" className="font-sans text-sm text-black/60 dark:text-white/60 hover:text-waabi-pink mb-8 inline-block">
          ← Retour à l'accueil
        </Link>
        <ScrollReveal>
          <h1 className="font-playfair font-bold text-4xl text-black dark:text-white mb-8">
            Politique de confidentialité
          </h1>
          <div className="font-sans text-black/80 dark:text-white/80 leading-relaxed space-y-6">
            <p>
              Gestion Velora s'engage à protéger la confidentialité des personnes qui utilisent ses services
              et qui visitent son site web.
            </p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">Collecte des informations</h2>
            <p>
              Nous collectons les informations que vous nous fournissez volontairement lors de la prise de contact,
              notamment votre nom, courriel et message. Ces données sont utilisées uniquement pour répondre à vos
              demandes et améliorer nos services.
            </p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">Utilisation des informations</h2>
            <p>
              Les informations collectées ne sont pas partagées avec des tiers. Elles servent exclusivement à la
              communication avec Gestion Velora et à la gestion de nos relations clients.
            </p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">Contact</h2>
            <p>
              Pour toute question concernant cette politique ou vos données personnelles, contactez-nous à
              info@gestionvelora.com.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
