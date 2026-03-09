import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollToTop } from "./components/ScrollToTop";
import { TransitionProvider } from "./context/TransitionContext";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicePage } from "./pages/ServicePage";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
