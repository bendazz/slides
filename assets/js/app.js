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
      title: "PyTorch: Single Neuron",
      html: "<p>This mirrors the calculation using PyTorch (floats, column vectors, matrix multiply).</p><pre><code>import torch\n\n# Use floats.  Instead of inputting 2, use 2.0, for example.\n\nX = torch.tensor([\n    [2.0]\n])\n\nw = torch.tensor([\n    [0.5]\n])\n\nb = torch.tensor([\n    [1.0]\n])\n\nYhat = X @ w + b\n</code></pre>"
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

  // Named problem sets
  const problemSets = {
    "Basics: Yhat": [
    {
      title: "Ex. 1",
      question: "Given X = 2, w = 0.5, b = 1, compute Yhat = wX + b",
      choices: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "2.5", correct: false },
        { text: "3", correct: false }
      ],
      explanation: "Yhat = 0.5*2 + 1 = 2"
    },
    {
      title: "Ex. 2",
      question: "Given X = -3, w = -2, b = 1, compute Yhat = wX + b",
      choices: [
        { text: "-7", correct: false },
        { text: "5", correct: false },
        { text: "7", correct: true },
        { text: "-5", correct: false }
      ],
      explanation: "Yhat = (-2)*(-3) + 1 = 6 + 1 = 7"
    },
    {
      title: "Ex. 3",
      question: "Given X = 0, w = 3.5, b = -1, compute Yhat = wX + b",
      choices: [
        { text: "-1", correct: true },
        { text: "0", correct: false },
        { text: "1", correct: false },
        { text: "3.5", correct: false }
      ],
      explanation: "Yhat = 3.5*0 + (-1) = -1"
    },
    {
      title: "Ex. 4",
      question: "Given X = 4, w = 1.25, b = 0, compute Yhat = wX + b",
      choices: [
        { text: "4", correct: false },
        { text: "5", correct: true },
        { text: "6", correct: false },
        { text: "5.25", correct: false }
      ],
      explanation: "Yhat = 1.25*4 + 0 = 5"
    },
    {
      title: "Ex. 5",
      question: "Given X = 1.5, w = -2, b = 0.5, compute Yhat = wX + b",
      choices: [
        { text: "-2.5", correct: false },
        { text: "-2", correct: false },
        { text: "-2.5 + 0.5 = -2?", correct: false },
        { text: "-2.5", correct: true }
      ],
      explanation: "Yhat = (-2)*1.5 + 0.5 = -3 + 0.5 = -2.5"
    },
    {
      title: "Ex. 6",
      question: "Given X = -0.5, w = 4, b = -1, compute Yhat = wX + b",
      choices: [
        { text: "-3", correct: true },
        { text: "-1", correct: false },
        { text: "1", correct: false },
        { text: "-2", correct: false }
      ],
      explanation: "Yhat = 4*(-0.5) + (-1) = -2 - 1 = -3"
    }
    ]
    ,
    "Two Samples: Yhat": [
      {
        title: "Ex. 1",
        question: "Given two samples X1 = 2, X2 = 4, with w = 0.5 and b = 1, compute Yhat for each sample (Yhat = wX + b)",
        explanation: "Sample 1: Yhat1 = 0.5*2 + 1 = 2; Sample 2: Yhat2 = 0.5*4 + 1 = 3"
      },
      {
        title: "Ex. 2",
        question: "Given two samples X1 = -3, X2 = 4, with w = -2 and b = 1, compute Yhat for each sample",
        explanation: "Sample 1: Yhat1 = (-2)*(-3) + 1 = 7; Sample 2: Yhat2 = (-2)*4 + 1 = -7"
      },
      {
        title: "Ex. 3",
        question: "Given two samples X1 = 0.5, X2 = -1.5, with w = 3 and b = 0, compute Yhat for each sample",
        explanation: "Sample 1: Yhat1 = 3*0.5 + 0 = 1.5; Sample 2: Yhat2 = 3*(-1.5) + 0 = -4.5"
      },
      {
        title: "Ex. 4",
        question: "Given two samples X1 = 0, X2 = 0, with w = 3.5 and b = 2, compute Yhat for each sample",
        explanation: "Sample 1: Yhat1 = 3.5*0 + 2 = 2; Sample 2: Yhat2 = 3.5*0 + 2 = 2"
      },
      {
        title: "Ex. 5",
        question: "Given two samples X1 = 4, X2 = 1, with w = 1.25 and b = -2, compute Yhat for each sample",
        explanation: "Sample 1: Yhat1 = 1.25*4 - 2 = 3; Sample 2: Yhat2 = 1.25*1 - 2 = -0.75"
      }
    ]
  };

  // ----- State -----
  let slideIndex = Number(localStorage.getItem("slideIndex") || 0);
  let currentProblemSet = localStorage.getItem("problemSet") || Object.keys(problemSets)[0];
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
  const exercisePickerEl = document.getElementById("exercise-picker");

  function getProblems() {
    return problemSets[currentProblemSet] || [];
  }

  function initExercisePicker() {
    const sets = Object.keys(problemSets);
    exercisePickerEl.innerHTML = "";
    sets.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      if (name === currentProblemSet) opt.selected = true;
      exercisePickerEl.appendChild(opt);
    });
    exercisePickerEl.addEventListener("change", () => {
      currentProblemSet = exercisePickerEl.value;
      localStorage.setItem("problemSet", currentProblemSet);
      problemIndex = 0;
      renderProblem();
    });
  }

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
    const arr = getProblems();
    return Math.max(0, Math.min(idx, arr.length - 1));
  }

  function renderProblem() {
    problemIndex = clampProblemIndex(problemIndex);
    selectedChoiceIdx = null;
    const arr = getProblems();
    const p = arr[problemIndex];

    problemTitleEl.textContent = `${currentProblemSet} — ${p.title}`;
    problemQuestionEl.textContent = p.question;
    feedbackEl.textContent = "";
    submitAnswerBtn.disabled = false;
    submitAnswerBtn.textContent = "Reveal Answer";
    nextProblemBtn.classList.add("hidden");
    nextProblemBtn.textContent = (problemIndex < arr.length - 1) ? "Next Problem" : "Restart Practice";

    // Hide choices; this section uses a reveal-only flow now.
    problemChoicesEl.innerHTML = "";
    problemChoicesEl.classList.add("hidden");

    // Plain text rendering; no math engine.

    localStorage.setItem("problemIndex", String(problemIndex));

    // Sync exercise picker selection
    exercisePickerEl.value = currentProblemSet;
  }

  // No choice selection in reveal-only mode

  submitAnswerBtn.addEventListener("click", () => {
    const p = getProblems()[problemIndex];
    feedbackEl.textContent = p.explanation;
    submitAnswerBtn.disabled = true;
    nextProblemBtn.classList.remove("hidden");
  });

  nextProblemBtn.addEventListener("click", () => {
    const arr = getProblems();
    if (problemIndex < arr.length - 1) {
      problemIndex++;
    } else {
      problemIndex = 0; // wrap to first
    }
    renderProblem();
  });

  // ----- Init -----
  setActiveTab("slides");
  renderSlide();
  initExercisePicker();
  renderProblem();
})();
