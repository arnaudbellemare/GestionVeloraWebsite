import { Outlet } from "react-router-dom";
import { FooterSection } from "../FooterSection";
import { HeaderSection } from "../HeaderSection";
import { PageTransition } from "../components/PageTransition";
import { SchemaOrg } from "../components/SchemaOrg";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f9f6f3] dark:bg-velora-charcoal">
      <SchemaOrg />
      <PageTransition />
      <HeaderSection />
      <main>
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
