export const PROFILE = {
  name: "Madhan Karthikeyan",
  firstName: "Madhan",
  lastName: "Karthikeyan",
  role: "AI Systems Engineer",
  tagline:
    "Building retrieval systems, ML infrastructure, and intelligent backend architectures.",
  summary:
    "Focused on scalable AI systems, vector retrieval, distributed backend engineering, and production ML.",
  email: "madhankrthik@gmail.com",
  phone: "+91 93619 51624",
  github: "https://github.com/madhan-karthikeyan",
  linkedin: "https://linkedin.com/in/madhan-karthikeyan",
  resume: "/resume.pdf",
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
};

export const PROJECTS: Project[] = [
  {
    id: "medicore",
    name: "MediCore",
    category: "Full-Stack Distributed System",
    subtitle: "Hospital Management Platform",
    description:
      "Multi-role hospital platform with JWT-secured RBAC across ~40 REST APIs, async task pipelines, and event-driven cache invalidation sustaining sub-150ms p95 latency.",
    stack: ["Flask", "Vue.js", "Celery", "Redis", "PostgreSQL", "JWT", "Razorpay"],
    metrics: [
      { value: "<150", label: "ms p95 latency" },
      { value: "~40", label: "REST endpoints" },
      { value: "3-tier", label: "RBAC hierarchy" },
    ],
    pipeline: ["Client", "JWT Gateway", "Flask API", "Redis Cache", "Celery Workers", "Postgres"],
  },
  {
    id: "satellite",
    name: "Satellite Image Search",
    category: "Embedding-Based Geospatial Retrieval",
    subtitle: "Semantic search across multispectral imagery",
    description:
      "Semantic retrieval over 10,000+ geo-tagged satellite images using RemoteCLIP embeddings and ChromaDB, with DBSCAN-Haversine clustering and 3D Cesium visualization.",
    stack: ["RemoteCLIP", "ChromaDB", "DBSCAN", "FastAPI", "Cesium"],
    metrics: [
      { value: "<500", label: "ms query latency" },
      { value: "10k+", label: "indexed images" },
      { value: "4-band", label: "GeoTIFF pipeline" },
    ],
    pipeline: ["GeoTIFF", "RemoteCLIP", "ChromaDB", "DBSCAN", "FastAPI", "Cesium"],
  },
  {
    id: "rag",
    name: "Responsible Financial AI",
    category: "Retrieval-Augmented Generation",
    subtitle: "Source-cited financial Q&A",
    description:
      "Production RAG pipeline using LlamaIndex and ChromaDB for context-grounded financial Q&A — explainable, source-cited responses across a 1,000+ document knowledge base.",
    stack: ["LlamaIndex", "ChromaDB", "FastAPI", "ReactJS"],
    metrics: [
      { value: "<2s", label: "end-to-end latency" },
      { value: "1k+", label: "indexed documents" },
      { value: "Source", label: "cited responses" },
    ],
    pipeline: ["Query", "LlamaIndex", "ChromaDB", "Reranker", "LLM", "Cited Response"],
  },
  {
    id: "driftbench",
    name: "DriftBench-TS",
    category: "ML Systems + Software Engineering",
    subtitle: "Time-Series Benchmarking Framework",
    description:
      "Configuration-driven benchmarking framework supporting 5+ forecasters and 8+ concept-drift detectors with rolling-window simulation, retraining strategies, and a real-time React dashboard.",
    stack: ["Python", "Flask", "React", "LightGBM", "Config Pipelines"],
    metrics: [
      { value: "5+", label: "forecasting algorithms" },
      { value: "8+", label: "drift detectors" },
      { value: "6", label: "benchmark datasets" },
    ],
    pipeline: ["Config", "Loader", "Forecaster", "Drift Detector", "Retrainer", "Dashboard"],
  },
  {
    id: "cluster",
    name: "Cluster-Aware Semantic Retrieval",
    category: "ML Retrieval System",
    subtitle: "GMM-routed FAISS with semantic cache",
    description:
      "Partitioned embedding space with Gaussian Mixture Models to scope FAISS search within cluster regions, with a cluster-indexed semantic cache for similar-query reuse.",
    stack: ["GMM", "FAISS", "FastAPI", "Python"],
    metrics: [
      { value: "~30%", label: "latency reduction" },
      { value: "~35%", label: "cache hit rate" },
      { value: "Cluster", label: "scoped search" },
    ],
    pipeline: ["Embedding", "GMM Routing", "Semantic Cache", "FAISS Fallback", "Result"],
  },
];

export const EXPERTISE = [
  {
    title: "Retrieval Systems",
    items: ["FAISS", "ChromaDB", "LlamaIndex", "RemoteCLIP / CLIP", "Vector Search", "Embedding Pipelines", "Semantic Caching"],
  },
  {
    title: "ML Infrastructure",
    items: ["PyTorch", "Scikit-learn", "LightGBM", "YOLOv8", "Time-Series Forecasting", "GMM", "DBSCAN", "RAG Pipelines"],
  },
  {
    title: "Backend Systems",
    items: ["Python", "FastAPI", "Flask", "REST API Design", "JWT", "Celery", "Redis", "Distributed Task Queues"],
  },
  {
    title: "Systems & DevOps",
    items: ["Docker", "AWS (EC2, S3)", "Event-Driven Architecture", "Async Pipelines", "PostgreSQL", "MongoDB", "Git"],
  },
];

export const EXPERIENCE = [
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
  {
    role: "Computer Vision Intern",
    org: "GloballyGI",
    location: "Remote",
    period: "Jan 2025 – Apr 2025",
    bullets: [
      "Engineered a multi-object food detection pipeline (YOLOv8n + D-FINE), achieving 80–85% mAP across 50 food classes on a custom-curated 5,000-image dataset.",
      "Designed class-balancing and targeted augmentation pipelines for 50 categories, reducing per-class mAP variance by ~35%.",
      "Reduced inference latency by ~25% through lightweight architecture selection and post-training optimization.",
    ],
  },
];

export const EDUCATION = [
  { school: "Vellore Institute of Technology", detail: "B.Tech CSE · CGPA 8.80 / 10", period: "Aug 2023 – Present" },
  { school: "Indian Institute of Technology, Madras", detail: "B.S. Data Science & Applications", period: "Sep 2023 – Present" },
];

export const CERTIFICATIONS = [
  "Microsoft Certified: Azure AI Engineer Associate",
  "IIT Madras: Advanced Certificate in Machine Learning & Data Science",
];
