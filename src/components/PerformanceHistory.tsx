import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, MousePointerClick, Award, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Competition {
  name: string;
  team: string;
  result: "Winner" | "Runner-Up" | "Finalist" | "Participant";
}

interface MonthData {
  month: string;
  year: number;
  participations: number;
  wins: number;
  competitions: Competition[];
}

const monthlyData: MonthData[] = [
  { month: "Aug", year: 2024, participations: 2, wins: 0, competitions: [
    { name: "Summer Code Jam", team: "ByteForce", result: "Participant" },
    { name: "UI/UX Sprint", team: "PixelCraft", result: "Participant" },
  ]},
  { month: "Sep", year: 2024, participations: 3, wins: 1, competitions: [
    { name: "Hackathon Merdeka", team: "ByteForce", result: "Winner" },
    { name: "Cloud Challenge", team: "SkyNet ID", result: "Finalist" },
    { name: "Data Viz Contest", team: "DataMinds", result: "Participant" },
  ]},
  { month: "Oct", year: 2024, participations: 6, wins: 3, competitions: [
    { name: "Gemastik XVI", team: "ByteForce", result: "Winner" },
    { name: "Compfest XV", team: "CodeCrafters", result: "Winner" },
    { name: "IoT Smart Campus", team: "SensorLab", result: "Winner" },
    { name: "Mobile App Challenge", team: "AppStorm", result: "Runner-Up" },
    { name: "Web Dev Marathon", team: "ByteForce", result: "Finalist" },
    { name: "Design Sprint", team: "PixelCraft", result: "Participant" },
  ]},
  { month: "Nov", year: 2024, participations: 4, wins: 2, competitions: [
    { name: "DevFest Jakarta", team: "ByteForce", result: "Winner" },
    { name: "Startup Weekend", team: "LaunchPad", result: "Winner" },
    { name: "Code for Good", team: "ImpactDev", result: "Finalist" },
    { name: "AI Innovation Cup", team: "NeuralNet", result: "Participant" },
  ]},
  { month: "Dec", year: 2024, participations: 1, wins: 0, competitions: [
    { name: "Year-End Hackfest", team: "ByteForce", result: "Participant" },
  ]},
  { month: "Jan", year: 2025, participations: 3, wins: 1, competitions: [
    { name: "New Year Code Jam", team: "ByteForce", result: "Winner" },
    { name: "Figma Config Jam", team: "PixelCraft", result: "Runner-Up" },
    { name: "Backend Blitz", team: "ServerSquad", result: "Participant" },
  ]},
  { month: "Feb", year: 2025, participations: 2, wins: 1, competitions: [
    { name: "Valentine Hack", team: "ByteForce", result: "Winner" },
    { name: "UX Research Sprint", team: "PixelCraft", result: "Finalist" },
  ]},
  { month: "Mar", year: 2025, participations: 5, wins: 2, competitions: [
    { name: "Google Solution Challenge", team: "ByteForce", result: "Winner" },
    { name: "Hackathon Nasional", team: "CodeCrafters", result: "Winner" },
    { name: "AWS Build Day", team: "SkyNet ID", result: "Finalist" },
    { name: "Flutter Fest", team: "AppStorm", result: "Runner-Up" },
    { name: "Data Science Bowl", team: "DataMinds", result: "Participant" },
  ]},
  { month: "Apr", year: 2025, participations: 4, wins: 2, competitions: [
    { name: "Enterprise Hack", team: "ByteForce", result: "Winner" },
    { name: "Product Design Sprint", team: "PixelCraft", result: "Winner" },
    { name: "Blockchain Challenge", team: "ChainGang", result: "Finalist" },
    { name: "React Challenge", team: "CodeCrafters", result: "Participant" },
  ]},
  { month: "May", year: 2025, participations: 3, wins: 1, competitions: [
    { name: "EdTech Hackathon", team: "ByteForce", result: "Winner" },
    { name: "Green Tech Sprint", team: "EcoCode", result: "Runner-Up" },
    { name: "Mobile UX Jam", team: "AppStorm", result: "Participant" },
  ]},
  { month: "Jun", year: 2025, participations: 2, wins: 0, competitions: [
    { name: "Mid-Year Code Fest", team: "ByteForce", result: "Finalist" },
    { name: "Design Systems Jam", team: "PixelCraft", result: "Participant" },
  ]},
  { month: "Jul", year: 2025, participations: 1, wins: 0, competitions: [
    { name: "Summer Break Hack", team: "ByteForce", result: "Participant" },
  ]},
  { month: "Aug", year: 2025, participations: 3, wins: 1, competitions: [
    { name: "Independence Hack", team: "ByteForce", result: "Winner" },
    { name: "A11y Design Challenge", team: "PixelCraft", result: "Runner-Up" },
    { name: "Cloud Native Jam", team: "SkyNet ID", result: "Participant" },
  ]},
  { month: "Sep", year: 2025, participations: 5, wins: 3, competitions: [
    { name: "Compfest XVI", team: "ByteForce", result: "Winner" },
    { name: "Hackathon Merdeka II", team: "CodeCrafters", result: "Winner" },
    { name: "iOS Dev Challenge", team: "AppStorm", result: "Winner" },
    { name: "Data Hackday", team: "DataMinds", result: "Finalist" },
    { name: "Cyber Security CTF", team: "SecOps", result: "Participant" },
  ]},
  { month: "Oct", year: 2025, participations: 7, wins: 4, competitions: [
    { name: "Gemastik XVII", team: "ByteForce", result: "Winner" },
    { name: "Google Dev Fest", team: "CodeCrafters", result: "Winner" },
    { name: "UI/UX Design Sprint", team: "PixelCraft", result: "Winner" },
    { name: "Smart City Hack", team: "UrbanDev", result: "Winner" },
    { name: "ML Challenge", team: "NeuralNet", result: "Runner-Up" },
    { name: "Startup Pitch Day", team: "LaunchPad", result: "Finalist" },
    { name: "Open Source Fest", team: "ByteForce", result: "Participant" },
  ]},
  { month: "Nov", year: 2025, participations: 4, wins: 2, competitions: [
    { name: "BizIT Challenge", team: "ByteForce", result: "Winner" },
    { name: "Creative Code Fest", team: "PixelCraft", result: "Winner" },
    { name: "Tech in Asia Hack", team: "LaunchPad", result: "Finalist" },
    { name: "DevOps Challenge", team: "ServerSquad", result: "Participant" },
  ]},
  { month: "Dec", year: 2025, participations: 2, wins: 1, competitions: [
    { name: "Year-End Showcase", team: "ByteForce", result: "Winner" },
    { name: "Holiday Hack", team: "CodeCrafters", result: "Participant" },
  ]},
  { month: "Jan", year: 2026, participations: 3, wins: 1, competitions: [
    { name: "New Year Innovation", team: "ByteForce", result: "Winner" },
    { name: "AI Ethics Hack", team: "NeuralNet", result: "Runner-Up" },
    { name: "Frontend Blitz", team: "CodeCrafters", result: "Participant" },
  ]},
  { month: "Feb", year: 2026, participations: 4, wins: 2, competitions: [
    { name: "Valentine Design Jam", team: "PixelCraft", result: "Winner" },
    { name: "Cloud Innovation Cup", team: "SkyNet ID", result: "Winner" },
    { name: "React Challenge II", team: "CodeCrafters", result: "Finalist" },
    { name: "Agile Sprint Hack", team: "ByteForce", result: "Participant" },
  ]},
  { month: "Mar", year: 2026, participations: 5, wins: 3, competitions: [
    { name: "Hackathon UI/UX 2026", team: "PixelCraft", result: "Winner" },
    { name: "Code for Impact", team: "ImpactDev", result: "Winner" },
    { name: "Flutter Fest II", team: "AppStorm", result: "Winner" },
    { name: "Blockchain Summit", team: "ChainGang", result: "Runner-Up" },
    { name: "Campus Dev Day", team: "ByteForce", result: "Finalist" },
  ]},
];

