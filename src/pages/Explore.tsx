import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Users, ArrowRight, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const categories = ["Web", "Mobile", "Business", "Data Science", "Design", "IoT"];
const skillsList = ["React", "Python", "Figma", "Laravel", "Flutter", "Node.js", "Machine Learning", "Strategy"];

const mockPosts = [
  { id: "1", title: "Hackathon UI/UX 2026", desc: "Looking for passionate designers to create an award-winning healthcare app prototype.", category: "Design", slots: "2/4", skills: ["Figma", "Research", "Prototyping"], posted: "2 hours ago", campus: "Universitas Indonesia" },
  { id: "2", title: "National Data Science Cup", desc: "Need a statistician and ML engineer to analyze climate change datasets.", category: "Data Science", slots: "1/3", skills: ["Python", "ML", "Statistics"], posted: "5 hours ago", campus: "ITB" },
  { id: "3", title: "Business Case Competition", desc: "Seeking finance and strategy experts for McKinsey-style case competition.", category: "Business", slots: "3/5", skills: ["Strategy", "Finance", "Presentation"], posted: "1 day ago", campus: "UGM" },
  { id: "4", title: "Mobile App Challenge", desc: "Building a community fitness app. Need a Flutter dev and UI designer.", category: "Mobile", slots: "1/3", skills: ["Flutter", "Firebase", "UI Design"], posted: "3 hours ago", campus: "ITS" },
  { id: "5", title: "Web Dev Marathon", desc: "48-hour web development sprint. Full-stack team needed.", category: "Web", slots: "2/4", skills: ["React", "Node.js", "TypeScript"], posted: "6 hours ago", campus: "Universitas Indonesia" },
  { id: "6", title: "IoT Smart Campus", desc: "Developing IoT solution for campus energy management.", category: "IoT", slots: "2/5", skills: ["Arduino", "Python", "3D Print"], posted: "1 day ago", campus: "ITB" },
  { id: "7", title: "AI Chatbot Competition", desc: "Build an AI-powered customer service chatbot for e-commerce.", category: "Data Science", slots: "1/4", skills: ["Python", "NLP", "React"], posted: "4 hours ago", campus: "Binus" },
  { id: "8", title: "Startup Weekend", desc: "Looking for developers and business people for 54-hour startup competition.", category: "Business", slots: "2/5", skills: ["React", "Strategy", "Pitch"], posted: "12 hours ago", campus: "UGM" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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
          {/* Active filter badges */}
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                to={`/explore/${post.id}`}
                className="group rounded-2xl border border-border bg-card p-5 hover-lift"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.posted}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{post.desc}</p>
                <p className="mt-2 text-xs text-muted-foreground">{post.campus}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{post.slots} members</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
