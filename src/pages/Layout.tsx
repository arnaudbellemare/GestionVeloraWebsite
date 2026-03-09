import { Outlet } from "react-router-dom";
import { FooterSection } from "../FooterSection";
import { HeaderSection } from "../HeaderSection";
import { PageTransition } from "../components/PageTransition";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f9f6f3] dark:bg-velora-charcoal">
      <PageTransition />
      <HeaderSection />
      <main>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
