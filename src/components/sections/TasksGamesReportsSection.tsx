import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TASKS_DATA = [
  { id: 1, patient: "Михайлов Артём", task: "Упражнение «Лошадка» — 10 раз утром и вечером", deadline: "до 27 марта", done: false, type: "exercise", emoji: "🐴" },
  { id: 2, patient: "Соколова Вика", task: "Произносить слоги СА-СО-СУ перед зеркалом", deadline: "до 26 марта", done: false, type: "homework", emoji: "🪞" },
  { id: 3, patient: "Новиков Дима", task: "Читать скороговорки со звуком Р — 3 раза в день", deadline: "до 28 марта", done: true, type: "reading", emoji: "📖" },
  { id: 4, patient: "Петрова Алина", task: "Игра «Угадай звук» с родителями — 15 минут", deadline: "до 26 марта", done: false, type: "game", emoji: "🎮" },
  { id: 5, patient: "Михайлов Артём", task: "Посмотреть видео «Иголочка» и повторить", deadline: "до 25 марта", done: true, type: "video", emoji: "🎬" },
];

const GAMES = [
  { id: 1, title: "Угадай звук", icon: "🎵", age: "4–7 лет", type: "Слуховое восприятие", players: "1–2", description: "Логопед произносит слова — ребёнок определяет, есть ли заданный звук. Развивает фонематический слух.", color: "hsl(280 70% 96%)", border: "hsl(280 60% 88%)" },
  { id: 2, title: "Звуковая рыбалка", icon: "🎣", age: "5–8 лет", type: "Автоматизация", players: "1–4", description: "Карточки-рыбки с картинками. Ребёнок «ловит» рыбку и называет слово с нужным звуком.", color: "hsl(200 80% 95%)", border: "hsl(200 60% 84%)" },
  { id: 3, title: "Логопедическое лото", icon: "🃏", age: "5–9 лет", type: "Дифференциация", players: "2–6", description: "Классическое лото с картинками. Ведущий называет слово — игроки ищут на своих карточках.", color: "hsl(48 100% 94%)", border: "hsl(48 80% 82%)" },
  { id: 4, title: "Сложи слово", icon: "🧩", age: "6–9 лет", type: "Слоговая структура", players: "1–2", description: "Карточки со слогами. Ребёнок составляет слова, тренируя слоговую структуру речи.", color: "hsl(160 60% 94%)", border: "hsl(160 50% 82%)" },
  { id: 5, title: "Зеркальный артикул", icon: "🪞", age: "4–6 лет", type: "Артикуляция", players: "1", description: "Ребёнок повторяет артикуляционные движения за логопедом, глядя в зеркало.", color: "hsl(340 70% 96%)", border: "hsl(340 60% 86%)" },
  { id: 6, title: "Скороговорки-соревнование", icon: "🏆", age: "7–12 лет", type: "Автоматизация", players: "2+", description: "Кто быстрее и чище произнесёт скороговорку? Развивает автоматизм произношения.", color: "hsl(24 100% 96%)", border: "hsl(24 80% 84%)" },
];

