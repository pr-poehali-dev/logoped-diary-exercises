import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const EXERCISES = [
  { id: 1, title: "Лошадка", category: "Язык", difficulty: "Начальный", duration: "3 мин", hasVideo: true, sound: "Р, Д", emoji: "🐴", description: "Щёлкать языком, имитируя цокот копыт. Укрепляет мышцы языка." },
  { id: 2, title: "Иголочка", category: "Язык", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "С, З", emoji: "🪡", description: "Высунуть узкий и острый язык, удерживать 5 секунд." },
  { id: 3, title: "Грибок", category: "Язык", difficulty: "Средний", duration: "4 мин", hasVideo: true, sound: "Р", emoji: "🍄", description: "Присосать язык к нёбу, широко открыть рот — форма гриба." },
  { id: 4, title: "Заборчик", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: false, sound: "И, Е", emoji: "🪟", description: "Улыбнуться, показать сжатые зубы — верхние на нижних." },
  { id: 5, title: "Хоботок", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "У, О", emoji: "🐘", description: "Вытянуть губы трубочкой, удерживать 5–7 секунд." },
  { id: 6, title: "Качели", category: "Язык", difficulty: "Средний", duration: "3 мин", hasVideo: false, sound: "Л, Н", emoji: "🎠", description: "Поднимать и опускать язык — к верхним и нижним зубам." },
];

const CARD_COLORS = [
  { bg: "hsl(280 70% 97%)", border: "hsl(280 60% 88%)", accent: "hsl(280 70% 58%)" },
  { bg: "hsl(48 100% 96%)", border: "hsl(48 80% 82%)", accent: "hsl(38 90% 52%)" },
  { bg: "hsl(160 60% 96%)", border: "hsl(160 50% 82%)", accent: "hsl(160 60% 40%)" },
  { bg: "hsl(24 100% 96%)", border: "hsl(24 80% 84%)", accent: "hsl(24 90% 52%)" },
  { bg: "hsl(200 80% 96%)", border: "hsl(200 60% 84%)", accent: "hsl(200 70% 44%)" },
  { bg: "hsl(340 70% 96%)", border: "hsl(340 60% 86%)", accent: "hsl(340 70% 52%)" },
];

function VideoModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border-4" style={{ borderColor: "hsl(280 70% 85%)" }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4" style={{ background: "hsl(280 70% 97%)" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Видеоупражнение</p>
              <h3 className="text-lg font-black">{title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-white/60 transition-colors font-black">
            <Icon name="X" size={18} />
          </button>
        </div>
        <div className="aspect-video flex flex-col items-center justify-center gap-4" style={{ background: "hsl(260 30% 15%)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ background: "hsl(280 70% 58% / 0.3)" }}>
            ▶️
          </div>
          <p className="text-white/60 text-sm font-semibold">Загрузите видео с правильным произношением</p>
        </div>
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: "hsl(280 70% 97%)" }}>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl font-bold border-2">
            <Icon name="Upload" size={14} />
            Загрузить видео
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl font-bold border-2">
            <Icon name="Link" size={14} />
            Вставить ссылку
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-border hover:bg-white transition-colors">
              <Icon name="Volume2" size={15} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-border hover:bg-white transition-colors">
              <Icon name="Maximize2" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExercisesSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [filter, setFilter] = useState("Все");
  const filters = ["Все", "Язык", "Губы", "Начальный", "Средний"];
  const filtered = filter === "Все" ? EXERCISES : EXERCISES.filter(e => e.category === filter || e.difficulty === filter);

  return (
    <div className="animate-slide-up">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-2xl text-sm font-bold border-2 transition-all"
            style={filter === f
              ? { background: "hsl(280 70% 58%)", color: "white", borderColor: "hsl(280 70% 58%)" }
              : { background: "white", color: "hsl(260 20% 45%)", borderColor: "hsl(45 40% 86%)" }
            }>
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <Button size="sm" className="gap-2 rounded-2xl font-bold text-white border-0"
            style={{ background: "hsl(280 70% 58%)" }}>
            <Icon name="Plus" size={15} />
            Добавить упражнение
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((ex, i) => {
          const colors = CARD_COLORS[i % CARD_COLORS.length];
          return (
            <div key={ex.id} className="rounded-3xl p-5 card-hover border-2"
              style={{ background: colors.bg, borderColor: colors.border }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ex.emoji}</span>
                  <div>
                    <h3 className="font-black text-base">{ex.title}</h3>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{ex.category} · {ex.duration}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl text-white"
                  style={{ background: colors.accent }}>{ex.sound}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-semibold">{ex.description}</p>
              <div className="flex items-center gap-2">
                {ex.hasVideo ? (
                  <button onClick={() => setActiveVideo(ex.title)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: colors.accent }}>
                    ▶ Смотреть
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 border-dashed text-sm font-bold transition-colors hover:opacity-70"
                    style={{ borderColor: colors.accent, color: colors.accent }}>
                    <Icon name="Upload" size={14} />
                    Добавить видео
                  </button>
                )}
                <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 text-sm font-bold transition-all hover:opacity-80"
                  style={{ borderColor: colors.border, color: colors.accent }}>
                  <Icon name="Send" size={13} />
                  Задать
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {activeVideo && <VideoModal title={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}
