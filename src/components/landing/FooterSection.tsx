import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-foreground))] pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emerald">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-white">AlmamaterConnect</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[hsl(var(--footer-muted))]">
            <Link to="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link to="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-[hsl(var(--footer-muted))]">
            © {new Date().getFullYear()} AlmamaterConnect. Dibuat untuk mahasiswa, oleh mahasiswa.
          </p>
        </div>
      </div>
    </footer>
  );
}
