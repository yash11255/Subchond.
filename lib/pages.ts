export interface InfoPage {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  summary: string;
  sections: { heading: string; points: string[] }[];
  related: string[]; // slugs (treatments or conditions)
}

export const TREATMENTS: InfoPage[] = [
  {
    slug: "subchond-injection",
    title: "Subchond Injection",
    tagline: "Treating the bone beneath the cartilage to relieve pain and delay replacement",
    image: "/images/bonestress.png",
    summary:
      "A single, minimally invasive, image-guided injection in which the patient's own adipocyte (fat-derived) cell concentrate is delivered into a bone marrow lesion to support stressed subchondral bone.",
    sections: [
      {
        heading: "Who it may suit",
        points: [
          "Knee pain with bone marrow lesions (bone marrow edema) on MRI",
          "Early to moderate osteoarthritis where the joint is still worth preserving",
          "Subchondral insufficiency fractures that have not settled with offloading",
          "Patients who want to delay or avoid total knee replacement",
        ],
      },
      {
        heading: "How it is done",
        points: [
          "3T MRI and standing X-rays map the exact lesion",
          "Under fluoroscopic guidance a small cannula is placed into the lesion",
          "Autologous adipocyte concentrate (with or without PRP) is injected — usually a single session",
          "Often combined with arthroscopy to treat meniscus or cartilage problems",
        ],
      },
      {
        heading: "Recovery",
        points: [
          "Day-care procedure in most cases",
          "Protected weight bearing for 1–2 weeks, then progressive loading",
          "Structured physiotherapy for 6–12 weeks",
          "Follow-up MRI may be used to assess bone healing",
        ],
      },
    ],
    related: ["bone-marrow-edema", "knee-osteoarthritis", "adipocyte-prp"],
  },
  {
    slug: "adipocyte-prp",
    title: "Biologics: Adipocyte Therapy & PRP",
    tagline: "Using your own cells and growth factors to calm pain and support healing",
    image: "/assets/knee-bml-mri.png",
    summary:
      "Adipocyte (fat-derived) cell concentrate and platelet-rich plasma (PRP) are prepared from the patient's own tissue and blood, and delivered into the joint or bone.",
    sections: [
      {
        heading: "Who it may suit",
        points: [
          "Early osteoarthritis and cartilage wear",
          "Chronic tendon problems (patellar tendinopathy)",
          "As an add-on to subchondral or arthroscopic procedures",
        ],
      },
      {
        heading: "Adipocyte therapy vs PRP",
        points: [
          "PRP: from a blood draw, rich in growth factors, mostly anti-inflammatory",
          "Adipocyte concentrate: harvested from a small amount of the patient's own fat, rich in regenerative cells and growth factors",
          "Adipocyte concentrate is the core of the single Subchond injection into the lesion",
        ],
      },
      {
        heading: "What to expect",
        points: [
          "Outpatient procedure under local anaesthesia",
          "Temporary soreness for 2–3 days",
          "Benefit typically builds over 6–12 weeks",
        ],
      },
    ],
    related: ["subchond-injection", "knee-osteoarthritis"],
  },
  {
    slug: "acl-reconstruction",
    title: "ACL Reconstruction",
    tagline: "Restoring knee stability after a ligament tear",
    image: "/images/dr2.png",
    summary:
      "Arthroscopic reconstruction of the anterior cruciate ligament using a tendon graft, with attention to the associated bone bruise and meniscus injury.",
    sections: [
      {
        heading: "Who it may suit",
        points: [
          "Complete ACL tear with giving-way of the knee",
          "Athletes and active people returning to pivoting sports",
          "ACL tear with associated meniscus tear",
        ],
      },
      {
        heading: "Dr. Bora's approach",
        points: [
          "Anatomic graft placement through keyhole surgery",
          "Meniscus repair wherever possible rather than removal",
          "Subchondral bone bruises assessed and treated to protect the joint long term",
        ],
      },
      {
        heading: "Recovery",
        points: [
          "Walking with support from day 1",
          "Return to running around 3–4 months",
          "Return to sport typically 9–12 months after strength testing",
        ],
      },
    ],
    related: ["acl-tear", "meniscus-tear"],
  },
  {
    slug: "arthroscopy",
    title: "Knee Arthroscopy",
    tagline: "Keyhole surgery for meniscus, cartilage and mechanical problems",
    image: "/images/dr3.png",
    summary:
      "A camera and small instruments are introduced through tiny incisions to repair or trim damaged structures inside the knee.",
    sections: [
      {
        heading: "Common uses",
        points: [
          "Meniscus repair or partial meniscectomy",
          "Removal of loose bodies causing locking",
          "Cartilage repair procedures",
          "Plica and synovium problems",
        ],
      },
      {
        heading: "Recovery",
        points: [
          "Usually day-care",
          "Walking within 24 hours for most procedures",
          "Meniscus repair needs a longer, protected rehabilitation",
        ],
      },
    ],
    related: ["meniscus-tear", "acl-reconstruction"],
  },
];

