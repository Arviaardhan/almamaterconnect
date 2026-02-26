import { Trophy } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emerald">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">AlmamaterConnect</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 AlmamaterConnect. Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
