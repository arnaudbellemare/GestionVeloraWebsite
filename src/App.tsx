import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollToTop } from "./components/ScrollToTop";
import { TransitionProvider } from "./context/TransitionContext";
import { LocaleProvider } from "./context/LocaleContext";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicePage } from "./pages/ServicePage";

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
                <Route path="services/:slug" element={<ServicePage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="/en" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services/:slug" element={<ServicePage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
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