export function TasksSection() {
  const [tasks, setTasks] = useState(TASKS_DATA);
  const toggle = (id: number) => setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Badge className="font-bold rounded-xl px-3 py-1" style={{ background: "hsl(280 70% 92%)", color: "hsl(280 70% 45%)" }}>
            ⏳ {tasks.filter(t => !t.done).length} активных
          </Badge>
          <Badge variant="outline" className="font-bold rounded-xl px-3 py-1">
            ✅ {tasks.filter(t => t.done).length} выполнено
          </Badge>
        </div>
        <Button size="sm" className="gap-2 rounded-2xl font-bold text-white border-0"
          style={{ background: "hsl(280 70% 58%)" }}>
          <Icon name="Plus" size={15} />
          Новое задание
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id}
            className={`bg-white rounded-3xl px-5 py-4 flex items-start gap-4 border-2 transition-all ${task.done ? "opacity-60" : "card-hover"}`}
            style={{ borderColor: task.done ? "hsl(45 40% 88%)" : "hsl(45 40% 88%)" }}>
            <button onClick={() => toggle(task.id)}
              className="mt-0.5 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all text-white font-black"
              style={task.done
                ? { background: "hsl(140 60% 48%)", borderColor: "hsl(140 60% 48%)" }
                : { background: "white", borderColor: "hsl(45 40% 80%)" }}>
              {task.done && "✓"}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black" style={{ color: "hsl(280 70% 52%)" }}>{task.patient}</span>
                <span className="w-1 h-1 rounded-full bg-border inline-block" />
                <span className="text-xs font-semibold text-muted-foreground">{task.deadline}</span>
              </div>
              <p className={`text-sm font-semibold ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.task}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "hsl(280 70% 96%)" }}>
              {task.emoji}
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
        <p className="text-sm font-bold text-muted-foreground">🎲 Весёлые игры для развития речи</p>
        <Button size="sm" className="gap-2 rounded-2xl font-bold text-white border-0"
          style={{ background: "hsl(280 70% 58%)" }}>
          <Icon name="Plus" size={15} />
          Добавить игру
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {GAMES.map(game => (
          <div key={game.id} className="rounded-3xl p-5 card-hover cursor-pointer border-2"
            style={{ background: game.color, borderColor: game.border }}>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-4xl leading-none">{game.icon}</span>
              <div>
                <h3 className="font-black text-base">{game.title}</h3>
                <p className="text-xs font-bold text-muted-foreground mt-0.5">{game.type}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-muted-foreground leading-relaxed mb-4">{game.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                <span>👶 {game.age}</span>
                <span>👥 {game.players}</span>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl text-white transition-all hover:opacity-80"
                style={{ background: "hsl(280 70% 58%)" }}>
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
        <div className="bg-white rounded-3xl p-6 border-2" style={{ borderColor: "hsl(45 40% 86%)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">✨</span>
            <h3 className="font-black text-lg">Создать отчёт</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Отчёт по пациенту", icon: "User", emoji: "👶", desc: "Прогресс, упражнения, посещаемость", bg: "hsl(280 70% 96%)" },
              { label: "Сводный за месяц", icon: "Calendar", emoji: "📅", desc: "Все пациенты за выбранный период", bg: "hsl(48 100% 94%)" },
              { label: "Задания для родителей", icon: "Home", emoji: "🏠", desc: "Список домашних заданий в PDF", bg: "hsl(160 60% 94%)" },
              { label: "Статистика по звукам", icon: "BarChart2", emoji: "📊", desc: "Какие звуки отрабатываются чаще", bg: "hsl(200 80% 94%)" },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl border-2 transition-all text-left hover:scale-[1.01]"
                style={{ background: item.bg, borderColor: "transparent" }}>
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-black">{item.label}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border-2" style={{ borderColor: "hsl(45 40% 86%)" }}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">📁</span>
            <h3 className="font-black text-lg">Последние отчёты</h3>
          </div>
          <div className="space-y-1">
            {[
              { name: "Михайлов Артём — февраль", date: "1 марта 2026", type: "Индивидуальный", emoji: "🐻" },
              { name: "Соколова Вика — февраль", date: "1 марта 2026", type: "Индивидуальный", emoji: "🐰" },
              { name: "Сводный — февраль 2026", date: "2 марта 2026", type: "Ежемесячный", emoji: "📅" },
              { name: "Задания для родителей", date: "15 марта 2026", type: "Домашние задания", emoji: "🏠" },
            ].map(r => (
              <div key={r.name} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: "hsl(280 70% 96%)" }}>
                  {r.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">{r.name}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{r.date} · {r.type}</p>
                </div>
                <button className="flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl text-white"
                  style={{ background: "hsl(280 70% 58%)" }}>
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
