import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const PATIENTS = [
  { id: 1, name: "Михайлов Артём", age: 6, sessions: 12, nextSession: "25 марта, 10:00", progress: 72, sounds: ["Р", "Л"], status: "active", emoji: "🐻" },
  { id: 2, name: "Соколова Вика", age: 5, sessions: 8, nextSession: "26 марта, 11:30", progress: 48, sounds: ["С", "З"], status: "active", emoji: "🐰" },
  { id: 3, name: "Новиков Дима", age: 7, sessions: 20, nextSession: "27 марта, 09:00", progress: 90, sounds: ["Ш", "Ж", "Р"], status: "active", emoji: "🦊" },
  { id: 4, name: "Петрова Алина", age: 6, sessions: 5, nextSession: "28 марта, 14:00", progress: 30, sounds: ["Ч", "Щ"], status: "new", emoji: "🐱" },
  { id: 5, name: "Козлов Матвей", age: 8, sessions: 16, nextSession: "—", progress: 95, sounds: ["Р"], status: "completed", emoji: "🦁" },
];

const PROGRESS_DATA = [
  { patient: "Михайлов Артём", sound: "Р", before: 20, after: 72, sessions: 12, emoji: "🐻" },
  { patient: "Соколова Вика", sound: "С", before: 10, after: 48, sessions: 8, emoji: "🐰" },
  { patient: "Новиков Дима", sound: "Ш/Ж", before: 15, after: 90, sessions: 20, emoji: "🦊" },
  { patient: "Петрова Алина", sound: "Ч/Щ", before: 5, after: 30, sessions: 5, emoji: "🐱" },
];

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  active: { label: "Активный ✅", bg: "hsl(140 60% 94%)", color: "hsl(140 55% 35%)" },
  new: { label: "Новенький 🌟", bg: "hsl(200 80% 94%)", color: "hsl(200 70% 38%)" },
  completed: { label: "Молодец! 🏆", bg: "hsl(48 100% 92%)", color: "hsl(38 80% 40%)" },
};

const AVATAR_COLORS = [
  "hsl(280 70% 92%)",
  "hsl(160 60% 90%)",
  "hsl(48 100% 90%)",
  "hsl(200 80% 90%)",
  "hsl(340 70% 92%)",
];

export function PatientsSection() {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Icon name="Search" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold border-2 rounded-2xl bg-white focus:outline-none transition-all"
            style={{ borderColor: "hsl(45 40% 86%)" }}
            placeholder="🔍 Найти пациента..."
          />
        </div>
        <Button size="sm" className="gap-2 rounded-2xl font-bold text-white border-0"
          style={{ background: "hsl(280 70% 58%)" }}>
          <Icon name="UserPlus" size={15} />
          Новый пациент
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PATIENTS.map((p, i) => (
          <div key={p.id} className="bg-white rounded-3xl p-5 border-2 card-hover cursor-pointer flex items-center gap-5"
            style={{ borderColor: "hsl(45 40% 88%)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-black text-base">{p.name}</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-xl"
                  style={{ background: STATUS_LABELS[p.status].bg, color: STATUS_LABELS[p.status].color }}>
                  {STATUS_LABELS[p.status].label}
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                {p.age} лет · {p.sessions} сеансов · следующий: {p.nextSession}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(280 30% 92%)" }}>
                  <div className="progress-bar h-full transition-all duration-700" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-sm font-black w-10" style={{ color: "hsl(280 70% 52%)" }}>{p.progress}%</span>
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              {p.sounds.map(s => (
                <span key={s} className="text-sm font-black px-3 py-1 rounded-xl"
                  style={{ background: "hsl(280 70% 92%)", color: "hsl(280 70% 48%)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressSection() {
  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Активных пациентов", value: "18", emoji: "👶", bg: "hsl(280 70% 96%)", accent: "hsl(280 70% 58%)" },
          { label: "Сеансов проведено", value: "147", emoji: "📅", bg: "hsl(48 100% 94%)", accent: "hsl(38 90% 48%)" },
          { label: "Средний прогресс", value: "60%", emoji: "🌟", bg: "hsl(160 60% 94%)", accent: "hsl(160 55% 38%)" },
        ].map(stat => (
          <div key={stat.label} className="rounded-3xl p-6 border-2 flex items-center gap-4"
            style={{ background: stat.bg, borderColor: stat.bg }}>
            <span className="text-4xl">{stat.emoji}</span>
            <div>
              <p className="text-3xl font-black" style={{ color: stat.accent }}>{stat.value}</p>
              <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 border-2" style={{ borderColor: "hsl(45 40% 86%)" }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📈</span>
          <h3 className="font-black text-lg">Как растут наши звёздочки</h3>
        </div>
        <div className="space-y-6">
          {PROGRESS_DATA.map(p => (
            <div key={p.patient}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-sm font-black">{p.patient}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-xl"
                    style={{ background: "hsl(280 70% 92%)", color: "hsl(280 70% 48%)" }}>{p.sound}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="text-muted-foreground">{p.before}%</span>
                  <span>→</span>
                  <span className="font-black" style={{ color: "hsl(280 70% 52%)" }}>{p.after}%</span>
                  <span className="text-muted-foreground text-xs">· {p.sessions} сеансов</span>
                </div>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "hsl(280 30% 92%)" }}>
                <div className="progress-bar h-full transition-all duration-700" style={{ width: `${p.after}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
