// ---------- Botão de tema (claro/escuro) ----------

const raiz = document.documentElement;          // a tag <html>, onde guardamos o tema
const botao = document.getElementById("tema");  // o botão "Modo claro / Modo escuro"

// Ao abrir o site, lê o tema que a pessoa escolheu da última vez (se houver)
try {
  const salvo = localStorage.getItem("tema");
  if (salvo) raiz.dataset.tema = salvo;
} catch (e) {}

// Diz se o site está no modo claro agora
// (ou a escolha salva, ou o tema do aparelho quando ainda não escolheu)
function estaClaro() {
  return raiz.dataset.tema === "claro" ||
    (!raiz.dataset.tema && matchMedia("(prefers-color-scheme: light)").matches);
}

// Escreve no botão o modo para o qual ele vai trocar
function atualizarBotao() {
  botao.textContent = estaClaro() ? "Modo escuro" : "Modo claro";
}

// Ao clicar: troca o tema, salva a escolha e atualiza o texto do botão
botao.addEventListener("click", () => {
  const novo = estaClaro() ? "escuro" : "claro";
  raiz.dataset.tema = novo;
  try { localStorage.setItem("tema", novo); } catch (e) {}
  atualizarBotao();
});

atualizarBotao();

// ---------- Animação: os elementos deslizam da esquerda ao aparecer na tela ----------

// Só anima se a pessoa não pediu "reduzir movimento" no sistema
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {

  // Lista de tudo que vai ser animado (títulos, textos, caixas, botões...)
  const alvos = document.querySelectorAll(
    "#home > *, section > h2, .sub, .texto, .lista-skills, .trilha > div, .card, .chamada, #contato .botoes, footer"
  );

  // O "observador" avisa quando um elemento entra ou sai da tela
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      // Entrou na tela: adiciona a classe "visivel" (o CSS faz o deslize).
      // Saiu da tela: tira a classe, e o elemento some até voltar.
      e.target.classList.toggle("visivel", e.isIntersecting);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  alvos.forEach((el, i) => {
    el.classList.add("reveal");   // começa escondido, deslocado para a esquerda
    // No topo e nas caixas de Experiência/Formação, um pequeno atraso entre os itens
    if (el.matches("#home > *, .trilha > div")) {
      el.style.transitionDelay = ((i % 4) * 70) + "ms";
    }
    obs.observe(el);              // começa a vigiar este elemento
  });
}
