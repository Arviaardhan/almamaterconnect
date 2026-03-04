import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Users, ArrowRight, Clock, X, MapPin, AlertTriangle, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const categories = ["Web", "Mobile", "Business", "Data Science", "Design", "IoT"];
const skillsList = ["React", "Python", "Figma", "Laravel", "Flutter", "Node.js", "Machine Learning", "Strategy"];

const mockPosts = [
  { id: "1", title: "Hackathon UI/UX 2026", desc: "Looking for passionate designers to create an award-winning healthcare app prototype.", category: "Design", slots: "2/4", skills: ["Figma", "Research", "Prototyping"], posted: "2 hours ago", campus: "Universitas Indonesia", lookingFor: ["Interaction Designer", "UX Researcher"], daysLeft: 18, applicants: 5 },
  { id: "2", title: "National Data Science Cup", desc: "Need a statistician and ML engineer to analyze climate change datasets.", category: "Data Science", slots: "1/3", skills: ["Python", "ML", "Statistics"], posted: "5 hours ago", campus: "ITB", lookingFor: ["ML Engineer", "Statistician"], daysLeft: 3, applicants: 12 },
  { id: "3", title: "Business Case Competition", desc: "Seeking finance and strategy experts for McKinsey-style case competition.", category: "Business", slots: "3/5", skills: ["Strategy", "Finance", "Presentation"], posted: "1 day ago", campus: "UGM", lookingFor: ["Finance Analyst", "Pitcher"], daysLeft: 14, applicants: 8 },
  { id: "4", title: "Mobile App Challenge", desc: "Building a community fitness app. Need a Flutter dev and UI designer.", category: "Mobile", slots: "1/3", skills: ["Flutter", "Firebase", "UI Design"], posted: "3 hours ago", campus: "ITS", lookingFor: ["Flutter Developer", "UI Designer"], daysLeft: 5, applicants: 3 },
  { id: "5", title: "Web Dev Marathon", desc: "48-hour web development sprint. Full-stack team needed.", category: "Web", slots: "2/4", skills: ["React", "Node.js", "TypeScript"], posted: "6 hours ago", campus: "Universitas Indonesia", lookingFor: ["Frontend Developer", "Backend Developer"], daysLeft: 10, applicants: 7 },
  { id: "6", title: "IoT Smart Campus", desc: "Developing IoT solution for campus energy management.", category: "IoT", slots: "2/5", skills: ["Arduino", "Python", "3D Print"], posted: "1 day ago", campus: "ITB", lookingFor: ["Hardware Engineer", "Data Analyst"], daysLeft: 21, applicants: 2 },
  { id: "7", title: "AI Chatbot Competition", desc: "Build an AI-powered customer service chatbot for e-commerce.", category: "Data Science", slots: "1/4", skills: ["Python", "NLP", "React"], posted: "4 hours ago", campus: "Binus", lookingFor: ["NLP Engineer", "Frontend Dev", "PM"], daysLeft: 6, applicants: 15 },
  { id: "8", title: "Startup Weekend", desc: "Looking for developers and business people for 54-hour startup competition.", category: "Business", slots: "2/5", skills: ["React", "Strategy", "Pitch"], posted: "12 hours ago", campus: "UGM", lookingFor: ["Full-Stack Dev", "Pitcher"], daysLeft: 2, applicants: 20 },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filtered = mockPosts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.desc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
    const matchSkills = selectedSkills.length === 0 || post.skills.some((s) => selectedSkills.includes(s));
    return matchSearch && matchCategory && matchSkills;
  });

  const activeFilters = selectedCategories.length + selectedSkills.length;

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoadingMore(false);
    }, 800);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Teams</h1>
        <p className="mt-2 text-muted-foreground">Find the perfect team for your next competition</p>
      </div>

      {/* Search + Filter toggle */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search competitions, skills, teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilters > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-primary text-xs font-bold">
              {activeFilters}
            </span>
          )}
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        {showFilters && (
          <aside className="hidden w-64 shrink-0 md:block animate-fade-in">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setSelectedCategories([]); setSelectedSkills([]); }}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Skills Needed</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile filter chips */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedCategories.includes(cat)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedSkills.includes(skill)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {activeFilters > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>
                  {cat} <X className="h-3 w-3" />
                </Badge>
              ))}
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="gap-1 cursor-pointer" onClick={() => toggleSkill(skill)}>
                  {skill} <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} teams found</p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium">No teams found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Link
                    to={`/explore/${post.id}`}
                    className="group block rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
                  >
                    {/* Top row: campus + urgency + time */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline" className="gap-1 text-xs">
                          <MapPin className="h-3 w-3" /> {post.campus}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        {post.daysLeft <= 7 && (
                          <Badge className="gap-1 border-0 bg-warning/15 text-warning text-xs font-semibold">
                            <AlertTriangle className="h-3 w-3" /> Closing Soon
                          </Badge>
                        )}
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {post.posted}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{post.desc}</p>

                    {/* Looking For */}
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Looking for:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.lookingFor.map((role) => (
                          <span key={role} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {post.skills.map((skill) => (
                        <span key={skill} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer: slots + applicants + arrow */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" /> {post.slots} members
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4" /> {post.applicants} interested
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
