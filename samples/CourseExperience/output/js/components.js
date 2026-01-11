/**
 * Course Factory Interactive Components
 * Vanilla JS initialization for static HTML components
 * Based on src/components/static/component-registry.ts
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs
  document.querySelectorAll('.cf-tabs').forEach(function(container) {
    initializeTabs(container);
  });

  // Initialize accordions (cf-accordion style)
  document.querySelectorAll('.cf-accordion').forEach(function(container) {
    initializeAccordion(container);
  });

  // Initialize accordions (simple .accordion style)
  document.querySelectorAll('.accordion').forEach(function(container) {
    initializeSimpleAccordion(container);
  });

  // Initialize tabs (simple .tabs style)
  document.querySelectorAll('.tabs').forEach(function(container) {
    initializeSimpleTabs(container);
  });

  // Initialize flashcards
  document.querySelectorAll('.cf-flashcards').forEach(function(container) {
    initializeFlashcards(container);
  });

  // Initialize scenarios
  document.querySelectorAll('.cf-scenario').forEach(function(container) {
    initializeScenario(container);
  });

  // Initialize quizzes
  document.querySelectorAll('.cf-quiz').forEach(function(container) {
    initializeQuiz(container);
  });
});

/**
 * Tabs Component
 */
function initializeTabs(container) {
  var tabList = container.querySelector('.cf-tabs__list');
  var panels = container.querySelectorAll('.cf-tabs__panel');
  var tabs = container.querySelectorAll('.cf-tabs__tab');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var tabId = this.getAttribute('aria-controls').replace('tabpanel-', '');

      // Update tabs
      tabs.forEach(function(t) {
        var isActive = t === tab;
        t.classList.toggle('cf-tabs__tab--active', isActive);
        t.setAttribute('aria-selected', isActive);
        t.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Update panels
      panels.forEach(function(panel) {
        var panelId = panel.id.replace('tabpanel-', '');
        var isActive = panelId === tabId;
        panel.classList.toggle('cf-tabs__panel--active', isActive);
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    });

    // Keyboard navigation
    tab.addEventListener('keydown', function(e) {
      var tabsArray = Array.from(tabs);
      var currentIndex = tabsArray.indexOf(tab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var nextIndex = (currentIndex + 1) % tabsArray.length;
        tabsArray[nextIndex].focus();
        tabsArray[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prevIndex = (currentIndex - 1 + tabsArray.length) % tabsArray.length;
        tabsArray[prevIndex].focus();
        tabsArray[prevIndex].click();
      }
    });
  });
}

/**
 * Accordion Component
 */
function initializeAccordion(container) {
  var triggers = container.querySelectorAll('.cf-accordion__trigger');
  var allowMultiple = container.dataset.allowMultiple === 'true';

  triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var item = this.closest('.cf-accordion__item');
      var panel = item.querySelector('.cf-accordion__panel');
      var isOpen = item.classList.contains('cf-accordion__item--open');

      // Close others if not allowing multiple
      if (!allowMultiple && !isOpen) {
        container.querySelectorAll('.cf-accordion__item--open').forEach(function(openItem) {
          openItem.classList.remove('cf-accordion__item--open');
          openItem.querySelector('.cf-accordion__trigger').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.cf-accordion__panel').setAttribute('hidden', '');
        });
      }

      // Toggle state
      item.classList.toggle('cf-accordion__item--open');
      this.setAttribute('aria-expanded', !isOpen);

      if (isOpen) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
      }
    });
  });
}

/**
 * Simple Accordion Component
 * Handles .accordion, .accordion-item, .accordion-header, .accordion-content pattern
 */
