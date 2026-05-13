import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollToTop } from "./components/ScrollToTop";
import { TransitionProvider } from "./context/TransitionContext";
import { LocaleProvider } from "./context/LocaleContext";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";

const BlogPage = lazy(() => import("./pages/BlogPage").then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })));
const CompareIndexPage = lazy(() =>
  import("./pages/CompareIndexPage").then((m) => ({ default: m.CompareIndexPage })),
);
const ComparisonPage = lazy(() => import("./pages/ComparisonPage").then((m) => ({ default: m.ComparisonPage })));
const LocationPage = lazy(() => import("./pages/LocationPage").then((m) => ({ default: m.LocationPage })));
const LocationsIndexPage = lazy(() =>
  import("./pages/LocationsIndexPage").then((m) => ({ default: m.LocationsIndexPage })),
);
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const ServicePage = lazy(() => import("./pages/ServicePage").then((m) => ({ default: m.ServicePage })));
const ServicesIndexPage = lazy(() =>
  import("./pages/ServicesIndexPage").then((m) => ({ default: m.ServicesIndexPage })),
);
const TarifsPage = lazy(() => import("./pages/TarifsPage").then((m) => ({ default: m.TarifsPage })));
const TrustDocumentPage = lazy(() =>
  import("./pages/TrustDocumentPage").then((m) => ({ default: m.TrustDocumentPage })),
);
const VideoPage = lazy(() => import("./pages/VideoPage").then((m) => ({ default: m.VideoPage })));

function RouteFallback() {
  return <div className="min-h-[40vh] bg-nd-canvas" aria-busy="true" aria-label="Chargement" />;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-nd-canvas text-nd-primary flex flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="text-7xl font-bold text-nd-accent leading-none">404</p>
      <h1 className="text-xl font-semibold">Page introuvable</h1>
      <p className="text-nd-secondary max-w-sm leading-relaxed">
        Cette adresse n&apos;existe pas sur le site de Gestion Velora.
      </p>
      <nav className="flex gap-6 flex-wrap justify-center text-nd-accent underline-offset-4">
        <a href="/" className="hover:underline">Accueil</a>
        <a href="/locations" className="hover:underline">Villes desservies</a>
        <a href="/en/locations" className="hover:underline">Cities we serve</a>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
        <LocaleProvider>
          <TransitionProvider>
            <ScrollToTop />
            <ScrollToHash />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="services"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ServicesIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="services/:slug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ServicePage />
                    </Suspense>
                  }
                />
                <Route
                  path="compare"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <CompareIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="compare/:comparisonSlug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ComparisonPage />
                    </Suspense>
                  }
                />
                <Route
                  path="locations"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <LocationsIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="location/:locationSlug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <LocationPage />
                    </Suspense>
                  }
                />
                <Route
                  path="blog"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <BlogPage />
                    </Suspense>
                  }
                />
                <Route
                  path="blog/:slug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <BlogPostPage />
                    </Suspense>
                  }
                />
                <Route path="faq" element={<Navigate to="/#faq" replace />} />
                <Route
                  path="tarifs"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TarifsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="privacy"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <PrivacyPage />
                    </Suspense>
                  }
                />
                <Route
                  path="about"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="editorial-policy"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="sources"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="methodology"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="trust-proof"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="video/hero-bg-mobile"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <VideoPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/en" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="services"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ServicesIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="services/:slug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ServicePage />
                    </Suspense>
                  }
                />
                <Route
                  path="compare"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <CompareIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="compare/:comparisonSlug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ComparisonPage />
                    </Suspense>
                  }
                />
                <Route
                  path="locations"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <LocationsIndexPage />
                    </Suspense>
                  }
                />
                <Route
                  path="location/:locationSlug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <LocationPage />
                    </Suspense>
                  }
                />
                <Route
                  path="blog"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <BlogPage />
                    </Suspense>
                  }
                />
                <Route
                  path="blog/:slug"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <BlogPostPage />
                    </Suspense>
                  }
                />
                <Route path="faq" element={<Navigate to="/en/#faq" replace />} />
                <Route
                  path="tarifs"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TarifsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="privacy"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <PrivacyPage />
                    </Suspense>
                  }
                />
                <Route
                  path="about"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="editorial-policy"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="sources"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="methodology"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="trust-proof"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <TrustDocumentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="video/hero-bg-mobile"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <VideoPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TransitionProvider>
        </LocaleProvider>
      </BrowserRouter>
  );
}

export default App;