export const CONDITIONS: InfoPage[] = [
  {
    slug: "knee-osteoarthritis",
    title: "Knee Osteoarthritis",
    tagline: "A whole-joint condition, not just worn-out cartilage",
    image: "/assets/knee-oa-xray.png",
    summary:
      "Osteoarthritis involves cartilage, bone, the joint lining, meniscus and muscles. Much of the pain comes from the subchondral bone, which has nerves while cartilage does not.",
    sections: [
      {
        heading: "Common symptoms",
        points: ["Pain on walking or stairs", "Morning stiffness under 30 minutes", "Swelling and crepitus (grinding)", "Reduced range of movement"],
      },
      {
        heading: "How it is graded",
        points: [
          "Kellgren-Lawrence grade 1–4 on standing X-ray",
          "MRI shows cartilage loss, bone marrow lesions and meniscus status",
        ],
      },
      {
        heading: "Treatment ladder",
        points: [
          "Weight management, strengthening and activity changes",
          "Bracing and offloading",
          "Biologics (adipocyte therapy / PRP)",
          "Single Subchond injection for bone marrow lesions",
          "Osteotomy for malalignment; replacement as last resort",
        ],
      },
    ],
    related: ["subchond-injection", "adipocyte-prp", "bone-marrow-edema"],
  },
  {
    slug: "bone-marrow-edema",
    title: "Bone Marrow Edema / Bone Marrow Lesions",
    tagline: "Stressed bone under the cartilage — a key source of knee pain",
    image: "/images/bonestress.png",
    summary:
      "Bright signal on fluid-sensitive MRI sequences that shows overloaded, inflamed subchondral bone. It is strongly linked to pain and faster arthritis progression.",
    sections: [
      {
        heading: "Causes",
        points: ["Overload in osteoarthritis", "Injury (bone bruise after ACL tear)", "Subchondral insufficiency fracture", "Malalignment"],
      },
      {
        heading: "Treatment options",
        points: ["Offloading and activity modification", "Unloader brace", "Single Subchond injection", "Treat the cause (meniscus, alignment)"],
      },
    ],
    related: ["subchond-injection", "knee-osteoarthritis"],
  },
  {
    slug: "meniscus-tear",
    title: "Meniscus Tear",
    tagline: "Injury to the knee's shock absorber",
    image: "/assets/hero-anatomy.png",
    summary:
      "The menisci are C-shaped cartilage cushions. Tears can follow a twisting injury or develop slowly with age.",
    sections: [
      {
        heading: "Symptoms",
        points: ["Joint-line pain", "Swelling", "Catching or locking", "Pain on squatting or twisting"],
      },
      {
        heading: "MRI terms",
        points: [
          "Grade 1–2 signal: degeneration within the meniscus, not a true tear",
          "Grade 3 signal: a tear reaching the surface",
          "Root and bucket-handle tears usually need surgical attention",
        ],
      },
    ],
    related: ["arthroscopy", "knee-osteoarthritis"],
  },
  {
    slug: "acl-tear",
    title: "ACL Tear",
    tagline: "The most common serious ligament injury in sport",
    image: "/images/dr2.png",
    summary:
      "The anterior cruciate ligament controls rotation and forward movement of the shin. Tears usually happen while pivoting or landing.",
    sections: [
      {
        heading: "Signs",
        points: ["A 'pop' at injury", "Rapid swelling", "Knee giving way", "Difficulty returning to sport"],
      },
      {
        heading: "Management",
        points: [
          "Partial tears may do well with physiotherapy",
          "Complete tears in active people usually need reconstruction",
          "Associated bone bruises and meniscus tears must be addressed",
        ],
      },
    ],
    related: ["acl-reconstruction", "meniscus-tear"],
  },
];

export const ALL_PAGES = [...TREATMENTS, ...CONDITIONS];
export const findPage = (slug: string) => ALL_PAGES.find((p) => p.slug === slug);
export const hrefFor = (slug: string) =>
  TREATMENTS.some((t) => t.slug === slug) ? `/treatments/${slug}` : `/conditions/${slug}`;
