export const PROFILE = {
  name: "Madhan Karthikeyan",
  firstName: "Madhan",
  lastName: "Karthikeyan",
  role: "AI Systems Engineer",
  tagline:
    "Engineering intelligent systems that scale — from vector retrieval pipelines to production ML infrastructure.",
  summary: "Focused on backend architecture, distributed systems, and real-world AI deployment.",
  email: "madhankrthik@gmail.com",
  github: "https://github.com/madhan-karthikeyan",
  linkedin: "https://linkedin.com/in/madhan-karthikeyan",
  resume: "/resume_new.pdf",
};

export type Project = {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  pipeline: string[];
  github?: string;
  demo?: string;
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "decisiondrift",
    name: "DecisionDrift",
    category: "Deterministic Governance System",
    subtitle: "ADR Governance CLI via AST",
    description:
      "Architected a deterministic rule engine compiling ADR prohibitions into rule classes, enforced via AST-based static analysis on diffs and full-repo scans. Validated against a 21-patch labeled benchmark achieving 95.2% Recall@5 and published as a PyPI package and GitHub Action.",
    stack: ["Python", "Click", "Tree-sitter", "GitHub Actions", "AST"],
    metrics: [
      { value: "95.2%", label: "Recall@5" },
      { value: "5", label: "rule classes enforced" },
      { value: "CI/CD", label: "GitHub Marketplace" },
    ],
    pipeline: ["Diff", "Tree-sitter AST", "Rule Engine", "Violation Report", "GitHub PR Check"],
    github: "https://github.com/madhan-karthikeyan/DecisionDrift",
  },
  {
    id: "apex",
    name: "Apex Sprint Planner",
    category: "Explainable Planning Platform",
    subtitle: "ILP-based constrained optimization",
    description:
      "Built a full-stack sprint planning platform featuring a 5-stage processing pipeline. Executes context extraction, weight learning, and ILP-based constrained optimization via PuLP/CBC to automatically generate optimal sprint schedules with per-story explainability.",
    stack: ["FastAPI", "React", "SQLAlchemy", "PuLP", "Docker"],
    metrics: [
      { value: "5-stage", label: "processing pipeline" },
      { value: "ILP", label: "optimization (PuLP)" },
      { value: "Docker", label: "containerized stack" },
    ],
    pipeline: ["Context", "Weight Learning", "ILP Solver", "Explainability", "Dashboard"],
    github: "https://github.com/madhan-karthikeyan/ApexS_SWE",
  },
  {
    id: "joblens",
    name: "JobLens",
    category: "Job Search Automation Platform",
    subtitle: "Personal Placement Operating System",
    description:
      "Built a multi-source aggregation pipeline ingesting listings from 7+ ATS platforms into an async PostgreSQL store. Designed a deterministic ranking engine scoring opportunities on role alignment, skill match, behavior affinity, and freshness decay, returning score breakdowns per listing.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy (async)", "React", "Cron", "Docker"],
    metrics: [
      { value: "7 ATS", label: "integration platforms" },
      { value: "90+", label: "skills parsed" },
      { value: "4-factor", label: "ranking algorithm" },
    ],
    pipeline: ["Ingestion", "Normalization", "Ranking Engine", "Postgres", "Discord Digest"],
    github: "https://github.com/madhan-karthikeyan/joblens",
  },
  {
    id: "satellite",
    name: "Satellite Image Search",
    category: "Embedding-Based Geospatial Retrieval",
    subtitle: "Semantic search across multispectral imagery",
    description:
      "Built semantic retrieval over 20,000+ fMoW satellite images. Utilized RemoteCLIP embeddings with 8x Test-Time Augmentation (TTA), ChromaDB with Reciprocal Rank Fusion (RRF), and DBSCAN-Haversine clustering for spatial grouping — visualized in 3D Cesium.",
    stack: ["RemoteCLIP", "ChromaDB", "DBSCAN", "FastAPI", "Cesium"],
    metrics: [
      { value: "20k+", label: "fMoW images" },
      { value: "8x TTA", label: "Test-Time Augmentation" },
      { value: "RRF", label: "Reciprocal Rank Fusion" },
    ],
    pipeline: ["GeoTIFF", "RemoteCLIP", "ChromaDB", "DBSCAN", "FastAPI", "Cesium"],
    github: "https://github.com/madhan-karthikeyan/satellite-image-retrieval",
  },
  {
    id: "cinema",
    name: "Cinema Audience Forecast",
    category: "Production ML Forecasting",
    subtitle: "Ensemble Time-Series Prediction",
    description:
      "Engineered a production-grade 3-model ensemble (LightGBM, XGBoost, CatBoost) with a 0.2 lag-blend predicting cinema attendance. Features a Parquet-partitioned HistoryStore, 15 Prometheus metrics for observability, and graceful degradation paths.",
    stack: ["LightGBM", "XGBoost", "CatBoost", "Prometheus", "Parquet"],
    metrics: [
      { value: "RMSE 21.6", label: "R² 0.54" },
      { value: "15", label: "Prometheus metrics" },
      { value: "3-model", label: "ensemble blend" },
    ],
    pipeline: ["HistoryStore", "Feature Eng", "3-Model Ensemble", "Lag Blend", "Forecast"],
    github: "https://github.com/madhan-karthikeyan/Cinema-Audience-Forecast",
  },
];

