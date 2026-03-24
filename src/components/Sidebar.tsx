import Icon from "@/components/ui/icon";

type Section = "exercises" | "patients" | "progress" | "tasks" | "games" | "reports";

const NAV_ITEMS: { id: Section; label: string; icon: string; emoji: string; count?: number }[] = [
  { id: "exercises", label: "Упражнения", icon: "Mic", emoji: "👅", count: 24 },
  { id: "patients", label: "Пациенты", icon: "Users", emoji: "👶", count: 18 },
  { id: "progress", label: "Прогресс", icon: "TrendingUp", emoji: "🌟" },
  { id: "tasks", label: "Задания", icon: "ClipboardList", emoji: "📋", count: 7 },
  { id: "games", label: "Игры", icon: "Gamepad2", emoji: "🎮", count: 12 },
  { id: "reports", label: "Отчёты", icon: "BarChart2", emoji: "📊" },
];

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  pendingTasks: number;
}

export default function Sidebar({ activeSection, onSectionChange, pendingTasks }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: "hsl(280 70% 58%)" }}>
      {/* Logo */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg" style={{ background: "hsl(48 100% 68%)" }}>
            🗣️
          </div>
          <div>
            <h1 className="text-white font-black text-base leading-tight">ЛогоДневник</h1>
            <p className="text-xs font-semibold" style={{ color: "hsl(280 70% 88%)" }}>кабинет логопеда ✨</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all"
              style={{
                background: isActive ? "hsl(0 0% 100%)" : "transparent",
                color: isActive ? "hsl(280 70% 52%)" : "hsl(0 0% 100%)",
                boxShadow: isActive ? "0 4px 16px hsl(280 60% 30% / 0.25)" : "none",
              }}>
              <span className="text-lg leading-none">{item.emoji}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-black"
                  style={{
                    background: isActive ? "hsl(280 70% 92%)" : "hsl(280 60% 48%)",
                    color: isActive ? "hsl(280 70% 52%)" : "white",
                  }}>
                  {item.id === "tasks" ? pendingTasks : item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4" style={{ borderTop: "2px dashed hsl(280 55% 52%)" }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black" style={{ background: "hsl(48 100% 68%)", color: "hsl(260 30% 20%)" }}>
            ЕА
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold">Елена Антонова</p>
            <p className="text-xs font-semibold" style={{ color: "hsl(280 70% 88%)" }}>Логопед 🎓</p>
          </div>
          <button style={{ color: "hsl(280 70% 88%)" }} className="hover:text-white transition-colors">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
