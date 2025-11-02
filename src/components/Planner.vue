<template>
  <div class="container">
    <header>
      <div>
        <h1>Planner Fit</h1>
        <p class="lead">
          Treinos: 06:30 (Seg–Sex) • Cardio sábado (tarde/noite)
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center">
        <button @click="exportJSON" class="btn">Exportar JSON</button>
      </div>
    </header>

    <main class="grid">
      <!-- Alimentação -->
      <section class="card">
        <strong>Resumo Diário • 1800 kcal</strong>
        <p class="muted">Macros: Proteína 150g • Carbo 160g • Gordura 60g</p>
        <hr style="border-color: rgba(255, 255, 255, 0.04); margin: 10px 0" />

        <div v-for="meal in meals" :key="meal.id" class="meal">
          <div>
            <strong>{{ meal.title }}</strong>
            <div class="small">{{ meal.items.join(" • ") }}</div>
          </div>
          <div style="text-align: right">
            <div class="macros">
              P {{ meal.P }}g • C {{ meal.C }}g • F {{ meal.F }}g
            </div>
            <div class="small">{{ meal.kcal }} kcal</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap">
          <button class="btn" @click="setMode('base')">Base</button>
          <button class="btn" @click="setMode('fat-loss')">Acelerar</button>
          <button class="btn" @click="setMode('mass')">Massa Magra</button>
        </div>
      </section>

      <!-- Treinos -->
      <section class="card">
        <strong>Treino Semanal</strong>
        <p class="muted">6x/semana — 06:30 (Seg–Sex) • Sábado: Cardio leve</p>
        <div class="workout" style="margin-top: 8px">
          <div v-for="(w, i) in workoutPlan" :key="i">
            <strong>{{ w.day }} — {{ w.title }}</strong>
            <div class="small" style="margin-bottom: 6px">
              Cardio: {{ w.cardio }}
            </div>
            <div v-for="ex in w.ex" :key="ex" class="ex">
              <div>{{ ex }}</div>
            </div>
          </div>
        </div>
        <div style="margin-top: 8px" class="small">
          Whey: <strong>30g</strong> pós-treino • Creatina:
          <strong>5g/dia</strong> (3g pré + 2g pós)
        </div>
      </section>

      <!-- Suplementos e checklist -->
      <section class="card">
        <strong>Suplementação & Checklist</strong>
        <ul class="muted" style="margin: 8px 0; padding-left: 18px">
          <li><strong>05:45</strong> — Creatina 5g (pré)</li>
          <li><strong>07:45</strong> — Whey 30g (pós)</li>
          <li>2,5–3L água/dia • Albumina à noite (opcional)</li>
        </ul>

        <div style="margin-top: 8px">
          <label v-for="(v, key) in checks" :key="key" class="checkbox">
            <input type="checkbox" :v-model="v" /> {{ labels[key] }}
          </label>
        </div>
      </section>
    </main>

    <footer class="small">Planner Fitness PWA • Vue 3</footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface Meal {
  id: string;
  title: string;
  items: string[];
  P: number;
  C: number;
  F: number;
  kcal: number;
}

const meals = reactive<Meal[]>([
  {
    id: "pre",
    title: "05:45 — Pré-treino",
    items: ["1 banana", "15g aveia", "café preto", "Creatina 3–5g"],
    P: 4,
    C: 30,
    F: 1,
    kcal: 4 * 4 + 30 * 4 + 1 * 9,
  },
  {
    id: "post",
    title: "07:45 — Pós-treino",
    items: ["Whey 30g", "1 banana"],
    P: 30,
    C: 25,
    F: 2,
    kcal: 30 * 4 + 25 * 4 + 2 * 9,
  },
  {
    id: "lunch",
    title: "12:30 — Almoço",
    items: [
      "150g frango",
      "100g arroz integral",
      "80g feijão",
      "salada",
      "azeite 1c.sopa",
    ],
    P: 45,
    C: 45,
    F: 12,
    kcal: 45 * 4 + 45 * 4 + 12 * 9,
  },
  {
    id: "snack",
    title: "15:30 — Lanche",
    items: ["Iogurte 150g", "15g aveia", "10g castanhas"],
    P: 14,
    C: 22,
    F: 10,
    kcal: 14 * 4 + 22 * 4 + 10 * 9,
  },
  {
    id: "dinner",
    title: "19:00 — Jantar",
    items: ["150g peixe", "100g batata doce", "legumes", "azeite 1c.sopa"],
    P: 35,
    C: 25,
    F: 12,
    kcal: 35 * 4 + 25 * 4 + 12 * 9,
  },
  {
    id: "ceia",
    title: "22:00 — Ceia",
    items: ["150g iogurte", "1c.chia"],
    P: 12,
    C: 6,
    F: 4,
    kcal: 12 * 4 + 6 * 4 + 4 * 9,
  },
]);