const OLIVE = "#5A8D39";

function getBarOpacity(wins: number, maxWins: number) {
  if (maxWins === 0) return 0.25;
  const ratio = wins / maxWins;
  return 0.25 + ratio * 0.75;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MonthData }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-[#1e293b] px-3.5 py-2.5 text-xs shadow-xl border border-[#334155]">
      <p className="font-semibold text-white mb-1.5">{d.month} {d.year}</p>
      <p className="text-slate-300">Participations: <span className="text-white font-medium">{d.participations}</span></p>
      <p className="text-slate-300">Wins: <span className="font-medium" style={{ color: OLIVE }}>{d.wins}</span></p>
      <p className="text-slate-400 mt-1.5 flex items-center gap-1">
        <MousePointerClick className="h-3 w-3" /> Click for details
      </p>
    </div>
  );
}

function getResultBadgeClass(result: Competition["result"]) {
  switch (result) {
    case "Winner":
      return "bg-lime text-lime-foreground border-0 font-bold text-xs";
    case "Runner-Up":
      return "bg-warning/15 text-warning border-warning/30 text-xs";
    case "Finalist":
      return "bg-secondary/15 text-secondary border-secondary/30 text-xs";
    default:
      return "text-xs";
  }
}

function getResultVariant(result: Competition["result"]): "default" | "outline" {
  return result === "Participant" ? "outline" : "default";
}

