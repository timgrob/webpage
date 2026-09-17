export type ProjectEntry = {
  id: string;
  name: string;
  description: string;
  videoHref: string;
};

export const PROJECT_ENTRIES: ProjectEntry[] = [
  {
    id: "self-balancing-robot",
    name: "Self-Balancing Robot",
    description:
      "A self-balancing robot built with an Arduino. It measures its position using a three-axis accelerometer, feeding a PID controller that drives the wheels to keep it upright.",
    videoHref: "https://www.youtube.com/shorts/r4t_G5wm_PQ",
  },
  {
    id: "lcd-display",
    name: "LCD Display",
    description:
      "An LCD display showing a birthday message. Two buttons wired to a breadboard let you step through the message.",
    videoHref: "https://www.youtube.com/watch?v=CJAyEBt9ytI",
  },
  {
    id: "dc-motor",
    name: "DC Motor",
    description:
      "A DC motor controlled by a Raspberry Pi and an H-bridge, with a while-loop reversing the spin direction every 2 seconds.",
    videoHref: "https://www.youtube.com/watch?v=P9VYgvv4cYw",
  },
  {
    id: "7-segment-display",
    name: "7 Segment Display",
    description:
      "A countdown on a 7-segment display, driven by a Raspberry Pi and an electronic latch, timed to play alongside \"The Final Countdown\" by Europe.",
    videoHref: "https://www.youtube.com/shorts/4OA3fE3qM6Q",
  },
];

export const PROJECTS_CONTENT = {
  description: "Personal Arduino and Raspberry Pi hardware builds, each documented with a demo video.",
  entries: PROJECT_ENTRIES,
};
