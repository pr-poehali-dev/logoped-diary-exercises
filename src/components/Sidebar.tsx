import Icon from "@/components/ui/icon";

type Section = "exercises" | "patients" | "progress" | "tasks" | "games" | "reports";

const NAV_ITEMS: { id: Section; label: string; icon: string; count?: number }[] = [
  { id: "exercises", label: "Упражнения", icon: "Mic", count: 24 },
  { id: "patients", label: "Пациенты", icon: "Users", count: 18 },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "tasks", label: "Задания", icon: "ClipboardList", count: 7 },
  { id: "games", label: "Игры", icon: "Gamepad2", count: 12 },
  { id: "reports", label: "Отчёты", icon: "BarChart2" },
];

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  pendingTasks: number;
}

export default function Sidebar({ activeSection, onSectionChange, pendingTasks }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: "hsl(215 30% 12%)" }}>
      <div className="px-5 py-6 border-b" style={{ borderColor: "hsl(215 22% 22%)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(196 70% 42%)" }}>
            <Icon name="Mic" size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">ЛогоДневник</h1>
            <p className="text-xs font-ibm" style={{ color: "hsl(210 20% 55%)" }}>Кабинет логопеда</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeSection === item.id ? "text-white" : "hover:text-white"
            }`}
            style={{
              background: activeSection === item.id ? "hsl(215 26% 20%)" : "transparent",
              color: activeSection === item.id ? "white" : "hsl(210 20% 70%)",
            }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Icon name={item.icon as any} size={17} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.count !== undefined && (
              <span className="text-xs px-1.5 py-0.5 rounded font-ibm"
                style={{ background: "hsl(215 26% 20%)", color: "hsl(210 20% 65%)" }}>
                {item.id === "tasks" ? pendingTasks : item.count}
              </span>
            )}
            {activeSection === item.id && (
              <span className="w-1 h-4 rounded-full ml-auto" style={{ background: "hsl(196 70% 42%)" }} />
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4" style={{ borderTop: "1px solid hsl(215 22% 22%)" }}>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: "hsl(215 26% 22%)" }}>
            ЕА
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium">Елена Антонова</p>
            <p className="text-xs font-ibm" style={{ color: "hsl(210 20% 50%)" }}>Логопед</p>
          </div>
          <button style={{ color: "hsl(210 20% 50%)" }} className="hover:text-white transition-colors">
            <Icon name="Settings" size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