export const SECONDARY_PROJECTS: Project[] = [
  {
    id: "medicore",
    name: "MediCore",
    category: "Full-Stack Distributed System",
    subtitle: "Hospital Management Platform V2",
    description:
      "Multi-role hospital platform serving dashboards simultaneously. Features JWT-secured RBAC across ~40 REST APIs with async task pipelines and event-driven cache invalidation.",
    stack: ["Flask", "Vue.js", "Celery", "Redis", "PostgreSQL"],
    metrics: [],
    pipeline: [],
    github: "https://github.com/madhan-karthikeyan/hospital-management-system-V2",
  },
  {
    id: "rag",
    name: "Responsible Financial AI",
    category: "Retrieval-Augmented Generation",
    subtitle: "Source-cited financial Q&A",
    description:
      "Production RAG pipeline answering financial queries with explicit source citations. Uses LlamaIndex and ChromaDB over a 1,000+ document knowledge base.",
    stack: ["LlamaIndex", "ChromaDB", "FastAPI", "ReactJS"],
    metrics: [],
    pipeline: [],
    github: "https://github.com/madhan-karthikeyan/responsible-fin-ai",
  },
  {
    id: "cluster",
    name: "Cluster-Aware Retrieval",
    category: "ML Retrieval System",
    subtitle: "GMM-routed FAISS with semantic cache",
    description:
      "Designed a retrieval system scoping FAISS search within semantically clustered regions using Gaussian Mixture Models, reducing search space alongside a semantic cache.",
    stack: ["GMM", "FAISS", "FastAPI", "Python"],
    metrics: [],
    pipeline: [],
    github: "https://github.com/madhan-karthikeyan/cluster-aware-semantic-cache",
  },
  {
    id: "driftbench",
    name: "DriftBench-TS",
    category: "ML Systems + Tooling",
    subtitle: "Time-Series Benchmarking Framework",
    description:
      "Configuration-driven benchmarking framework supporting 5+ forecasters and 8+ concept-drift detectors with a real-time React dashboard.",
    stack: ["Python", "Flask", "React", "LightGBM"],
    metrics: [],
    pipeline: [],
    github: "https://github.com/madhan-karthikeyan/driftbench-ts",
  },
];

export const EXPERTISE = [
  {
    title: "Backend & Systems",
    items: [
      "Python",
      "FastAPI",
      "Flask",
      "Async I/O (SQLAlchemy, asyncpg)",
      "Celery",
      "Redis",
      "REST API Design",
    ],
  },
  {
    title: "Retrieval & CV",
    items: [
      "FAISS",
      "ChromaDB",
      "RemoteCLIP / CLIP",
      "Vector Search",
      "Embedding Pipelines",
      "Object Detection (YOLOv8)",
    ],
  },
  {
    title: "DevOps & CLI Tools",
    items: [
      "Docker Compose",
      "GitHub Actions (CI/CD)",
      "AWS",
      "AST & Static Analysis (Tree-sitter)",
      "Click",
      "PyPI Packaging",
    ],
  },
  {
    title: "ML Infrastructure",
    items: [
      "PyTorch",
      "LightGBM",
      "XGBoost",
      "Time-Series Forecasting",
      "GMM",
      "DBSCAN",
      "RAG Pipelines",
      "LlamaIndex",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Computer Vision Intern",
    org: "GloballyGI",
    location: "Vellore, Tamil Nadu",
    period: "Jan 2026 – Jun 2026",
    bullets: [
      "Engineered a multi-object food detection pipeline (YOLOv8n + D-FINE), achieving 80–85% mAP across 50 food classes on a custom-curated 5,000-image dataset.",
      "Designed class-balancing and targeted augmentation pipelines for 50 categories, reducing per-class mAP variance by ~35%.",
      "Reduced inference latency by ~25% through lightweight architecture selection and post-training optimization, enabling real-time detection.",
    ],
  },
  {
    role: "AI Engineer Intern",
    org: "National Informatics Centre · Govt. of India",
    location: "Chennai, Tamil Nadu",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Architected a triage-to-resolution pipeline integrating a vision-language model with a vector similarity index over 150+ documents (4GB), cutting resolution time from >24h to under 1 minute.",
      "Engineered the document ingestion service with chunking, embedding generation, and metadata-filtered cosine retrieval, enabling sub-second search over 4GB without dedicated search infrastructure.",
    ],
  },
];

export const EDUCATION = [
  {
    school: "Vellore Institute of Technology",
    detail: "B.Tech CSE · CGPA 8.80 / 10",
    period: "Aug 2023 – Present",
  },
  {
    school: "Indian Institute of Technology, Madras",
    detail: "B.S. Data Science & Applications",
    period: "Sep 2023 – Present",
  },
];

export const CERTIFICATIONS = [
  "Microsoft Certified: Azure AI Engineer Associate",
  "IIT Madras: Advanced Certificate in Machine Learning & Data Science",
];
