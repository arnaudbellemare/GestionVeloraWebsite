import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollToTop } from "./components/ScrollToTop";
import { TransitionProvider } from "./context/TransitionContext";
import { LocaleProvider } from "./context/LocaleContext";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CompareIndexPage } from "./pages/CompareIndexPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { FaqPage } from "./pages/FaqPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { LocationPage } from "./pages/LocationPage";
import { LocationsIndexPage } from "./pages/LocationsIndexPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicePage } from "./pages/ServicePage";
import { ServicesIndexPage } from "./pages/ServicesIndexPage";
import { TarifsPage } from "./pages/TarifsPage";

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
                <Route path="services" element={<ServicesIndexPage />} />
                <Route path="services/:slug" element={<ServicePage />} />
                <Route path="compare" element={<CompareIndexPage />} />
                <Route path="compare/:comparisonSlug" element={<ComparisonPage />} />
                <Route path="locations" element={<LocationsIndexPage />} />
                <Route path="location/:locationSlug" element={<LocationPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="tarifs" element={<TarifsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="/en" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesIndexPage />} />
                <Route path="services/:slug" element={<ServicePage />} />
                <Route path="compare" element={<CompareIndexPage />} />
                <Route path="compare/:comparisonSlug" element={<ComparisonPage />} />
                <Route path="locations" element={<LocationsIndexPage />} />
                <Route path="location/:locationSlug" element={<LocationPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="tarifs" element={<TarifsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TransitionProvider>
        </LocaleProvider>
      </BrowserRouter>
  );
}

export default App;