const legendShades = [0.2, 0.4, 0.6, 0.8, 1.0];

export default function PerformanceHistory() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const maxWins = Math.max(...monthlyData.map(d => d.wins));
  const selectedMonth = selectedIndex !== null ? monthlyData[selectedIndex] : null;

  const handleBarClick = (_: unknown, index: number) => {
    setSelectedIndex(prev => prev === index ? null : index);
  };

  return (
    <Card className="rounded-2xl shadow-md border border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Performance History</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Activity from Aug 2024 to Mar 2026</p>

        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barCategoryGap="18%">
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.5)" }} />
              <Bar dataKey="participations" radius={[4, 4, 0, 0]} className="cursor-pointer" onClick={handleBarClick}>
                {monthlyData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={OLIVE}
                    fillOpacity={selectedIndex === i ? 1 : getBarOpacity(entry.wins, maxWins)}
                    stroke={selectedIndex === i ? OLIVE : "none"}
                    strokeWidth={selectedIndex === i ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-4">
          <span className="text-[10px] text-muted-foreground mr-1">Less Wins</span>
          {legendShades.map((opacity, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: OLIVE, opacity }}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">More Wins</span>
        </div>

        {/* Drill-down details */}
        <div className="mt-5 border-t border-border pt-4">
          <AnimatePresence mode="wait">
            {selectedMonth ? (
              <motion.div
                key={`${selectedMonth.month}-${selectedMonth.year}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {selectedMonth.month} {selectedMonth.year} — {selectedMonth.competitions.length} competitions
                  </h3>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedMonth.competitions.map((comp, i) => (
                    <motion.div
                      key={comp.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${comp.result === "Winner" ? "bg-lime/15" : "bg-muted"}`}>
                          {comp.result === "Winner" ? (
                            <Trophy className="h-4 w-4 text-lime" />
                          ) : (
                            <Award className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{comp.name}</p>
                          <p className="text-xs text-muted-foreground">{comp.team}</p>
                        </div>
                      </div>
                      <Badge
                        variant={getResultVariant(comp.result)}
                        className={getResultBadgeClass(comp.result)}
                      >
                        {comp.result === "Winner" && <Award className="h-3 w-3 mr-1" />}
                        {comp.result}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2 py-2"
              >
                <MousePointerClick className="h-4 w-4" />
                Click a bar to see monthly details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
