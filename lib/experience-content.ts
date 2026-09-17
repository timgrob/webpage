export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
};

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: "xo-market",
    role: "Freelance Senior Quantitative Researcher / Developer",
    company: "XO Market",
    location: "Remote",
    period: "March 2026 – today",
    achievements: [
      "Designed and built a real-time terminal interface for monitoring and managing market-making activity on prediction markets, including live position tracking, order/quote management and risk alerts (Next.js)",
      "Built a Golang market-making strategy for prediction markets without a reliable fair-value anchor, estimating true probabilities from order flow and using inventory-aware quoting to manage adverse selection and directional risk",
      "Implemented a Golang market-making strategy quoting symmetric limit orders around the prevailing price, with each fill immediately hedged on Polymarket to stay risk-neutral",
    ],
  },
  {
    id: "dialectic",
    role: "Senior Quantitative Researcher / Developer",
    company: "Dialectic AG",
    location: "Zug",
    period: "Jan – Mar 2026",
    achievements: [
      "Built and productionized a funding rate forecasting system using ARIMA and XGBoost, incorporating time-series analysis, feature engineering, and model validation with Python (Scikit-learn, Darts)",
      "Conducted statistical analysis of fund performance drivers, applying hypothesis testing, regression analysis, and quantitative modeling in Python to decompose and explain APR variability",
      "Led the implementation of secure, containerized development environments for agent-based systems, building a sandboxed Docker infrastructure and establishing security best practices for safe code execution and reproducibility",
    ],
  },
  {
    id: "digital-wave-finance",
    role: "Senior Quantitative Developer",
    company: "Digital Wave Finance AG",
    location: "Zug",
    period: "Mar 2025 – Dec 2025",
    achievements: [
      "Architected and implemented a low-latency data ingestion and aggregation backend for CeFi and DeFi market data using Python, enabling real-time data access for quantitative research and trading systems (FastAPI)",
      "Designed and optimized scalable data schemas, APIs, and data pipelines to support high-throughput analytics workflows, improving data accessibility and reliability for downstream quant research and modeling",
    ],
  },
  {
    id: "mathrix",
    role: "Senior Quantitative Developer",
    company: "Mathrix AG",
    location: "Zug",
    period: "Oct 2022 – Jan 2025",
    achievements: [
      "Designed and developed a low-latency trading graphical user interface for crypto spot and derivatives (perpetuals, options) using Python, enabling real-time order execution, market visualization, and interaction for the trading desk (PySide/Qt)",
      "Engineered a real-time monitoring and trade management system for hedging workflows, improving execution tracking, risk monitoring, and operational efficiency for traders using Python (PySide/Qt)",
      "Maintained a high-frequency market-making system for live crypto markets, implementing alpha-generating strategies, low-latency execution logic, and real-time data processing using Python and Node.js",
      "Led internal software engineering initiatives, including a Clean Code working group; delivered technical presentations on code quality, system design, and best practices to improve maintainability of the codebase",
      "Conceptualized and developed a transaction cost–aware hedging framework, incorporating execution costs, and optimization techniques using JavaScript",
      "Performed correlation and statistical analysis on crypto asset returns and US equity indices, applying time-series analysis, data analysis, and quantitative research methods in Python",
    ],
  },
  {
    id: "six-group",
    role: "Senior Data Scientist",
    company: "SIX Group",
    location: "Zurich",
    period: "Jan 2019 – Oct 2022",
    achievements: [
      "Delivered a company-wide big data analytics platform on Microsoft Azure, enabling large-scale quantitative data processing and research workflows for Databricks using PySpark and Hadoop",
      "Initiated and implemented a CI/CD pipeline on Azure DevOps, improving deployment reliability, code quality, and reproducibility for production-grade data",
      "Developed a fraud detection system for the Swiss Stock Exchange, leveraging deep autoencoder neural networks on transaction-level market data using Python (Pandas, NumPy, PyTorch, TensorFlow)",
      "Built a customer churn prediction model for financial services clients using deep learning techniques, handling real-world customer datasets with Python and PyTorch, supporting data-driven decision-making",
      "Built NLP-based document scraping pipelines using AWS Textract and Rekognition, enabling automated extraction, processing and classification of structured and unstructured customer data",
    ],
  },
  {
    id: "pwc",
    role: "Full Stack Software Engineer",
    company: "PwC Digital Experience Center",
    location: "Zurich",
    period: "May 2016 – Jul 2018",
    achievements: [
      "Led full-stack development of two high-performance e-commerce platforms, from architecture and implementation to maintenance, applying scalable database design, API development, and backend engineering using PHP7 and MySQL (Symfony2)",
      "Developed a recommendation engine for a major Swiss e-commerce platform, integrating Google Cloud Vision API and building data-driven algorithms for content-based recommendations, highlighting feature extraction, model integration, and predictive analytics",
    ],
  },
  {
    id: "swissquant",
    role: "Quantitative Developer",
    company: "SwissQuant Group AG",
    location: "Zurich",
    period: "Apr 2011 – Jul 2014",
    achievements: [
      "Developed portfolio replication and optimization software for a Fortune 500 insurer, leveraging convex optimization solvers (Mosek, Gurobi, COIN-CLP) and MATLAB to deliver scalable, production-ready quantitative solutions",
      "Built a fully automated stock-picking system in MATLAB using regression models, statistical filters, and quantitative strategies, integrating with MySQL for data management and backtesting workflows",
      "Implemented stress-testing models integrated into a touch-enabled client advisory tool for a national private bank, applying risk modeling and scenario analysis with Java and MySQL",
      "Delivered internal training seminars on convex optimization at SwissQuant, providing mentorship and knowledge transfer on quantitative finance modeling and algorithmic development",
    ],
  },
];

export const EXPERIENCE_CONTENT = {
  summary:
    "Quantitative developer and researcher with a PhD from the University of Oxford and an MSc from ETH Zürich, bringing over a decade of experience designing and deploying production-grade quantitative systems, spanning from high-frequency trading algorithms and low-latency GUIs/TUIs to large-scale ML pipelines and data infrastructure. Deep expertise across the full stack of quant development: research, implementation, testing, and deployment.",
  entries: EXPERIENCE_ENTRIES,
  skills: [
    "Python",
    "MATLAB",
    "JavaScript/Node.js",
    "Rust (learning)",
    "PyTorch",
    "TensorFlow",
    "Scikit-Learn",
    "Darts",
    "FastAPI",
    "PySide/Qt",
    "PySpark",
    "Azure",
    "AWS",
    "Docker",
    "Git",
    "CI/CD",
  ],
  cvDownloadHref: "/tim-grob-cv.pdf",
};