const workoutPlan = [
  {
    day: "Segunda",
    title: "Peito e Tríceps",
    cardio: "15min esteira inclinada",
    ex: [
      "Supino reto — 4x10",
      "Supino inclinado — 4x12",
      "Crucifixo máquina — 3x15",
      "Tríceps corda — 3x12",
      "Tríceps testa — 3x10",
    ],
  },
  {
    day: "Terça",
    title: "Pernas A (quadríceps)",
    cardio: "—",
    ex: [
      "Agachamento — 4x10",
      "Leg Press — 4x12",
      "Cadeira extensora — 3x12",
      "Cadeira abdutora — 3x15",
      "Panturrilha — 4x20",
    ],
  },
  {
    day: "Quarta",
    title: "Costas e Bíceps",
    cardio: "25min bike",
    ex: [
      "Puxada frente — 4x10",
      "Remada baixa — 4x12",
      "Remada unilateral — 3x12",
      "Rosca direta — 3x10",
      "Rosca alternada — 3x12",
    ],
  },
  {
    day: "Quinta",
    title: "Ombros e Abdômen",
    cardio: "—",
    ex: [
      "Desenvolvimento halteres — 4x10",
      "Elevação lateral — 3x12",
      "Elevação frontal — 3x12",
      "Remada alta — 3x10",
      "Prancha — 3x1min",
    ],
  },
  {
    day: "Sexta",
    title: "Pernas B (posterior)",
    cardio: "—",
    ex: [
      "Stiff — 4x10",
      "Cadeira flexora — 4x12",
      "Agachamento sumô — 3x12",
      "Glúteo máquina — 3x12",
      "Panturrilha sentado — 4x15",
    ],
  },
  {
    day: "Sábado",
    title: "Cardio leve",
    cardio: "40–50min caminhada/bike",
    ex: ["Atividade leve, sem sobrecarga"],
  },
];

const checks = reactive({
  pre: false,
  work: false,
  whey: false,
  alim: false,
  crea: false,
  sono: false,
});

const labels: Record<string, string> = {
  pre: "Pré-treino tomado",
  work: "Treino concluído",
  whey: "Whey pós-treino",
  alim: "Almoço consumido",
  crea: "Creatina (dia)",
  sono: "Sono 7–8h",
};

function exportJSON() {
  const payload = { meals, workoutPlan };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "planner.json";
  a.click();
  URL.revokeObjectURL(url);
}

function setMode(mode: string) {
  if (mode === "fat-loss") {
    meals.forEach((m) => (m.C = Math.round(m.C * 0.9)));
    alert("Modo Acelerar Emagrecimento ativado!");
  } else if (mode === "mass") {
    meals.forEach((m) => (m.P += Math.round(m.P * 0.08)));
    alert("Modo Massa Magra ativado!");
  } else {
    location.reload();
  }
}
</script>

<style scoped>
:root {
  --bg: #07101a;
  --card: #0e1722;
  --muted: #9aa6b2;
  --accent: #2dd4bf;
  --accent2: #60a5fa;
  --text: #e6eef6;
}
.container {
  max-width: 920px;
  margin: 14px auto;
  padding: 14px;
  background: linear-gradient(180deg, #041019 0%, #071220 100%);
  color: var(--text);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
h1 {
  font-size: 18px;
  margin: 0;
}
.lead {
  color: var(--muted);
  font-size: 13px;
  margin: 0;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 12px;
}
.card {
  background: linear-gradient(180deg, var(--card), #081021);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.6);
}
.muted {
  color: var(--muted);
  font-size: 13px;
}
.macros {
  font-family: monospace;
  color: var(--accent);
  font-size: 13px;
}
.btn {
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  padding: 8px 10px;
  border-radius: 8px;
  color: #042024;
  font-weight: 700;
  border: 0;
  cursor: pointer;
}
.small {
  font-size: 13px;
  color: var(--muted);
}
.meal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  margin-bottom: 8px;
}
.checkbox {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
footer {
  margin-top: 14px;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}
@media (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
