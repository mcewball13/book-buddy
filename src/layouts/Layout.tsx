import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const showNavigation = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Navigation />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
