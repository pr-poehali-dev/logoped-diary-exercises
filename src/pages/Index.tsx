import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Section = "exercises" | "patients" | "progress" | "tasks" | "games" | "reports";

const NAV_ITEMS: { id: Section; label: string; icon: string; count?: number }[] = [
  { id: "exercises", label: "Упражнения", icon: "Mic", count: 24 },
  { id: "patients", label: "Пациенты", icon: "Users", count: 18 },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "tasks", label: "Задания", icon: "ClipboardList", count: 7 },
  { id: "games", label: "Игры", icon: "Gamepad2", count: 12 },
  { id: "reports", label: "Отчёты", icon: "BarChart2" },
];

const EXERCISES = [
  { id: 1, title: "Лошадка", category: "Язык", difficulty: "Начальный", duration: "3 мин", hasVideo: true, sound: "Р, Д", description: "Щёлкать языком, имитируя цокот копыт. Укрепляет мышцы языка." },
  { id: 2, title: "Иголочка", category: "Язык", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "С, З", description: "Высунуть узкий и острый язык, удерживать 5 секунд." },
  { id: 3, title: "Грибок", category: "Язык", difficulty: "Средний", duration: "4 мин", hasVideo: true, sound: "Р", description: "Присосать язык к нёбу, широко открыть рот — форма гриба." },
  { id: 4, title: "Заборчик", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: false, sound: "И, Е", description: "Улыбнуться, показать сжатые зубы — верхние на нижних." },
  { id: 5, title: "Хоботок", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "У, О", description: "Вытянуть губы трубочкой, удерживать 5–7 секунд." },
  { id: 6, title: "Качели", category: "Язык", difficulty: "Средний", duration: "3 мин", hasVideo: false, sound: "Л, Н", description: "Поднимать и опускать язык — к верхним и нижним зубам." },
];

const PATIENTS = [
  { id: 1, name: "Михайлов Артём", age: 6, sessions: 12, nextSession: "25 марта, 10:00", progress: 72, sounds: ["Р", "Л"], status: "active" },
  { id: 2, name: "Соколова Вика", age: 5, sessions: 8, nextSession: "26 марта, 11:30", progress: 48, sounds: ["С", "З"], status: "active" },
  { id: 3, name: "Новиков Дима", age: 7, sessions: 20, nextSession: "27 марта, 09:00", progress: 90, sounds: ["Ш", "Ж", "Р"], status: "active" },
  { id: 4, name: "Петрова Алина", age: 6, sessions: 5, nextSession: "28 марта, 14:00", progress: 30, sounds: ["Ч", "Щ"], status: "new" },
  { id: 5, name: "Козлов Матвей", age: 8, sessions: 16, nextSession: "—", progress: 95, sounds: ["Р"], status: "completed" },
];

const TASKS_DATA = [
  { id: 1, patient: "Михайлов Артём", task: "Упражнение «Лошадка» — 10 раз утром и вечером", deadline: "до 27 марта", done: false, type: "exercise" },
  { id: 2, patient: "Соколова Вика", task: "Произносить слоги СА-СО-СУ перед зеркалом", deadline: "до 26 марта", done: false, type: "homework" },
  { id: 3, patient: "Новиков Дима", task: "Читать скороговорки со звуком Р — 3 раза в день", deadline: "до 28 марта", done: true, type: "reading" },
  { id: 4, patient: "Петрова Алина", task: "Игра «Угадай звук» с родителями — 15 минут", deadline: "до 26 марта", done: false, type: "game" },
  { id: 5, patient: "Михайлов Артём", task: "Посмотреть видео «Иголочка» и повторить", deadline: "до 25 марта", done: true, type: "video" },
];

const GAMES = [
  { id: 1, title: "Угадай звук", icon: "🎵", age: "4–7 лет", type: "Слуховое восприятие", players: "1–2", description: "Логопед произносит слова — ребёнок определяет, есть ли заданный звук. Развивает фонематический слух." },
  { id: 2, title: "Звуковая рыбалка", icon: "🎣", age: "5–8 лет", type: "Автоматизация", players: "1–4", description: "Карточки-рыбки с картинками. Ребёнок «ловит» рыбку и называет слово с нужным звуком." },
  { id: 3, title: "Логопедическое лото", icon: "🃏", age: "5–9 лет", type: "Дифференциация", players: "2–6", description: "Классическое лото с картинками. Ведущий называет слово — игроки ищут на своих карточках." },
  { id: 4, title: "Сложи слово", icon: "🧩", age: "6–9 лет", type: "Слоговая структура", players: "1–2", description: "Карточки со слогами. Ребёнок составляет слова, тренируя слоговую структуру речи." },
  { id: 5, title: "Зеркальный артикул", icon: "🪞", age: "4–6 лет", type: "Артикуляция", players: "1", description: "Ребёнок повторяет артикуляционные движения за логопедом, глядя в зеркало." },
  { id: 6, title: "Скороговорки-соревнование", icon: "🏆", age: "7–12 лет", type: "Автоматизация", players: "2+", description: "Кто быстрее и чище произнесёт скороговорку? Развивает автоматизм произношения." },
];