function initializeSimpleAccordion(container) {
  var headers = container.querySelectorAll('.accordion-header');

  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      var item = this.closest('.accordion-item');
      var content = item.querySelector('.accordion-content');
      var icon = this.querySelector('.accordion-icon');
      var isOpen = this.getAttribute('aria-expanded') === 'true';

      // Toggle state
      this.setAttribute('aria-expanded', !isOpen);

      if (isOpen) {
        content.setAttribute('hidden', '');
        if (icon) icon.textContent = '+';
      } else {
        content.removeAttribute('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/**
 * Simple Tabs Component
 * Handles .tabs, .tab-list, .tab-button, .tab-panel pattern
 */
function initializeSimpleTabs(container) {
  var tabs = container.querySelectorAll('.tab-button');
  var panels = container.querySelectorAll('.tab-panel');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var panelId = this.getAttribute('aria-controls');

      // Update tabs
      tabs.forEach(function(t) {
        var isActive = t === tab;
        t.setAttribute('aria-selected', isActive);
        t.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Update panels
      panels.forEach(function(panel) {
        var isActive = panel.id === panelId;
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    });

    // Keyboard navigation
    tab.addEventListener('keydown', function(e) {
      var tabsArray = Array.from(tabs);
      var currentIndex = tabsArray.indexOf(tab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var nextIndex = (currentIndex + 1) % tabsArray.length;
        tabsArray[nextIndex].click();
        tabsArray[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prevIndex = (currentIndex - 1 + tabsArray.length) % tabsArray.length;
        tabsArray[prevIndex].click();
        tabsArray[prevIndex].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabsArray[0].click();
        tabsArray[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabsArray[tabsArray.length - 1].click();
        tabsArray[tabsArray.length - 1].focus();
      }
    });
  });
}

/**
 * Flashcards Component
 */
function initializeFlashcards(container) {
  var cards = container.querySelectorAll('.cf-flashcard');
  var currentIndex = 0;
  var total = cards.length;

  // Show only current card
  function showCard(index) {
    cards.forEach(function(card, i) {
      card.style.display = i === index ? 'block' : 'none';
      card.classList.remove('cf-flashcard--flipped');
    });
    updateCounter();
    updateButtons();
  }

  function updateCounter() {
    var counter = container.querySelector('.cf-flashcards__counter');
    if (counter) {
      counter.textContent = (currentIndex + 1) + ' / ' + total;
    }
    var progressFill = container.querySelector('.cf-flashcards__progress-fill');
    if (progressFill) {
      progressFill.style.width = ((currentIndex + 1) / total * 100) + '%';
    }
  }

  function updateButtons() {
    var prevBtn = container.querySelector('.cf-flashcards__btn--prev');
    var nextBtn = container.querySelector('.cf-flashcards__btn--next');
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= total - 1;
  }

  // Flip cards on click
  container.addEventListener('click', function(e) {
    var card = e.target.closest('.cf-flashcard');
    if (card) {
      card.classList.toggle('cf-flashcard--flipped');
    }

    var prevBtn = e.target.closest('.cf-flashcards__btn--prev');
    if (prevBtn && currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }

    var nextBtn = e.target.closest('.cf-flashcards__btn--next');
    if (nextBtn && currentIndex < total - 1) {
      currentIndex++;
      showCard(currentIndex);
    }

    var shuffleBtn = e.target.closest('.cf-flashcards__btn--shuffle');
    if (shuffleBtn) {
      shuffleCards();
    }
  });

  function shuffleCards() {
    var deck = container.querySelector('.cf-flashcards__deck');
    var cardsArray = Array.from(cards);
    for (var i = cardsArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      deck.insertBefore(cardsArray[j], cardsArray[i]);
      cardsArray.splice(j, 0, cardsArray.splice(i, 1)[0]);
    }
    cards = container.querySelectorAll('.cf-flashcard');
    currentIndex = 0;
    showCard(0);
  }

  // Keyboard navigation
  container.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var card = document.activeElement.closest('.cf-flashcard');
      if (card) {
        e.preventDefault();
        card.classList.toggle('cf-flashcard--flipped');
      }
    }
  });

  if (cards.length > 1) {
    showCard(0);
  }
}

/**
 * Scenario Component
 */
function initializeScenario(container) {
  var scenes = container.querySelectorAll('.cf-scenario__scene');
  var currentSceneId = container.dataset.startScene || (scenes[0] && scenes[0].dataset.sceneId);
  var history = [];

  function showScene(sceneId, addToHistory) {
    if (addToHistory !== false && currentSceneId) {
      history.push(currentSceneId);
    }

    scenes.forEach(function(scene) {
      scene.style.display = scene.dataset.sceneId === sceneId ? 'block' : 'none';
    });
    currentSceneId = sceneId;

    // Update back button visibility
    var backBtn = container.querySelector('.cf-scenario__back-btn');
    if (backBtn) {
      backBtn.style.display = history.length > 0 ? 'inline-block' : 'none';
    }

    // Update progress
    var progress = container.querySelector('.cf-scenario__progress');
    if (progress) {
      progress.textContent = 'Step ' + (history.length + 1);
    }
  }

  container.addEventListener('click', function(e) {
    var choice = e.target.closest('.cf-scenario__choice');
    if (choice) {
      var nextScene = choice.dataset.nextScene;
      var feedback = choice.dataset.feedback;

      // Show feedback if present
      if (feedback) {
        var currentScene = scenes[Array.from(scenes).findIndex(function(s) {
          return s.dataset.sceneId === currentSceneId;
        })];
        var feedbackEl = currentScene.querySelector('.cf-scenario__feedback');
        if (feedbackEl) {
          feedbackEl.innerHTML = '<p>' + feedback + '</p>';
          feedbackEl.style.display = 'block';
          feedbackEl.className = 'cf-scenario__feedback cf-scenario__feedback--' +
            (choice.dataset.correct === 'true' ? 'correct' : 'incorrect');
        }
      }

      if (nextScene) {
        setTimeout(function() {
          showScene(nextScene);
        }, feedback ? 1500 : 0);
      }
    }

    var backBtn = e.target.closest('.cf-scenario__back-btn');
    if (backBtn && history.length > 0) {
      var prevScene = history.pop();
      showScene(prevScene, false);
    }

    var restartBtn = e.target.closest('.cf-scenario__restart-btn');
    if (restartBtn) {
      history = [];
      var startScene = container.dataset.startScene || (scenes[0] && scenes[0].dataset.sceneId);
      showScene(startScene, false);
    }
  });

  if (scenes.length > 0) {
    showScene(currentSceneId, false);
  }
}

/**
 * Quiz Component
 */
function initializeQuiz(container) {
  var questions = container.querySelectorAll('.cf-quiz__question');
  var currentQuestion = 0;
  var answers = {};
  var submitted = false;

  function showQuestion(index) {
    questions.forEach(function(q, i) {
      q.style.display = i === index ? 'block' : 'none';
    });

    // Update progress
    var progress = container.querySelector('.cf-quiz__progress');
    if (progress) {
      progress.textContent = 'Question ' + (index + 1) + ' of ' + questions.length;
    }

    var progressFill = container.querySelector('.cf-quiz__progress-fill');
    if (progressFill) {
      progressFill.style.width = ((index + 1) / questions.length * 100) + '%';
    }

    // Update navigation buttons
    var prevBtn = container.querySelector('.cf-quiz__prev');
    var nextBtn = container.querySelector('.cf-quiz__next');
    var submitBtn = container.querySelector('.cf-quiz__submit');

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.style.display = index < questions.length - 1 ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = index === questions.length - 1 ? 'inline-flex' : 'none';
  }

  // Handle option selection
  container.addEventListener('change', function(e) {
    var option = e.target.closest('.cf-quiz__option input');
    if (option) {
      var questionEl = option.closest('.cf-quiz__question');
      var questionId = questionEl.dataset.questionId;
      var type = questionEl.dataset.type;

      if (type === 'multiple-select') {
        answers[questionId] = answers[questionId] || [];
        var value = parseInt(option.value);
        var idx = answers[questionId].indexOf(value);
        if (option.checked && idx === -1) {
          answers[questionId].push(value);
        } else if (!option.checked && idx > -1) {
          answers[questionId].splice(idx, 1);
        }
      } else if (type === 'true-false') {
        answers[questionId] = option.value === 'true';
      } else {
        answers[questionId] = parseInt(option.value);
      }

      // Update visual selection
      questionEl.querySelectorAll('.cf-quiz__option').forEach(function(opt) {
        var input = opt.querySelector('input');
        opt.classList.toggle('selected', input.checked);
      });
    }
  });

  // Navigation
  container.addEventListener('click', function(e) {
    var prevBtn = e.target.closest('.cf-quiz__prev');
    if (prevBtn && currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }

    var nextBtn = e.target.closest('.cf-quiz__next');
    if (nextBtn && currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }

    var submitBtn = e.target.closest('.cf-quiz__submit');
    if (submitBtn && !submitted) {
      submitQuiz();
    }

    var retryBtn = e.target.closest('.cf-quiz__retry');
    if (retryBtn) {
      resetQuiz();
    }
  });

  function submitQuiz() {
    submitted = true;
    var correct = 0;
    var total = questions.length;

    questions.forEach(function(q) {
      var questionId = q.dataset.questionId;
      var correctAnswer = JSON.parse(q.dataset.correctAnswer || '0');
      var userAnswer = answers[questionId];
      var isCorrect = false;

      if (Array.isArray(correctAnswer)) {
        isCorrect = JSON.stringify((userAnswer || []).sort()) === JSON.stringify(correctAnswer.sort());
      } else {
        isCorrect = userAnswer === correctAnswer;
      }

      if (isCorrect) correct++;

      // Show feedback
      q.querySelectorAll('.cf-quiz__option').forEach(function(opt) {
        var input = opt.querySelector('input');
        var value = input.type === 'checkbox' ? parseInt(input.value) :
                    (input.value === 'true' ? true : input.value === 'false' ? false : parseInt(input.value));

        if (Array.isArray(correctAnswer)) {
          if (correctAnswer.includes(value)) {
            opt.classList.add('correct');
          } else if (input.checked) {
            opt.classList.add('incorrect');
          }
        } else {
          if (value === correctAnswer) {
            opt.classList.add('correct');
          } else if (input.checked) {
            opt.classList.add('incorrect');
          }
        }
        input.disabled = true;
      });
    });

    var score = Math.round((correct / total) * 100);
    showResults(score, correct, total);
  }

  function showResults(score, correct, total) {
    var resultsEl = container.querySelector('.cf-quiz__results');
    var passingScore = parseInt(container.dataset.passingScore || '80');
    var passed = score >= passingScore;

    if (resultsEl) {
      resultsEl.innerHTML = '\n        <div class="cf-quiz__results-header ' + (passed ? 'passed' : 'failed') + '">\n          <div class="cf-quiz__results-icon">' + (passed ? '✓' : '✗') + '</div>\n          <div class="cf-quiz__results-score">' + score + '%</div>\n          <div class="cf-quiz__results-status">' + (passed ? 'Passed!' : 'Not quite there yet') + '</div>\n        </div>\n        <p class="cf-quiz__results-message">\n          You got ' + correct + ' out of ' + total + ' questions correct.\n          ' + (passed ? 'Great job!' : 'Review the material and try again.') + '\n        </p>\n        ' + (!passed ? '<button class="cf-quiz__retry btn btn-primary">Try Again</button>' : '') + '\n      ';
      resultsEl.style.display = 'block';
    }

    // Hide navigation
    var nav = container.querySelector('.cf-quiz__nav');
    if (nav) nav.style.display = 'none';
  }

  function resetQuiz() {
    submitted = false;
    answers = {};
    currentQuestion = 0;

    questions.forEach(function(q) {
      q.querySelectorAll('.cf-quiz__option').forEach(function(opt) {
        var input = opt.querySelector('input');
        input.checked = false;
        input.disabled = false;
        opt.classList.remove('selected', 'correct', 'incorrect');
      });
    });

    var resultsEl = container.querySelector('.cf-quiz__results');
    if (resultsEl) resultsEl.style.display = 'none';

    var nav = container.querySelector('.cf-quiz__nav');
    if (nav) nav.style.display = 'flex';

    showQuestion(0);
  }

  if (questions.length > 0) {
    showQuestion(0);
  }
}

// Export for external use
window.CFComponents = {
  initializeTabs: initializeTabs,
  initializeAccordion: initializeAccordion,
  initializeFlashcards: initializeFlashcards,
  initializeScenario: initializeScenario,
  initializeQuiz: initializeQuiz
};
