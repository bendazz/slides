(function() {
  // ----- Data (placeholder content we will expand together) -----
  const slides = [
    {
      title: "Linear Equation → NN Notation",
      html: "<p><strong>Line:</strong> f(x) = ax + b</p><p><em>Interpretation:</em> a is the <strong>slope</strong> (rate of change), b is the <strong>intercept</strong> (value when x = 0).</p><p><strong>NN notation:</strong> <span class=\"yhat\">Y</span> = wX + b</p><ul><li>a ↔ w (weight)</li><li>x ↔ X (input)</li><li>b ↔ b (bias)</li></ul><p>This connects a familiar linear function to the form used for a single neuron with a linear activation.</p><figure class=\"nn-diagram\"><svg viewBox=\"0 0 360 120\" aria-label=\"single input neuron diagram with bias\" role=\"img\"><circle cx=\"60\" cy=\"70\" r=\"28\" class=\"node\"></circle><text x=\"60\" y=\"75\" text-anchor=\"middle\" class=\"node-label\">X</text><circle cx=\"300\" cy=\"70\" r=\"28\" class=\"node\"></circle><text x=\"294\" y=\"75\" text-anchor=\"start\" class=\"node-label\">Y</text><path d=\"M 294 64 L 300 60 L 306 64\" class=\"hat\"/><line x1=\"88\" y1=\"70\" x2=\"272\" y2=\"70\" class=\"edge\"></line><text x=\"180\" y=\"62\" text-anchor=\"middle\" class=\"edge-label\">w</text><line x1=\"300\" y1=\"20\" x2=\"300\" y2=\"42\" class=\"edge bias-edge\"></line><text x=\"300\" y=\"12\" text-anchor=\"middle\" class=\"edge-label\">b</text></svg><figcaption>Computation: <span class=\"yhat\">Y</span> = wX + b. First, X is multiplied by w; then b is added at the output to produce <span class=\"yhat\">Y</span>.</figcaption></figure>"
    },
    {
      title: "Worked Example: Yhat = wX + b",
      html: "<figure class=\"nn-diagram\"><svg viewBox=\"0 0 360 140\" aria-label=\"worked example with numeric labels only\" role=\"img\"><circle cx=\"60\" cy=\"85\" r=\"28\" class=\"node\"></circle><text x=\"60\" y=\"90\" text-anchor=\"middle\" class=\"node-label\">2</text><circle cx=\"300\" cy=\"85\" r=\"28\" class=\"node\"></circle><text x=\"300\" y=\"90\" text-anchor=\"middle\" class=\"node-label\">2</text><line x1=\"88\" y1=\"85\" x2=\"272\" y2=\"85\" class=\"edge\"></line><text x=\"180\" y=\"77\" text-anchor=\"middle\" class=\"edge-label\">0.5</text><line x1=\"300\" y1=\"26\" x2=\"300\" y2=\"58\" class=\"edge bias-edge\"></line><text x=\"300\" y=\"18\" text-anchor=\"middle\" class=\"edge-label\">1</text></svg><figcaption><ul><li><strong>X (input):</strong> 2</li><li><strong>w (weight):</strong> 0.5</li><li><strong>b (bias):</strong> 1</li><li><strong>output:</strong> 2</li></ul></figcaption></figure>"
    },
    {
      title: "Neuron Model",
      html: "<p>A neuron computes z = W·x + b and y = σ(z). Here, W are weights, x inputs, b bias, and σ an activation (e.g., ReLU, sigmoid).</p>"
    },
    {
      title: "Activation Functions",
      html: "<ul><li>ReLU: max(0, z)</li><li>Sigmoid: 1 / (1 + e^{-z})</li><li>Tanh: (e^{z} - e^{-z}) / (e^{z} + e^{-z})</li></ul>"
    },
    {
      title: "Network Architecture",
      html: "<p>Feed-forward networks stack layers. Each layer transforms its input into output by applying weights, bias, and activation.</p>"
    },
    {
      title: "Loss & Training",
      html: "<p>Loss measures error (e.g., MSE, cross-entropy). Training adjusts parameters via gradient descent and backpropagation.</p>"
    }
  ];

  const problems = [
    {
      title: "Neuron Computation",
      question: "Given x = [1, 2], W = [0.5, -1], b = 1, compute z = W·x + b",
      choices: [
        { text: "-0.5", correct: true },
        { text: "0", correct: false },
        { text: "0.5", correct: false },
        { text: "2.5", correct: false }
      ],
      explanation: "z = 0.5*1 + (-1)*2 + 1 = -0.5"
    },
    {
      title: "Activation Concept",
      question: "Which activation outputs values strictly between 0 and 1?",
      choices: [
        { text: "ReLU", correct: false },
        { text: "Sigmoid", correct: true },
        { text: "Tanh", correct: false },
        { text: "Linear", correct: false }
      ],
      explanation: "Sigmoid maps any input to (0, 1)."
    }
  ];

  // ----- State -----
  let slideIndex = Number(localStorage.getItem("slideIndex") || 0);
  let problemIndex = Number(localStorage.getItem("problemIndex") || 0);
  let selectedChoiceIdx = null;

  // ----- Elements -----
  const tabSlides = document.getElementById("tab-slides");
  const tabPractice = document.getElementById("tab-practice");
  const viewSlides = document.getElementById("view-slides");
  const viewPractice = document.getElementById("view-practice");

  const slideTitleEl = document.getElementById("slide-title");
  const slideContentEl = document.getElementById("slide-content");
  const slideProgressEl = document.getElementById("slide-progress");
  const prevSlideBtn = document.getElementById("prev-slide");
  const nextSlideBtn = document.getElementById("next-slide");

  const problemTitleEl = document.getElementById("problem-title");
  const problemQuestionEl = document.getElementById("problem-question");
  const problemChoicesEl = document.getElementById("problem-choices");
  const submitAnswerBtn = document.getElementById("submit-answer");
  const nextProblemBtn = document.getElementById("next-problem");
  const feedbackEl = document.getElementById("feedback");

  // ----- View Switching -----
  function setActiveTab(view) {
    const isSlides = view === "slides";
    tabSlides.classList.toggle("active", isSlides);
    tabPractice.classList.toggle("active", !isSlides);
    viewSlides.classList.toggle("hidden", !isSlides);
    viewPractice.classList.toggle("hidden", isSlides);
  }

  tabSlides.addEventListener("click", () => setActiveTab("slides"));
  tabPractice.addEventListener("click", () => setActiveTab("practice"));

  // ----- Slides -----
  function clampSlideIndex(idx) {
    return Math.max(0, Math.min(idx, slides.length - 1));
  }

  function renderSlide() {
    slideIndex = clampSlideIndex(slideIndex);
    const s = slides[slideIndex];
    slideTitleEl.textContent = s.title;
    slideContentEl.innerHTML = s.html;
    slideProgressEl.textContent = `Slide ${slideIndex + 1} of ${slides.length}`;
    prevSlideBtn.disabled = slideIndex === 0;
    nextSlideBtn.disabled = slideIndex === slides.length - 1;
    localStorage.setItem("slideIndex", String(slideIndex));
  }
  // Slide navigation buttons
  prevSlideBtn.addEventListener("click", () => { slideIndex--; renderSlide(); });
  nextSlideBtn.addEventListener("click", () => { slideIndex++; renderSlide(); });
  window.addEventListener("keydown", (e) => {
    if (!viewSlides.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") { prevSlideBtn.click(); }
      if (e.key === "ArrowRight") { nextSlideBtn.click(); }
    }
  });

  // ----- Practice Problems -----
  function clampProblemIndex(idx) {
    return Math.max(0, Math.min(idx, problems.length - 1));
  }

  function renderProblem() {
    problemIndex = clampProblemIndex(problemIndex);
    selectedChoiceIdx = null;
    const p = problems[problemIndex];

    problemTitleEl.textContent = p.title;
    problemQuestionEl.textContent = p.question;
    feedbackEl.textContent = "";
    submitAnswerBtn.disabled = true;
    nextProblemBtn.classList.add("hidden");

    problemChoicesEl.innerHTML = "";
    p.choices.forEach((choice, idx) => {
      const li = document.createElement("li");
      li.className = "choice";
      li.textContent = choice.text;
      li.tabIndex = 0;
      li.addEventListener("click", () => selectChoice(idx));
      li.addEventListener("keydown", (e) => { if (e.key === "Enter") selectChoice(idx); });
      problemChoicesEl.appendChild(li);
    });

    // Plain text rendering; no math engine.

    localStorage.setItem("problemIndex", String(problemIndex));
  }

  function selectChoice(idx) {
    selectedChoiceIdx = idx;
    Array.from(problemChoicesEl.children).forEach((el, i) => {
      el.classList.toggle("selected", i === idx);
    });
    submitAnswerBtn.disabled = false;
  }

  submitAnswerBtn.addEventListener("click", () => {
    const p = problems[problemIndex];
    const correct = p.choices[selectedChoiceIdx]?.correct === true;

    Array.from(problemChoicesEl.children).forEach((el, i) => {
      const isCorrect = p.choices[i].correct;
      el.classList.remove("selected");
      el.classList.add(isCorrect ? "correct" : (i === selectedChoiceIdx ? "incorrect" : ""));
    });

    feedbackEl.textContent = correct ? "Correct!" : "Not quite. " + p.explanation;
    if (correct) {
      feedbackEl.textContent = "Correct! " + p.explanation;
    }

    submitAnswerBtn.disabled = true;
    nextProblemBtn.classList.remove("hidden");
  });

  nextProblemBtn.addEventListener("click", () => {
    problemIndex++;
    renderProblem();
  });

  // ----- Init -----
  setActiveTab("slides");
  renderSlide();
  renderProblem();
})();
