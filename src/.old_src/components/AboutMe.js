import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="about-me"
    >
      <h2>About Me</h2>
      <p>Hello! I'm [Your Name], a [Your Profession] passionate about [Your Interests]. With [X] years of experience in [Your Field], I specialize in [Your Specialties].</p>
      <p>My goal is to [Your Professional Goal or Mission Statement]. I'm always eager to take on new challenges and continue learning in this ever-evolving field.</p>
      <ul className="skills">
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
        <li>Skill 4</li>
      </ul>
    </motion.div>
  );
};

export default AboutMe;
