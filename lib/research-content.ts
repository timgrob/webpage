export type ResearchPaper = {
  title: string;
  year: number;
  doi: string;
};

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "Magnetophoretic velocities of superparamagnetic particles, agglomerates and complexes",
    year: 2015,
    doi: "https://doi.org/10.1016/j.jmmm.2015.02.031",
  },
  {
    title:
      "Comparison between simulation and experimentally observed interactions between two magnetic beads in a fluidic system",
    year: 2016,
    doi: "https://doi.org/10.1016/j.jmmm.2016.01.043",
  },
  {
    title: "Magnetic susceptibility characterisation of superparamagnetic microspheres",
    year: 2017,
    doi: "https://doi.org/10.1016/j.jmmm.2017.12.007",
  },
];

export const THESIS = {
  title:
    "Simulation of superparamagnetic particle trajectories in a microfluidic device for magnetic separation purposes",
  institution: "University of Oxford, Department of Engineering Science",
  year: 2018,
  // Not self-hosted: the source PDF is 140MB, far too large to serve from this
  // site. Links to Oxford's own Research Archive record instead.
  href: "https://ora.ox.ac.uk/objects/uuid:759130c0-29ca-4287-9849-15b844277cc7",
};

export const RESEARCH_CONTENT = {
  title: "Numerical Particle Trajectory Simulation",
  institution: "University of Oxford",
  period: "2012 – 2016",
  description:
    "Tim's doctoral research at the University of Oxford focused on numerically simulating how superparamagnetic microspheres — tiny magnetic beads only a few microns across — move through fluid when pulled by an external magnetic field. Beads like these are used in lab-on-a-chip devices, where a magnetic field is used to sort, transport, or separate biological material suspended in a liquid.",
  approach:
    "Predicting a bead's trajectory accurately is hard: its motion combines a deterministic magnetic pull with random thermal jostling (Brownian motion), and beads can clump into agglomerates that move differently from single beads. Tim built Monte Carlo simulations — models that repeatedly sample random outcomes to build up a statistical picture of behaviour — to predict how individual and clustered beads travel, then validated the simulations against physical experiments measuring bead velocities and bead-to-bead interactions in real fluidic systems.",
  outcome:
    "The work produced three peer-reviewed papers and was presented at two international conferences.",
  thesis: THESIS,
  papers: RESEARCH_PAPERS,
};
