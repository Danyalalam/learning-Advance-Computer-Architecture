/* Reusable quiz widget.

   Multiple choice:
     <div class="q" data-type="mcq" data-answer="2">
       <p class="prompt">Question?</p>
       <div class="options"><button>A</button><button>B</button><button>C</button></div>
       <div class="explain">Why.</div>
     </div>
   data-answer is the 1-based index of the correct button.

   Numeric:
     <div class="q" data-type="num" data-answer="5.26" data-tol="0.01">
       <p class="prompt">Question?</p>
       <div class="explain">Why.</div>
     </div>
   data-tol is the allowed absolute error (default 0.01). Commas are accepted as decimal marks.

   Text (several accepted spellings, case-insensitive):
     <div class="q" data-type="text" data-answer="impossible|no|none">

   Add <p class="score" data-quiz-score></p> anywhere to show a running score. */
(function () {
  const qs = [...document.querySelectorAll('.q')];
  const scoreEl = document.querySelector('[data-quiz-score]');
  let right = 0, done = 0;

  function finish(q, ok, correctText) {
    if (q.classList.contains('done')) return;
    q.classList.add('done');
    done += 1;
    if (ok) right += 1;
    const v = document.createElement('p');
    v.className = 'verdict ' + (ok ? 'right' : 'wrong');
    v.textContent = ok ? 'Correct.' : 'Not quite. Answer: ' + correctText;
    q.insertBefore(v, q.querySelector('.explain'));
    if (scoreEl) {
      scoreEl.textContent = right + ' of ' + done + ' correct' +
        (done === qs.length ? '. Tell your teacher the score and which ones you missed.' : ' so far (' + (qs.length - done) + ' to go).');
    }
  }

  qs.forEach((q, i) => {
    const num = document.createElement('div');
    num.className = 'num';
    num.textContent = 'Question ' + (i + 1);
    q.insertBefore(num, q.firstChild);
    const type = q.dataset.type;

    if (type === 'mcq') {
      const buttons = [...q.querySelectorAll('.options button')];
      const answer = Number(q.dataset.answer) - 1;
      buttons.forEach((b, j) => b.addEventListener('click', () => {
        buttons.forEach(x => (x.disabled = true));
        buttons[answer].classList.add('right');
        if (j !== answer) b.classList.add('wrong');
        finish(q, j === answer, buttons[answer].textContent);
      }));
      return;
    }

    const row = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('aria-label', 'Your answer');
    input.placeholder = type === 'num' ? 'number' : 'answer';
    const btn = document.createElement('button');
    btn.className = 'check';
    btn.textContent = 'Check';
    row.append(input, btn);
    q.insertBefore(row, q.querySelector('.explain'));

    const check = () => {
      const raw = input.value.trim();
      if (!raw) return;
      let ok;
      if (type === 'num') {
        const val = Number(raw.replace(',', '.').replace('%', ''));
        const tol = Number(q.dataset.tol || 0.01);
        ok = Number.isFinite(val) && Math.abs(val - Number(q.dataset.answer)) <= tol;
      } else {
        ok = q.dataset.answer.toLowerCase().split('|').includes(raw.toLowerCase());
      }
      input.disabled = true;
      btn.disabled = true;
      finish(q, ok, q.dataset.show || q.dataset.answer.split('|')[0]);
    };
    btn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  });
})();
