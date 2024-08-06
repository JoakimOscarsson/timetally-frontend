import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ title, company, period, description }) => (
  <motion.div
    className="experience-item"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3>{title} at {company}</h3>
    <p className="period">{period}</p>
    <p>{description}</p>
  </motion.div>
);

const Background = () => {
  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      period: "2018 - Present",
      description: "Lead development of key projects and mentor junior developers."
    },
    {
      title: "Web Developer",
      company: "Digital Agency",
      period: "2015 - 2018",
      description: "Developed responsive websites and web applications for various clients."
    },
    // Add more experiences as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="background"
    >
      <h2>Background</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </motion.div>
  );
};

export default Background;
