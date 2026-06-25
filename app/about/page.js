export const metadata = {
  title: 'About Us | MediumClone',
  description: 'Learn more about MediumClone — a platform for sharing ideas and stories.',
};

const TEAM = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  { name: 'Marcus Williams', role: 'CTO & Co-Founder', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  { name: 'Priya Patel', role: 'Head of Product', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  { name: 'James Roberts', role: 'Lead Engineer', avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
];

const STATS = [
  { label: 'Active writers', value: '10,000+' },
  { label: 'Articles published', value: '250,000+' },
  { label: 'Monthly readers', value: '5M+' },
  { label: 'Countries reached', value: '150+' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-24 px-4 text-center border-b border-gray-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Every idea has a home here
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          MediumClone is an open platform where over 10,000 writers share their ideas. A place to read, write, and deepen your understanding of the topics that matter most to you.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            We believe that what you read and write matters. Words can divide or they can connect us. We want to lean into connection — building a place where thoughtful people share their stories, expertise, and ideas. A place where quality beats quantity, and depth beats clickbait.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-indigo-100" />
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
