export interface AnatomyStructure {
  id: string;
  name: string;
  side: "left" | "right";
  x: number; // percentage in image
  y: number; // percentage in image
  description: string;
  scrollRange: [number, number];
}

export const ANATOMY_STRUCTURES: AnatomyStructure[] = [
  {
    id: "muscles",
    name: "Muscles",
    side: "left",
    x: 35,
    y: 20,
    description: "Quadriceps and hamstring tendons control joint stability and dynamic load absorption.",
    scrollRange: [0, 0.15],
  },
  {
    id: "synovium",
    name: "Synovium",
    side: "left",
    x: 35,
    y: 36,
    description: "Specialized lining producing synovial fluid for friction-free joint articulation.",
    scrollRange: [0.15, 0.3],
  },
  {
    id: "cartilage",
    name: "Cartilage",
    side: "left",
    x: 35,
    y: 53,
    description: "Smooth hyaline layer protecting subchondral bone from impact forces.",
    scrollRange: [0.3, 0.45],
  },
  {
    id: "meniscus",
    name: "Meniscus",
    side: "left",
    x: 35,
    y: 72,
    description: "Crescent-shaped fibrocartilage shock absorbers distributing load across the tibia.",
    scrollRange: [0.45, 0.6],
  },
  {
    id: "ligaments",
    name: "Ligaments",
    side: "right",
    x: 65,
    y: 22,
    description: "ACL, PCL, MCL, and LCL providing primary mechanical restraint to joint displacement.",
    scrollRange: [0.6, 0.75],
  },
  {
    id: "bone",
    name: "Bone",
    side: "right",
    x: 65,
    y: 38,
    description: "Femoral condyles and tibial plateau forming the core osseous framework.",
    scrollRange: [0.75, 0.85],
  },
  {
    id: "bone-marrow",
    name: "Bone marrow",
    side: "right",
    x: 65,
    y: 58,
    description: "Subchondral vascular bed responsible for structural repair and metabolic exchange.",
    scrollRange: [0.85, 0.95],
  },
  {
    id: "alignment",
    name: "Alignment",
    side: "right",
    x: 65,
    y: 80,
    description: "Mechanical axis of the leg determining weight-bearing distribution across compartments.",
    scrollRange: [0.95, 1.0],
  },
];

export interface CartilageLayer {
  stepNumber: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export const CARTILAGE_LAYERS: CartilageLayer[] = [
  {
    stepNumber: "01",
    title: "Cartilage surface",
    subtitle: "Articular Hyaline Layer",
    image: "/images/cartilage-layer-01.png",
    description: "Initial surface fibrillation or micro-cracks often hide underlying subchondral stress.",
  },
  {
    stepNumber: "02",
    title: "Subchondral bone",
    subtitle: "Osseous Interface",
    image: "/images/cartilage-layer-02.png",
    description: "Dense bone plate beneath cartilage adapts dynamically to localized weight distribution.",
  },
  {
    stepNumber: "03",
    title: "Bone marrow",
    subtitle: "Vascular Core",
    image: "/images/cartilage-layer-03.png",
    description: "Rich stem cell reservoir vital for joint tissue cellular repair response.",
  },
  {
    stepNumber: "04",
    title: "Bone marrow lesion",
    subtitle: "Micro-trabecular Edema",
    image: "/images/cartilage-layer-04.png",
    description: "Subchondral bone edema (BML) is a hidden driver of deep mechanical joint pain.",
  },
  {
    stepNumber: "05",
    title: "Load distribution",
    subtitle: "Biomechanical Mapping",
    image: "/images/load-distribution.png",
    description: "Advanced FEA modeling highlights peak stress zones requiring surgical/orthobiotic offloading.",
  },
];

export interface ClinicalStepData {
  stepNumber: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export const CLINICAL_STEPS: ClinicalStepData[] = [
  {
    stepNumber: "01",
    title: "SCAN",
    subtitle: "Multi-Planar Imaging",
    image: "/images/scan.png",
    description: "Weight-bearing X-ray combined with 3T MRI mapping of bone marrow, cartilage, and alignment.",
  },
  {
    stepNumber: "02",
    title: "UNDERSTAND",
    subtitle: "Biomechanical Diagnosis",
    image: "/images/understand.png",
    description: "Identifying the root cause of mechanical failure beyond symptom surface presentation.",
  },
  {
    stepNumber: "03",
    title: "TARGET",
    subtitle: "Precision Intervention",
    image: "/images/target.png",
    description: "Ultra-minimally invasive arthroscopic or subchondral target procedure tailored to joint pathology.",
  },
  {
    stepNumber: "04",
    title: "REHABILITATE",
    subtitle: "Protected Motion",
    image: "/images/rehabilitate.png",
    description: "Early structured range of motion and bio-feedback gait retraining to protect healing tissues.",
  },
  {
    stepNumber: "05",
    title: "STRENGTHEN",
    subtitle: "Neuromuscular Power",
    image: "/images/strengthen.png",
    description: "Targeted eccentric loading and kinetic chain optimization to restore high-performance dynamic stability.",
  },
  {
    stepNumber: "06",
    title: "FOLLOW UP",
    subtitle: "Long-Term Preservation",
    image: "/images/followup.png",
    description: "Serial objective MRI tracking and functional milestone scoring to safeguard joint longevity.",
  },
];

export interface ResearchStudy {
  id: string;
  studyNumber: string;
  title: string;
  population: string;
  treatment: string;
  followUp: string;
  outcomeText: string;
  percentage: number;
  percentageLabel: string;
  numerator: number;
  denominator: number;
  link: string;
}

export const RESEARCH_STUDIES: ResearchStudy[] = [
  {
    id: "study-01",
    studyNumber: "STUDY 01",
    title: "Bone versus joint injection",
    population: "60 people (120 knees)",
    treatment: "Bone marrow concentrate vs joint injection",
    followUp: "Reported follow-up contest",
    outcomeText: "80% of treated knees remained TKA-free",
    percentage: 80,
    percentageLabel: "TKA-FREE",
    numerator: 96,
    denominator: 120,
    link: "#",
  },
  {
    id: "study-02",
    studyNumber: "STUDY 02",
    title: "Subchondral BMC vs opposite-knee replacement",
    population: "140 adults",
    treatment: "Subchondral bone-marrow concentrate",
    followUp: "Latest follow-up",
    outcomeText: "115/140 treated knees remained without replacement",
    percentage: 82,
    percentageLabel: "REMAINED",
    numerator: 115,
    denominator: 140,
    link: "#",
  },
];

export interface PatientStory {
  name: string;
  procedure: string;
  activity: string;
  quote: string;
  metric: string;
}

export const PATIENT_STORIES: PatientStory[] = [
  {
    name: "Vikram Malhotra",
    procedure: "Subchondroplasty & ACL Reconstruction",
    activity: "Marathon Runner & Triathlete",
    quote: "After being told I needed early knee replacement, Dr. Bora's joint preservation approach got me back to pain-free running in 6 months.",
    metric: "42km Completed Post-Op",
  },
  {
    name: "Ananya Sharma",
    procedure: "Cartilage Autologous Transplant",
    activity: "Professional Badminton Player",
    quote: "Precision subchondral therapy saved my sporting career. The MRI follow-up shows complete cartilage restoration.",
    metric: "Return to Pro League",
  },
  {
    name: "Col. Rajesh Verma",
    procedure: "Multi-Ligament Arthroscopy",
    activity: "Trekking Enthusiast",
    quote: "Understanding the whole joint pathology made all the difference. I summit high-altitude trails today with complete stability.",
    metric: "18,000 ft Peak Achieved",
  },
];
