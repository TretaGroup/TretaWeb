import CaseStudyDetails from "@/components/case-studies/SingleCaseStudy";

export default function CaseStudySinglePage(){
    return (
        <CaseStudyDetails
  data={{
    title: 'Optimizing Workflow for Higher Profits',
    heroImage: '/images/case-study-hero.jpg',
    client: 'NorthBay Logistics',
    location: 'Chicago, Illinois, USA',
    service: 'Strategy & Planning',
    duration: '10 Months & 15 Days',
    overview:
      'NorthBay Logistics, a growing logistics company, faced operational inefficiencies...',
    challenges: [
      'Fragmented operational processes',
      'Lack of standardized workflows',
      'Delayed decision-making',
      'Difficulty scaling operations',
    ],
    gallery: [
      '/images/gallery-1.jpg',
      '/images/gallery-2.jpg',
      '/images/gallery-3.jpg',
      '/images/gallery-4.jpg',
    ],
    approach: [
      'Process reengineering and workflow standardization',
      'Implementation of smart analytics',
      'Cross-functional team alignment',
    ],
    results: [
      { value: '25%', label: 'Reduction in costs' },
      { value: '40%', label: 'Faster turnaround times' },
      { value: '35%', label: 'Increase in efficiency' },
      { value: '50%', label: 'Strategic goal alignment' },
    ],
    finalThoughts:
      'By aligning strategy with execution, NorthBay Logistics unlocked sustainable growth.',
  }}
/>

    )
}