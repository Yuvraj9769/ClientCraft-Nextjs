"use client";

import { setProfile, setSidebarVisible } from "@/store/features/CRM/CRMSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import CompanyUserProfile from "@/components/companyUser/CompanyUserProfile";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import ModeToggle from "./ModeToggle";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/company-dashboard", label: "Dashboard" },
  { href: "/company-clients", label: "Clients" },
  { href: "/company-projects", label: "Projects" },
  { href: "/add-note", label: "Add Note" },
];

const CompanyUserNavbar = () => {
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  const sidebarVisible = useAppSelector((state) => state.sidebarVisible);

  const dispatch = useAppDispatch();

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:opacity-80"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-700 bg-clip-text text-transparent">
            ClientCraft
          </h3>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-foreground/80
                ${
                  pathname === link.href
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-foreground/60"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2">
            <ModeToggle />
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => dispatch(setProfile(!profile))}
              className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-primary/10 transition-all hover:ring-primary/30 focus:outline-none focus:ring-primary/30"
            >
              {user?.profilePic ? (
                <CldImage
                  width="960"
                  height="600"
                  src={user.profilePic}
                  className="h-full w-full object-cover"
                  sizes="100vw"
                  alt="User Profile"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium">
                  {user?.email?.slice(0, 1)?.toUpperCase()}
                </div>
              )}
            </button>
            {profile && <CompanyUserProfile />}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button
            onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default CompanyUserNavbar;
