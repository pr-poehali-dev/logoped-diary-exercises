import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export function TasksSection() {
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

export function GamesSection() {
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

export function ReportsSection() {
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
