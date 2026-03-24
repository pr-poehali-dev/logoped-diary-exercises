import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const EXERCISES = [
  { id: 1, title: "Лошадка", category: "Язык", difficulty: "Начальный", duration: "3 мин", hasVideo: true, sound: "Р, Д", description: "Щёлкать языком, имитируя цокот копыт. Укрепляет мышцы языка." },
  { id: 2, title: "Иголочка", category: "Язык", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "С, З", description: "Высунуть узкий и острый язык, удерживать 5 секунд." },
  { id: 3, title: "Грибок", category: "Язык", difficulty: "Средний", duration: "4 мин", hasVideo: true, sound: "Р", description: "Присосать язык к нёбу, широко открыть рот — форма гриба." },
  { id: 4, title: "Заборчик", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: false, sound: "И, Е", description: "Улыбнуться, показать сжатые зубы — верхние на нижних." },
  { id: 5, title: "Хоботок", category: "Губы", difficulty: "Начальный", duration: "2 мин", hasVideo: true, sound: "У, О", description: "Вытянуть губы трубочкой, удерживать 5–7 секунд." },
  { id: 6, title: "Качели", category: "Язык", difficulty: "Средний", duration: "3 мин", hasVideo: false, sound: "Л, Н", description: "Поднимать и опускать язык — к верхним и нижним зубам." },
];

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
