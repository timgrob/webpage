export type CodeEntry = {
  id: string;
  name: string;
  description: string;
  href: string;
};

const GITHUB_PROFILE_HREF = "https://github.com/timgrob";

export const CODE_ENTRIES: CodeEntry[] = [
  {
    id: "i-like-big-bots",
    name: "i-like-big-bots",
    description: "Crypto trading algorithms built on the Freqtrade.io framework, written in Python.",
    href: `${GITHUB_PROFILE_HREF}/i-like-big-bots`,
  },
  {
    id: "matlab-sudoku-solver",
    name: "matlabSudokuSolver",
    description: "A simple sudoku solver written in MATLAB.",
    href: `${GITHUB_PROFILE_HREF}/matlabSudokuSolver`,
  },
  {
    id: "java-sudoku-solver",
    name: "javaSudokuSolver",
    description: "A simple sudoku solver written in Java.",
    href: `${GITHUB_PROFILE_HREF}/javaSudokuSolver`,
  },
  {
    id: "christmas-riddle",
    name: "christmasRiddle",
    description: "Source code to a family Christmas riddle, built with HTML.",
    href: `${GITHUB_PROFILE_HREF}/christmasRiddle`,
  },
];

export const CODE_CONTENT = {
  description:
    "Public GitHub side-projects — hobby code, distinct from the Arduino builds under Projects and the paid work under Experience.",
  profileHref: GITHUB_PROFILE_HREF,
  entries: CODE_ENTRIES,
};
