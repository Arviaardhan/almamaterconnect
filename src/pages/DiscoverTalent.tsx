import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Github, Linkedin, Users, FolderKanban, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import InviteToTeamModal from "@/components/InviteToTeamModal";

// Mock data
const allSkills = ["Laravel", "Python", "Figma", "React", "Node.js", "Flutter", "TensorFlow", "UI/UX", "Data Science", "Java", "Go", "Swift"];
const allMajors = ["Computer Science", "Information Systems", "Design", "Data Science", "Electrical Engineering", "Business IT"];
const allInstitutions = ["Universitas Indonesia", "ITB", "UGM", "Binus University", "ITS", "Telkom University"];

const mockUsers = [
  { id: 1, name: "Andi Prasetyo", initials: "AP", institution: "Universitas Indonesia", major: "Computer Science", skills: ["React", "Node.js", "Python"], teamsJoined: 4, projectsCompleted: 7, github: "#", linkedin: "#" },
  { id: 2, name: "Siti Nurhaliza", initials: "SN", institution: "ITB", major: "Design", skills: ["Figma", "UI/UX", "Flutter"], teamsJoined: 3, projectsCompleted: 5, github: "#", linkedin: "#" },
  { id: 3, name: "Reza Firmansyah", initials: "RF", institution: "UGM", major: "Data Science", skills: ["Python", "TensorFlow", "Data Science"], teamsJoined: 2, projectsCompleted: 3, github: "#", linkedin: null },
  { id: 4, name: "Maya Putri", initials: "MP", institution: "Binus University", major: "Information Systems", skills: ["Laravel", "Java", "React"], teamsJoined: 5, projectsCompleted: 9, github: "#", linkedin: "#" },
  { id: 5, name: "Dimas Saputra", initials: "DS", institution: "ITS", major: "Electrical Engineering", skills: ["Python", "Go", "TensorFlow"], teamsJoined: 1, projectsCompleted: 2, github: null, linkedin: "#" },
  { id: 6, name: "Lina Kartika", initials: "LK", institution: "Telkom University", major: "Business IT", skills: ["Figma", "UI/UX", "Swift"], teamsJoined: 3, projectsCompleted: 4, github: "#", linkedin: "#" },
  { id: 7, name: "Bayu Ardianto", initials: "BA", institution: "Universitas Indonesia", major: "Computer Science", skills: ["React", "Flutter", "Node.js"], teamsJoined: 6, projectsCompleted: 11, github: "#", linkedin: "#" },
  { id: 8, name: "Citra Dewi", initials: "CD", institution: "ITB", major: "Design", skills: ["Figma", "UI/UX", "React"], teamsJoined: 2, projectsCompleted: 3, github: "#", linkedin: null },
];

