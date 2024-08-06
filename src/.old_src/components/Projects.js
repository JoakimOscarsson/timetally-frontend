import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, technologies }) => (
  <motion.div
    className="project-card"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="technologies">
      {technologies.map((tech, index) => (
        <span key={index} className="tech-tag">{tech}</span>
      ))}
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1 and its key features.",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project 2",
      description: "An overview of project 2 and its main objectives.",
      technologies: ["Python", "Django", "PostgreSQL"]
    },
    // Add more projects as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="projects"
    >
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
