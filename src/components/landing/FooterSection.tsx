import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

const navLinks = [
  { label: "Eksplorasi Tim", to: "/explore" },
  { label: "Post Rekrutmen", to: "/create" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Cari Talent", to: "/discover-users" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", to: "#" },
  { label: "Syarat & Ketentuan", to: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-foreground))] pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-emerald">
                <Trophy className="h-4.5 w-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">AlmamaterConnect</span>
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--footer-muted))] max-w-xs">
              Menghubungkan ambisi dan kolaborasi mahasiswa Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--footer-muted))] mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-[hsl(var(--footer-foreground))] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--footer-muted))] mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-[hsl(var(--footer-foreground))] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[hsl(var(--footer-muted))]">
            © {new Date().getFullYear()} AlmamaterConnect. Dibuat untuk mahasiswa, oleh mahasiswa.
          </p>
        </div>
      </div>
    </footer>
  );
}
