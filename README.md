# Student Tools

A free, no-sign-up toolkit for college students — work out how many classes you can skip, calculate your SGPA and CGPA, and merge PDFs, all in the browser.

**Live site:** [student-tools-topaz.vercel.app](https://student-tools-topaz.vercel.app/)

## Tools

| Tool | What it does |
|---|---|
| **Attendance Calculator** | Enter classes attended, total classes and your target percentage (e.g. 75%). It tells you how many classes you can still skip — or how many you need to attend in a row to get back above the target. |
| **SGPA Calculator** | Pick a grade and credits for each subject; computes your semester GPA on a 10-point scale (S = 10, A = 9, B = 8, C = 7, D = 6, E = 5, F = 0). |
| **CGPA Calculator** | Enter each semester's SGPA and credits; computes your credit-weighted cumulative GPA. |
| **PDF Combiner** | Select several PDFs and merge them into one file — entirely in your browser, nothing is uploaded. |

## Privacy

There's no backend or database. Your grades and credits are saved in **browser cookies** on your own device so they're still there next time you visit, and PDF merging runs locally with [pdf-lib](https://pdf-lib.js.org/).

## Tech stack

Plain HTML, CSS and JavaScript — no build step. PDF merging uses `pdf-lib` from cdnjs.

## Running locally

```bash
git clone https://github.com/Mdr-Pranav/StudentTools.git
cd StudentTools
python3 -m http.server 8000   # or just open index.html in a browser
```

Then open http://localhost:8000.

## Project structure

```
StudentTools/
├── index.html                 # Landing page
├── attendance-calculator.html
├── sgpa-calc.html
├── cgpa-calculator.html
├── pdf.html                   # PDF combiner
├── CSS/common.css
└── Javascript/                # attendance.js, sgpa.js, cgpa.js
```

## License

[MIT](LICENSE)
