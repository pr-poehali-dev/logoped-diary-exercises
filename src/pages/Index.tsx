import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import ExercisesSection from "@/components/sections/ExercisesSection";
import { PatientsSection, ProgressSection } from "@/components/sections/PatientsProgressSection";
import { TasksSection, GamesSection, ReportsSection } from "@/components/sections/TasksGamesReportsSection";

type Section = "exercises" | "patients" | "progress" | "tasks" | "games" | "reports";

const TASKS_DATA = [
  { id: 1, patient: "Михайлов Артём", task: "Упражнение «Лошадка» — 10 раз утром и вечером", deadline: "до 27 марта", done: false, type: "exercise" },
  { id: 2, patient: "Соколова Вика", task: "Произносить слоги СА-СО-СУ перед зеркалом", deadline: "до 26 марта", done: false, type: "homework" },
  { id: 3, patient: "Новиков Дима", task: "Читать скороговорки со звуком Р — 3 раза в день", deadline: "до 28 марта", done: true, type: "reading" },
  { id: 4, patient: "Петрова Алина", task: "Игра «Угадай звук» с родителями — 15 минут", deadline: "до 26 марта", done: false, type: "game" },
  { id: 5, patient: "Михайлов Артём", task: "Посмотреть видео «Иголочка» и повторить", deadline: "до 25 марта", done: true, type: "video" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_COMPONENTS: Record<Section, React.FC<any>> = {
  exercises: ExercisesSection,
  patients: PatientsSection,
  progress: ProgressSection,
  tasks: TasksSection,
  games: GamesSection,
  reports: ReportsSection,
};

const SECTION_META: Record<Section, { title: string; emoji: string; subtitle: string }> = {
  exercises: { title: "Упражнения", emoji: "👅", subtitle: "артикуляционная гимнастика" },
  patients: { title: "Мои пациенты", emoji: "👶", subtitle: "все детки на учёте" },
  progress: { title: "Прогресс", emoji: "🌟", subtitle: "как растут наши звёздочки" },
  tasks: { title: "Домашние задания", emoji: "📋", subtitle: "задания для родителей" },
  games: { title: "Игры", emoji: "🎮", subtitle: "весёлые игры для речи" },
  reports: { title: "Отчёты", emoji: "📊", subtitle: "статистика и документы" },
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("exercises");
  const SectionComponent = SECTION_COMPONENTS[activeSection];
  const pendingTasks = TASKS_DATA.filter(t => !t.done).length;
  const meta = SECTION_META[activeSection];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "hsl(45 100% 97%)" }}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        pendingTasks={pendingTasks}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-4 flex items-center justify-between flex-shrink-0"
          style={{ background: "hsl(0 0% 100%)", borderBottom: "2px dashed hsl(45 40% 86%)" }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "hsl(280 70% 95%)" }}>
              {meta.emoji}
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground leading-tight">{meta.title}</h2>
              <p className="text-xs font-semibold text-muted-foreground">{meta.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold"
              style={{ background: "hsl(48 100% 92%)", color: "hsl(260 30% 30%)" }}>
              <span>📅</span>
              <span>24 марта 2026</span>
            </div>
            <button className="relative w-10 h-10 flex items-center justify-center rounded-2xl transition-all hover:scale-110"
              style={{ background: "hsl(280 70% 95%)", color: "hsl(280 70% 52%)" }}>
              <Icon name="Bell" size={18} />
              {pendingTasks > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
                  style={{ background: "hsl(24 100% 60%)" }}>
                  {pendingTasks}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <SectionComponent key={activeSection} />
        </div>
      </main>
    </div>
  );
}
