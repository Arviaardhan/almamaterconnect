import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy } from "lucide-react";

const institutions = [
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Gadjah Mada",
  "Institut Teknologi Sepuluh Nopember",
  "Binus University",
  "Universitas Brawijaya",
  "Universitas Airlangga",
  "Universitas Padjadjaran",
  "Telkom University",
  "Universitas Diponegoro",
];

export default function Signup() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-emerald mb-4">
            <Trophy className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Join AlmamaterConnect and find your dream team</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first">First Name</Label>
                <Input id="first" placeholder="Andi" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" placeholder="Pratama" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@campus.ac.id" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="institution">Institution / Campus</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your campus" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="major">Major / Department</Label>
              <Input id="major" placeholder="e.g., Computer Science" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
