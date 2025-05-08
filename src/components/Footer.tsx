import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-md dark:bg-gray-900 text-muted-foreground">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-6  text-center sm:text-left">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center sm:items-start">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-700 bg-clip-text text-transparent">
              ClientCraft
            </h3>
          </Link>
          <p className="text-sm mt-1">
            Your all-in-one client management suite
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} ClientCraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
