async function loadWeeklyTopic() {
  try {
    // Tambahkan timestamp agar browser selalu mengambil data terbaru
    const res = await fetch(`topics.json?t=${new Date().getTime()}`);
    const data = await res.json();

    document.getElementById("week-badge").textContent = `Week ${data.week} • ${data.category}`;
    document.getElementById("updated-date").textContent = `Last updated: ${data.updated_at}`;

    // Grammar
    document.getElementById("grammar-title").textContent = data.grammar.title;
    document.getElementById("grammar-explanation").textContent = data.grammar.explanation;
    document.getElementById("grammar-example").textContent = data.grammar.example;

    // Vocabulary
    const vocabContainer = document.getElementById("vocab-list");
    vocabContainer.innerHTML = "";
    data.vocabulary.forEach(item => {
      const div = document.createElement("div");
      div.className = "vocab-item";
      div.innerHTML = `
        <div class="vocab-word">${item.word}</div>
        <div class="vocab-meaning">${item.meaning}</div>
        <div class="vocab-sentence">"${item.sentence}"</div>
      `;
      vocabContainer.appendChild(div);
    });

    // Speaking Prompt
    document.getElementById("speaking-prompt").textContent = data.speaking_prompt;

    // Quiz
    document.getElementById("quiz-question").textContent = data.quiz.question;
    const optionsContainer = document.getElementById("quiz-options");
    const feedback = document.getElementById("quiz-feedback");
    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    data.quiz.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.onclick = () => {
        if (idx === data.quiz.answer_index) {
          feedback.style.color = "#15803d";
          feedback.textContent = "✅ Correct! " + data.quiz.rationale;
        } else {
          feedback.style.color = "#b91c1c";
          feedback.textContent = "❌ Incorrect. " + data.quiz.rationale;
        }
      };
      optionsContainer.appendChild(btn);
    });
  } catch (err) {
    console.error("Failed to load topic:", err);
  }
}

loadWeeklyTopic();
