import { motion } from "framer-motion";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Pawan Achyutanand",
      role: "Full Stack Developer",
      image: "/teamPhotos/pawan.jpg",
      linkedin: "https://www.linkedin.com/in/pawanachyutanand",
      contributions: [
        "Set up Node.js server with Express and WebSockets",
        "Implemented authentication mechanisms",
        "Structured database schema",
      ],
    },
    {
      name: "Anegunta Sai Krishna",
      role: "Full Stack Developer",
      image: "/teamPhotos/saikrishna.jpg",
      linkedin: "https://www.linkedin.com/in/saikrishna-anegunta",
      contributions: [
        "Managed real-time message broadcasting",
        "Created frontend components",
        "Enhanced UI/UX design",
      ],
    },
    {
      name: "Kothakapu Sannihith Reddy",
      role: "Full Stack Developer",
      image: "/teamPhotos/sannihith.jpg",
      linkedin: "https://www.linkedin.com/in/sannihith-reddy-k-527926251",
      contributions: [
        "Designed user interface with React",
        "Integrated database operations",
        "Improved user experience",
      ],
    },
  ];

  const technologies = [
    { name: "React.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "Socket.IO", category: "Backend" },
    { name: "MongoDB", category: "Database" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Team Members Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ scale: 1.02 }}
                className="card bg-base-200"
              >
                <figure className="px-4 pt-4 relative group">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative block"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-xl h-64 w-full object-cover transition-opacity group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <span className="text-white font-medium">View LinkedIn Profile</span>
                    </div>
                  </a>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-xl">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <ul className="mt-2 space-y-1 text-sm text-base-content/70">
                    {member.contributions.map((contribution, index) => (
                      <li key={index}>• {contribution}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.05 }}
                className="card bg-base-200 p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold">{tech.name}</h3>
                  <p className="text-sm text-base-content/70">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default TeamPage; 