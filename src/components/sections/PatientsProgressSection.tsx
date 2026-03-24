import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const PATIENTS = [
  { id: 1, name: "Михайлов Артём", age: 6, sessions: 12, nextSession: "25 марта, 10:00", progress: 72, sounds: ["Р", "Л"], status: "active" },
  { id: 2, name: "Соколова Вика", age: 5, sessions: 8, nextSession: "26 марта, 11:30", progress: 48, sounds: ["С", "З"], status: "active" },
  { id: 3, name: "Новиков Дима", age: 7, sessions: 20, nextSession: "27 марта, 09:00", progress: 90, sounds: ["Ш", "Ж", "Р"], status: "active" },
  { id: 4, name: "Петрова Алина", age: 6, sessions: 5, nextSession: "28 марта, 14:00", progress: 30, sounds: ["Ч", "Щ"], status: "new" },
  { id: 5, name: "Козлов Матвей", age: 8, sessions: 16, nextSession: "—", progress: 95, sounds: ["Р"], status: "completed" },
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

export function PatientsSection() {
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

export function ProgressSection() {
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