const PROGRESS_DATA = [
  { patient: "Михайлов Артём", sound: "Р", before: 20, after: 72, sessions: 12 },
  { patient: "Соколова Вика", sound: "С", before: 10, after: 48, sessions: 8 },
  { patient: "Новиков Дима", sound: "Ш/Ж", before: 15, after: 90, sessions: 20 },
  { patient: "Петрова Алина", sound: "Ч/Щ", before: 5, after: 30, sessions: 5 },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Активный", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  new: { label: "Новый", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  completed: { label: "Завершён", color: "bg-gray-50 text-gray-600 border border-gray-200" },
};

function VideoModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground font-ibm uppercase tracking-wider mb-1">Видеоупражнение</p>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>
        <div className="bg-slate-900 aspect-video flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <Icon name="Play" size={28} className="text-white ml-1" />
          </div>
          <p className="text-white/60 text-sm font-ibm">Загрузите видео с правильным произношением</p>
        </div>
        <div className="px-6 py-4 flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="Upload" size={14} />
            Загрузить видео
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="Link" size={14} />
            Вставить ссылку
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors">
              <Icon name="Volume2" size={15} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors">
              <Icon name="Maximize2" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExercisesSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [filter, setFilter] = useState("Все");
  const filters = ["Все", "Язык", "Губы", "Начальный", "Средний"];
  const filtered = filter === "Все" ? EXERCISES : EXERCISES.filter(e => e.category === filter || e.difficulty === filter);

  return (
    <div className="animate-slide-up">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Icon name="Plus" size={15} />
            Добавить упражнение
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(ex => (
          <div key={ex.id} className="bg-white border border-border rounded-xl p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{ex.title}</h3>
                <p className="text-xs text-muted-foreground font-ibm mt-0.5">{ex.category} · {ex.difficulty} · {ex.duration}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border font-ibm">{ex.sound}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ex.description}</p>
            <div className="flex items-center gap-2">
              {ex.hasVideo ? (
                <button onClick={() => setActiveVideo(ex.title)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium">
                  <Icon name="Play" size={14} />
                  Видео
                </button>
              ) : (
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:border-accent/50 transition-colors text-sm">
                  <Icon name="Upload" size={14} />
                  Добавить видео
                </button>
              )}
              <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-sm">
                <Icon name="Send" size={13} />
                Задать
              </button>
            </div>
          </div>
        ))}
      </div>
      {activeVideo && <VideoModal title={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}

function PatientsSection() {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Найти пациента..." />
        </div>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="UserPlus" size={15} />
          Новый пациент
        </Button>
      </div>
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr_auto] text-xs font-medium text-muted-foreground font-ibm uppercase tracking-wide px-5 py-3 border-b border-border bg-secondary/40">
          <span>Пациент</span>
          <span>Сеансов</span>
          <span>Звуки</span>
          <span>Прогресс</span>
          <span>Следующий сеанс</span>
          <span></span>
        </div>
        {PATIENTS.map((p, i) => (
          <div key={p.id} className={`grid grid-cols-[2fr_1fr_1fr_2fr_2fr_auto] items-center px-5 py-4 hover:bg-secondary/30 transition-colors cursor-pointer ${i < PATIENTS.length - 1 ? "border-b border-border" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.age} лет</p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground font-ibm">{p.sessions}</span>
            <div className="flex gap-1 flex-wrap">
              {p.sounds.map(s => (
                <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium font-ibm">{s}</span>
              ))}
            </div>
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="progress-bar h-full" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-xs text-muted-foreground font-ibm w-8">{p.progress}%</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground font-ibm">{p.nextSession}</span>
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${STATUS_LABELS[p.status].color}`}>
              {STATUS_LABELS[p.status].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressSection() {
  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Активных пациентов", value: "18", icon: "Users", trend: "+2 в этом месяце" },
          { label: "Сеансов проведено", value: "147", icon: "Calendar", trend: "за всё время" },
          { label: "Средний прогресс", value: "60%", icon: "TrendingUp", trend: "↑ по всем пациентам" },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(213 60% 30% / 0.08)" }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Icon name={stat.icon as any} size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground font-ibm mt-0.5">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-5">Динамика по пациентам</h3>
        <div className="space-y-6">
          {PROGRESS_DATA.map(p => (
            <div key={p.patient}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">{p.patient}</span>
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-ibm font-medium">{p.sound}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-ibm">
                  <span className="text-muted-foreground">Было {p.before}%</span>
                  <Icon name="ArrowRight" size={13} className="text-muted-foreground" />
                  <span className="font-semibold text-primary">{p.after}%</span>
                  <span className="text-muted-foreground">· {p.sessions} сеансов</span>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="progress-bar h-full" style={{ width: `${p.after}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksSection() {
  const [tasks, setTasks] = useState(TASKS_DATA);
  const toggle = (id: number) => setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  const typeIcons: Record<string, string> = { exercise: "Mic", homework: "BookOpen", reading: "BookText", game: "Gamepad2", video: "Play" };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Badge variant="secondary" className="font-ibm">{tasks.filter(t => !t.done).length} активных</Badge>
          <Badge variant="outline" className="font-ibm">{tasks.filter(t => t.done).length} выполнено</Badge>
        </div>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="Plus" size={15} />
          Новое задание
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className={`bg-white border rounded-xl px-5 py-4 flex items-start gap-4 transition-all ${task.done ? "border-border opacity-60" : "border-border card-hover"}`}>
            <button onClick={() => toggle(task.id)}
              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.done ? "bg-primary border-primary" : "border-border hover:border-primary"}`}>
              {task.done && <Icon name="Check" size={11} className="text-primary-foreground" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground font-ibm">{task.patient}</span>
                <span className="w-1 h-1 rounded-full bg-border inline-block" />
                <span className="text-xs text-muted-foreground font-ibm">{task.deadline}</span>
              </div>
              <p className={`text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.task}</p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Icon name={typeIcons[task.type] as any} size={13} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GamesSection() {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">Готовые игры для развития речи и артикуляции</p>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="Plus" size={15} />
          Добавить игру
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {GAMES.map(game => (
          <div key={game.id} className="bg-white border border-border rounded-xl p-5 card-hover cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl leading-none">{game.icon}</span>
              <div>
                <h3 className="font-semibold text-base">{game.title}</h3>
                <p className="text-xs text-muted-foreground font-ibm mt-0.5">{game.type}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{game.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-ibm">
                <span className="flex items-center gap-1"><Icon name="Baby" size={12} />{game.age}</span>
                <span className="flex items-center gap-1"><Icon name="Users" size={12} />{game.players} игр.</span>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-accent font-medium hover:underline">
                <Icon name="Send" size={12} />
                Назначить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Создать отчёт</h3>
          <div className="space-y-2">
            {[
              { label: "Индивидуальный отчёт пациента", icon: "User", desc: "Прогресс, упражнения, посещаемость" },
              { label: "Ежемесячный сводный отчёт", icon: "Calendar", desc: "Все пациенты за выбранный период" },
              { label: "Задания для родителей (PDF)", icon: "Home", desc: "Список домашних заданий" },
              { label: "Статистика по звукам", icon: "BarChart2", desc: "Какие звуки отрабатываются чаще" },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-border hover:bg-secondary/50 hover:border-primary/30 transition-all text-left group">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Icon name={item.icon as any} size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-ibm">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Последние отчёты</h3>
          <div className="space-y-1">
            {[
              { name: "Михайлов Артём — февраль", date: "1 марта 2026", type: "Индивидуальный" },
              { name: "Соколова Вика — февраль", date: "1 марта 2026", type: "Индивидуальный" },
              { name: "Сводный — февраль 2026", date: "2 марта 2026", type: "Ежемесячный" },
              { name: "Задания для родителей", date: "15 марта 2026", type: "Домашние задания" },
            ].map(r => (
              <div key={r.name} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground font-ibm">{r.date} · {r.type}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-accent hover:underline font-medium">
                  <Icon name="Download" size={12} />
                  PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTION_COMPONENTS: Record<Section, React.FC> = {
  exercises: ExercisesSection,
  patients: PatientsSection,
  progress: ProgressSection,
  tasks: TasksSection,
  games: GamesSection,
  reports: ReportsSection,
};

const SECTION_TITLES: Record<Section, string> = {
  exercises: "Упражнения для артикуляции",
  patients: "Мои пациенты",
  progress: "Прогресс и статистика",
  tasks: "Домашние задания",
  games: "Игры для развития речи",
  reports: "Отчёты",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("exercises");
  const SectionComponent = SECTION_COMPONENTS[activeSection];
  const pendingTasks = TASKS_DATA.filter(t => !t.done).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
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
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "text-white"
                  : "hover:text-white"
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

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold">{SECTION_TITLES[activeSection]}</h2>
            <p className="text-xs text-muted-foreground font-ibm mt-0.5">24 марта 2026 · Понедельник</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors">
              <Icon name="Bell" size={17} />
              {pendingTasks > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "hsl(0 72% 51%)" }} />}
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors">
              <Icon name="Search" size={17} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <SectionComponent key={activeSection} />
        </div>
      </main>
    </div>
  );
}