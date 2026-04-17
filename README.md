# Gestion Velora

Site web Gestion Velora - design inspiré de Waabi.ai et PropVault : thème sombre, typographie Playfair Display, animations fluides, sections complètes.

## Structure

- **Hero** - Full viewport, split headline « Votre tranquillité. Notre affaire. », image Unsplash
- **Stats** - Métriques (immeubles, taux d'occupation, etc.)
- **Qui sommes-nous** - Présentation
- **Labels de valeur** - Transparent / Proactif / Fiable (toggle Waabi-style)
- **Ce que nous faisons** - Cartes services (Syndicat, Airbnb, Location)
- **Nos standards** - Mission
- **Partenaires de confiance** - Témoignages carousel + marquee logos
- **Insights** - Cartes blog
- **Contact** - Formulaire rond (3 champs) + CTA

## Démarrage

```bash
npm install
npm run dev
```

## Mesure SEO (cycle ~30 jours)

- **GA4** : rapports *Acquisition* > *Traffic acquisition* (organic) et *Pages et écrans* pour les landing *insights* (chemins `/blog/*`). Vérifier que les `page_view` SPA sont bien enregistrés après navigation.
- **Google Search Console** : performances par requête (impressions, clics) et pages ; surveiller les anomalies d’indexation.
- **AEO / citations** : pas de tableau de bord natif ; échantillonner des requêtes cibles et noter présence dans résultats enrichis / AEO (outils externes ou revue manuelle).

## Thème

Bouton lune/soleil dans le header pour basculer entre mode clair et sombre.
