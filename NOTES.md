# Notes

## Learner
- AI engineer. Knows Python, ML from scratch, generative AI. Use ML and GPU analogies (data loading as the sequential part, batch size as problem size).
- Lectures are 1.5 hours. First Moodle test: Thursday 19.11.2026, on slide sets 1 and 2 plus Exercise Sheet 1. It lasts 21 minutes (told 18.11); question types unknown. Ask afterwards which types appeared, to prepare for later tests and the final.

## Course facts
- The module follows Barlas, _Multicore & GPU Programming_. It is parallel computing, not classical processor design.
- Slide notation: α is the parallelizable fraction, N the number of CPUs, lg is log base 2. Slides are cited as set-slide, for example 1-28.
- Slides are printed two per PDF page: slide n is on PDF page ceil(n / 2).

## Preferences
- 18.11.2026: wants each slide set taught from its start, in the order of the slides, before any exercise that depends on it (as in lessons 1 and 2). Never open with an exercise whose setup has not been taught.
- 18.11.2026: asked to focus on the seminar questions and the slides, since he expects those on the exam. Build practice from the exercise sheets and slide content first; textbook material only where it explains a slide.

## Plan to the first test
1. Lesson 0001: speedup, efficiency, Amdahl (done; no score reported).
2. Lesson 0002: Gustafson-Barsis, ants vs elephants, Sheet 1 Task 1. Struggled with the Barlas 1.6 question.
2b. Lesson 0005 (shown as "Lesson 2b"): PCAM, D1 to D6, heat diffusion setup, slides 2-1 to 2-22. Added 18.11 because lesson 0003 started Task 2 without these foundations, and he asked for them. Do it before 0003.
3. Lesson 0003: Sheet 1 Tasks 2 and 3, with a Barlas 1.6 variant as warm-up (built 18.11).
4. Lesson 0004: mock test over slide sets 1 and 2, 24 questions (built 18.11). The planned separate concept lesson was folded into it because the test is on 19.11.
5. After the test: ask how it went and which questions appeared, then plan for the final exam with slide set 3 onward.

## Tooling
- No poppler on this machine, so the Read tool cannot render large PDFs. Extract text and page images with PyMuPDF in a scratch venv instead. Formulas in the slides are images: render the pages to read them.
