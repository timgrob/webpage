export type ProjectEntry = {
  id: string;
  name: string;
  description: string;
  videoHref: string;
};

const YOUTUBE_CHANNEL_HREF = "https://www.youtube.com/channel/UCgKaxbCao2Gb5t3_vq-FNrw";

export const PROJECT_ENTRIES: ProjectEntry[] = [
  {
    id: "self-balancing-robot",
    name: "Self-Balancing Robot",
    description:
      "A self-balancing robot built with an Arduino. It measures its position using a three-axis accelerometer, feeding a PID controller that drives the wheels to keep it upright.",
    videoHref: YOUTUBE_CHANNEL_HREF,
  },
  {
    id: "lcd-display",
    name: "LCD Display",
    description:
      "An LCD display showing a birthday message. Two buttons wired to a breadboard let you step through the message.",
    videoHref: YOUTUBE_CHANNEL_HREF,
  },
  {
    id: "dc-motor",
    name: "DC Motor",
    description:
      "A DC motor controlled by a Raspberry Pi and an H-bridge, with a while-loop reversing the spin direction every 2 seconds.",
    videoHref: YOUTUBE_CHANNEL_HREF,
  },
  {
    id: "7-segment-display",
    name: "7 Segment Display",
    description:
      "A countdown on a 7-segment display, driven by a Raspberry Pi and an electronic latch, timed to play alongside \"The Final Countdown\" by Europe.",
    videoHref: YOUTUBE_CHANNEL_HREF,
  },
];

export const PROJECTS_CONTENT = {
  description: "Personal Arduino and Raspberry Pi hardware builds, each documented with a demo video.",
  entries: PROJECT_ENTRIES,
};
