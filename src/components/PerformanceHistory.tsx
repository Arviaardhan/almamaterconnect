import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Aug", year: 2024, participations: 2, wins: 0 },
  { month: "Sep", year: 2024, participations: 3, wins: 1 },
  { month: "Oct", year: 2024, participations: 6, wins: 3 },
  { month: "Nov", year: 2024, participations: 4, wins: 2 },
  { month: "Dec", year: 2024, participations: 1, wins: 0 },
  { month: "Jan", year: 2025, participations: 3, wins: 1 },
  { month: "Feb", year: 2025, participations: 2, wins: 1 },
  { month: "Mar", year: 2025, participations: 5, wins: 2 },
  { month: "Apr", year: 2025, participations: 4, wins: 2 },
  { month: "May", year: 2025, participations: 3, wins: 1 },
  { month: "Jun", year: 2025, participations: 2, wins: 0 },
  { month: "Jul", year: 2025, participations: 1, wins: 0 },
  { month: "Aug", year: 2025, participations: 3, wins: 1 },
  { month: "Sep", year: 2025, participations: 5, wins: 3 },
  { month: "Oct", year: 2025, participations: 7, wins: 4 },
  { month: "Nov", year: 2025, participations: 4, wins: 2 },
  { month: "Dec", year: 2025, participations: 2, wins: 1 },
  { month: "Jan", year: 2026, participations: 3, wins: 1 },
  { month: "Feb", year: 2026, participations: 4, wins: 2 },
  { month: "Mar", year: 2026, participations: 5, wins: 3 },
];

const OLIVE = "#5A8D39";

function getBarOpacity(wins: number, maxWins: number) {
  if (maxWins === 0) return 0.25;
  const ratio = wins / maxWins;
  return 0.25 + ratio * 0.75;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: typeof monthlyData[0] }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-[#1e293b] px-3.5 py-2.5 text-xs shadow-xl border border-[#334155]">
      <p className="font-semibold text-white mb-1.5">{d.month} {d.year}</p>
      <p className="text-slate-300">Participations: <span className="text-white font-medium">{d.participations}</span></p>
      <p className="text-slate-300">Wins: <span className="font-medium" style={{ color: OLIVE }}>{d.wins}</span></p>
    </div>
  );
}

const legendShades = [0.2, 0.4, 0.6, 0.8, 1.0];

export default function PerformanceHistory() {
  const maxWins = Math.max(...monthlyData.map(d => d.wins));

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
              <Bar dataKey="participations" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={OLIVE}
                    fillOpacity={getBarOpacity(entry.wins, maxWins)}
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
      </CardContent>
    </Card>
  );
}
