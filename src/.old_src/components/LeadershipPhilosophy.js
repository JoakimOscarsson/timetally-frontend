import React from 'react';
import { motion } from 'framer-motion';

const LeadershipPhilosophy = () => {
  const philosophyPoints = [
    "Lead by example",
    "Foster open communication",
    "Empower team members",
    "Embrace continuous learning"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="leadership-philosophy"
    >
      <h2>Leadership Philosophy</h2>
      <p>My approach to leadership is centered on [Brief Overview of Your Leadership Style].</p>
      <ul>
        {philosophyPoints.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {point}
          </motion.li>
        ))}
      </ul>
      <p>I believe that effective leadership is about [Your Core Leadership Belief].</p>
    </motion.div>
  );
};

export default LeadershipPhilosophy;
