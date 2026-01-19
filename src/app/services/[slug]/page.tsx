import SingleServiceDetails from '@/components/services/SingleServiceDetails';

export default function RiskAssessmentPage() {
  return (
    <SingleServiceDetails
      data={{
        title: 'Risk Assessment',
        heroImage: '/images/services/risk-assessment-hero.jpg',

        overview:
          'Our Risk Assessment service empowers organizations to uncover hidden risks, evaluate potential impacts, and strengthen resilience. We provide a structured, data-driven approach to identifying vulnerabilities across operations, technology, and governance.',

        expectation:
          'We begin with a thorough analysis of your current operations, compliance framework, and external risk factors. From there, we deliver actionable insights aligned with your strategic objectives.',

        keyFocus: [
          'Comprehensive review of operational and compliance risks',
          'Identification of financial, strategic, and reputational threats',
          'Scenario planning and impact assessment',
          'Actionable mitigation strategies and roadmap',
        ],

        quote: {
          text:
            'Optimo’s risk assessment gave us clarity we didn’t know we needed. Their insights allowed us to mitigate risks before they became costly issues.',
          author: 'Arjun Mohan',
          role: 'CEO, NorthBay Logistics',
          avatar: '/images/avatars/arjun-mohan.jpg',
        },

        gallery: [
          '/images/services/risk-gallery-1.jpg',
          '/images/services/risk-gallery-2.jpg',
        ],

        sections: [
          {
            title: 'Stakeholder Alignment & Change Enablement',
            description:
              'We ensure all stakeholders understand the organization’s risk posture and mitigation strategies. Through collaborative workshops and leadership alignment, we drive accountability and readiness across teams.',
          },
          {
            title: 'Scenario Planning & Risk Management',
            description:
              'Using scenario-based modeling, we help organizations prepare for potential disruptions. This proactive approach enables faster decision-making, asset protection, and operational continuity.',
          },
        ],
      }}
    />
  );
}
