import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const ExpandableRow = ({ label, hours, children, level = 0, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <>
      <tr className={`cursor-pointer hover:bg-gray-100 ${level === 0 ? 'font-bold' : ''}`} onClick={toggleExpand}>
        <td className="p-2 border">
          <div className="flex items-center">
            {children && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            <span className={`ml-${level * 4}`}>{label}</span>
          </div>
        </td>
        <td className="p-2 border text-right">{hours}</td>
      </tr>
      {isExpanded && children}
    </>
  );
};

export default ExpandableRow;
