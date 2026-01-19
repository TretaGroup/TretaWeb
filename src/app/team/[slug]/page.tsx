import SingleTeamMember from '@/components/team-members/SingleTeamMember';

export default function TeamMemberPage() {
  return (
    <SingleTeamMember
      data={{
        name: 'John Doe',
        role: 'Senior Strategy Consultant',
        image: '/images/team/john-doe.jpg',

        bio:
          'John brings over a decade of experience helping organizations navigate complex transformations. His expertise lies in aligning strategy, operations, and people to drive sustainable growth.',

        expertise: [
          'Business Strategy',
          'Operational Excellence',
          'Risk & Compliance',
          'Change Management',
          'Executive Advisory',
        ],

        experience:
          'With 12+ years in consulting, John has led transformation programs across logistics, finance, and technology sectors, working closely with executive leadership teams.',

        email: 'john.doe@optimo.com',
        linkedin: 'https://linkedin.com/in/johndoe',
      }}
    />
  );
}
