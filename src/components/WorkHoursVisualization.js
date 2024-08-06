import React, { useState, useEffect } from 'react';
import { Calendar, InfoIcon } from 'lucide-react';
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import ExpandableRow from './ExpandableRow';
import { demoData } from '../data/demoData';
import { formatDateForInput, formatDateForAPI } from '../utils/dateUtils';

const WorkHoursVisualization = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workHours, setWorkHours] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/v1/workhours?start=${formattedStartDate}&end=${formattedEndDate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch work hours');
      }
      const data = await response.json();
      setWorkHours(data);
    } catch (err) {
      setError('Error fetching work hours. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
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
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This application displays the total number of work hours for a specified time period. The weeks shown align with Unit4's report periods. The calculation takes into account:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-blue-700">
              <li>Weekends</li>
              <li>Swedish public holidays (including the Swedish National Day)</li>
              <li>Common non-working days (Easter Eve, Midsummer Eve, Christmas Eve, and New Year's Eve)</li>
              <li>If the Swedish National Day (June 6th) falls on a weekend, the preceding Friday is treated as a non-working day</li>
            </ul>
            <p className="text-sm text-blue-700 mt-2">
              Please note: Due to the method used for estimating Easter, calculations may be inaccurate for dates beyond the year 2100.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
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