function FilterPanel({ selectedMajors, setSelectedMajors, selectedInstitutions, setSelectedInstitutions, selectedSkills, setSelectedSkills }: {
  selectedMajors: string[]; setSelectedMajors: (v: string[]) => void;
  selectedInstitutions: string[]; setSelectedInstitutions: (v: string[]) => void;
  selectedSkills: string[]; setSelectedSkills: (v: string[]) => void;
}) {
  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Major</h4>
        <div className="space-y-2">
          {allMajors.map(m => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer group">
              <Checkbox checked={selectedMajors.includes(m)} onCheckedChange={() => toggle(selectedMajors, m, setSelectedMajors)} />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{m}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Institution</h4>
        <div className="space-y-2">
          {allInstitutions.map(i => (
            <label key={i} className="flex items-center gap-2 text-sm cursor-pointer group">
              <Checkbox checked={selectedInstitutions.includes(i)} onCheckedChange={() => toggle(selectedInstitutions, i, setSelectedInstitutions)} />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{i}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3 text-foreground">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(s => (
            <Badge
              key={s}
              variant={selectedSkills.includes(s) ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => toggle(selectedSkills, s, setSelectedSkills)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
      {(selectedMajors.length > 0 || selectedInstitutions.length > 0 || selectedSkills.length > 0) && (
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => { setSelectedMajors([]); setSelectedInstitutions([]); setSelectedSkills([]); }}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}

function TalentCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-18 rounded-full" />
        </div>
        <div className="mt-4 flex gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DiscoverTalent() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviteUser, setInviteUser] = useState<typeof mockUsers[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  // Simulate loading on filter change
  const handleFilterChange = (setter: (v: string[]) => void) => (val: string[]) => {
    setLoading(true);
    setter(val);
    setTimeout(() => setLoading(false), 600);
  };

  const filtered = useMemo(() => {
    return mockUsers.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchMajor = selectedMajors.length === 0 || selectedMajors.includes(u.major);
      const matchInst = selectedInstitutions.length === 0 || selectedInstitutions.includes(u.institution);
      const matchSkill = selectedSkills.length === 0 || selectedSkills.some(s => u.skills.includes(s));
      return matchSearch && matchMajor && matchInst && matchSkill;
    });
  }, [search, selectedMajors, selectedInstitutions, selectedSkills]);

  const activeFilterCount = selectedMajors.length + selectedInstitutions.length + selectedSkills.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Discover Talent</h1>
        <p className="text-muted-foreground mt-1">Find skilled teammates for your next competition.</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {isMobile && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="relative shrink-0">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="max-h-[60vh] px-4 pb-6">
                <FilterPanel
                  selectedMajors={selectedMajors} setSelectedMajors={handleFilterChange(setSelectedMajors)}
                  selectedInstitutions={selectedInstitutions} setSelectedInstitutions={handleFilterChange(setSelectedInstitutions)}
                  selectedSkills={selectedSkills} setSelectedSkills={handleFilterChange(setSelectedSkills)}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 shrink-0">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">{activeFilterCount}</Badge>
                )}
              </h3>
              <ScrollArea className="max-h-[calc(100vh-12rem)]">
                <FilterPanel
                  selectedMajors={selectedMajors} setSelectedMajors={handleFilterChange(setSelectedMajors)}
                  selectedInstitutions={selectedInstitutions} setSelectedInstitutions={handleFilterChange(setSelectedInstitutions)}
                  selectedSkills={selectedSkills} setSelectedSkills={handleFilterChange(setSelectedSkills)}
                />
              </ScrollArea>
            </div>
          </aside>
        )}

        {/* Results Grid */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">
            {loading ? "Searching..." : `${filtered.length} talent${filtered.length !== 1 ? "s" : ""} found`}
          </p>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <TalentCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">No talent matches your criteria.</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((user, i) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover-lift hover-glow group cursor-default">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-11 w-11 ring-2 ring-border">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-sm truncate">{user.name}</h3>
                            <Badge variant="secondary" className="mt-1 text-[10px] font-medium px-1.5 py-0">
                              {user.institution}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-0.5">{user.major}</p>
                          </div>
                          {/* Social links */}
                          <div className="flex gap-1 shrink-0">
                            {user.github && (
                              <a href={user.github} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                <Github className="h-4 w-4" />
                              </a>
                            )}
                            {user.linkedin && (
                              <a href={user.linkedin} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {user.skills.map(s => (
                            <Badge key={s} variant="outline" className="text-[10px] px-2 py-0 font-medium">{s}</Badge>
                          ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{user.teamsJoined} Teams</span>
                          <span className="flex items-center gap-1"><FolderKanban className="h-3 w-3" />{user.projectsCompleted} Projects</span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                            <Link to={`/profile/${user.id}`}>
                              <ExternalLink className="h-3 w-3 mr-1" /> View Profile
                            </Link>
                          </Button>
                          <Button size="sm" className="flex-1 text-xs" onClick={() => setInviteUser(user)}>
                            Invite to Team
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      <InviteToTeamModal
        open={!!inviteUser}
        onOpenChange={(open) => { if (!open) setInviteUser(null); }}
        targetUser={inviteUser}
      />
    </div>
  );
}
