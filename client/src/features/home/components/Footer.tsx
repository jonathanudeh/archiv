import Image from "next/image";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="archiv-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="w-40">
              <Image
                src="/archiv-logo/archivLogo.svg"
                alt="Archiv"
                width={106}
                height={86}
                priority
                className="h-auto w-auto object-contain"
              />
            </div>

            <p className="text-muted max-w-sm text-sm">
              A global academic archive helping students discover, preserve, and
              share educational materials. Made with Love.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold">
              Explore
            </h3>

            <ul className="text-muted space-y-3 text-sm">
              <li>
                <Link
                  href="/schools"
                  className="hover:text-foreground transition-colors"
                >
                  Schools
                </Link>
              </li>

              <li>
                <Link
                  href="/materials"
                  className="hover:text-foreground transition-colors"
                >
                  Materials
                </Link>
              </li>

              <li>
                <Link
                  href="/departments"
                  className="hover:text-foreground transition-colors"
                >
                  Departments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold">
              Contribute
            </h3>

            <ul className="text-muted space-y-3 text-sm">
              <li>
                <Link
                  href="/signup"
                  className="hover:text-foreground transition-colors"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  href="/upload"
                  className="hover:text-foreground transition-colors"
                >
                  Upload Materials
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/guidelines"
                  className="hover:text-foreground transition-colors"
                >
                  Contribution Guidelines
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold">
              Legal
            </h3>

            <ul className="text-muted space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border text-muted mt-12 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {year} Archiv. All rights reserved.</p>

          <p>Preserving academic knowledge for future students.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
