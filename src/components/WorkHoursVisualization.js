import React, { useState, useEffect } from 'react';
import { Calendar, InfoIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ExpandableRow from './ExpandableRow';
import { demoData } from '../data/demoData';
import { formatDateForInput, formatDateForAPI } from '../utils/dateUtils';

const WorkHoursVisualization = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workHours, setWorkHours] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    setStartDate(formatDateForInput(today));
    setEndDate(formatDateForInput(oneWeekFromNow));
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    e.target.blur();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    e.target.blur();
  };

  const fetchWorkHours = async () => {
    const formattedStartDate = formatDateForAPI(startDate);
    const formattedEndDate = formatDateForAPI(endDate);
    
    setError('');
    setWorkHours(null);
    
    setTimeout(() => {
      setWorkHours(demoData);
    }, 500);

    // Future API call logic here
  };

  const renderWeeks = (weekData) => {
    return Object.entries(weekData)
      .filter(([key]) => key.startsWith("week"))
      .map(([week, hours]) => (
        <tr key={week} className="hover:bg-gray-50">
          <td className="p-2 border pl-12">{week}</td>
          <td className="p-2 border text-right">{hours}</td>
        </tr>
      ));
  };

  const renderMonths = (yearData) => {
    return Object.entries(yearData)
      .filter(([key, value]) => key !== "total" && typeof value === "object")
      .map(([monthKey, monthData]) => (
        <ExpandableRow key={monthKey} label={monthKey.split('-')[1]} hours={monthData.total} level={1}>
          {renderWeeks(monthData)}
        </ExpandableRow>
      ));
  };

  const renderYears = () => {
    return Object.entries(workHours)
      .filter(([key, value]) => key !== "total" && typeof value === "object")
      .map(([year, yearData]) => (
        <ExpandableRow key={year} label={year} hours={yearData.total} defaultExpanded={true}>
          {renderMonths(yearData)}
        </ExpandableRow>
      ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Time-Tally</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        {/* Info box content */}
      </div>

      <div className="mb-4 flex space-x-4">
        {/* Date inputs */}
      </div>
      
      <Button onClick={fetchWorkHours} className="w-full mb-4">
        Get Work Hours
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {workHours && (
        <>
          <h2 className="text-xl font-semibold mb-2">Total Hours: {workHours.total}</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">Period</th>
                <th className="p-2 border text-right">Hours</th>
              </tr>
            </thead>
            <tbody>
              {renderYears()}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default WorkHoursVisualization;
