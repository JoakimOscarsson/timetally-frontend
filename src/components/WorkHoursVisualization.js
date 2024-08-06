import React, { useState, useEffect } from 'react';
import { Calendar, InfoIcon, Sun, Moon } from 'lucide-react';
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import ExpandableRow from './ExpandableRow';
import TableVisualization from './TableVisualization';
import { formatDateForInput, formatDateForAPI, isValidDate } from '../utils/dateUtils';

// Cookie helper functions
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};


const WorkHoursVisualization = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');
  const [workHours, setWorkHours] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visualizationType, setVisualizationType] = useState('table');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = getCookie('colorMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setCookie('colorMode', isDarkMode ? 'dark' : 'light', 365);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    setStartDate(formatDateForInput(today));
    setEndDate(formatDateForInput(oneWeekFromNow));
    setStartDateText(formatDateForInput(today));
    setEndDateText(formatDateForInput(oneWeekFromNow));
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateText(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateText(e.target.value);
  };

  const handleStartDateTextChange = (e) => {
    setStartDateText(e.target.value);
    if (isValidDate(e.target.value)) {
      setStartDate(e.target.value);
    }
  };

  const handleEndDateTextChange = (e) => {
    setEndDateText(e.target.value);
    if (isValidDate(e.target.value)) {
      setEndDate(e.target.value);
    }
  };

  const fetchWorkHours = async () => {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      setError('Please enter valid dates in the format YYYY-MM-DD');
      return;
    }

    const formattedStartDate = formatDateForAPI(startDate);
    const formattedEndDate = formatDateForAPI(endDate);
    
    setError('');
    setWorkHours(null);
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/v1/workhours?start=${formattedStartDate}&end=${formattedEndDate}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch work hours');
      }
      
      const data = await response.json();
      setWorkHours(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderWeeks = (weekData) => {
    return Object.entries(weekData)
      .filter(([key]) => key.startsWith("week"))
      .map(([week, hours]) => (
        <tr key={week} className="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td className="p-2 border pl-12 dark:border-gray-700">{week}</td>
          <td className="p-2 border text-right dark:border-gray-700">{hours}</td>
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

  const toggleVisualization = () => {
    setVisualizationType(prev => prev === 'expandable' ? 'table' : 'expandable');
  };

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center dark:text-white">Time-Tally</h1>
        <Button onClick={toggleTheme} className="p-2 rounded-full">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 dark:bg-gray-800 dark:border-blue-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-gray-300">
              This application displays the total number of work hours for a specified time period. The weeks shown align with Unit4's report periods. The calculation takes into account:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-blue-700 dark:text-gray-300">
              <li>Weekends</li>
              <li>Swedish public holidays</li>
              <li>Common Swedish non-working days (Midsummer Eve and Christmas Eve)</li>
              <li>If the Swedish National Day (June 6th) falls on a weekend, the preceding Friday is treated as a non-working day</li>
              <li>Bridge days are treated as working days</li>
            </ul>
            <p className="text-sm text-blue-700 dark:text-gray-300 mt-2">
              Please note: Due to the method used for estimating Easter, calculations may be inaccurate for dates beyond the year 2100.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
          <div className="relative flex">
            <input
              type="text"
              value={startDateText}
              onChange={handleStartDateTextChange}
              placeholder="YYYY-MM-DD"
              className="border border-gray-300 rounded-l px-3 py-2 w-full text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="bg-gray-100 border border-gray-300 rounded-r px-3 py-2 flex items-center dark:bg-gray-600 dark:border-gray-500">
                <Calendar className="text-gray-400 dark:text-gray-300" size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
          <div className="relative flex">
            <input
              type="text"
              value={endDateText}
              onChange={handleEndDateTextChange}
              placeholder="YYYY-MM-DD"
              className="border border-gray-300 rounded-l px-3 py-2 w-full text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="bg-gray-100 border border-gray-300 rounded-r px-3 py-2 flex items-center dark:bg-gray-600 dark:border-gray-500">
                <Calendar className="text-gray-400 dark:text-gray-300" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>     
 
      <div className="flex justify-between items-center mb-4">
        <Button onClick={fetchWorkHours} className="flex-grow mr-2" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Work Hours'}
        </Button>
        <Button onClick={toggleVisualization} className="flex-shrink-0">
          Toggle View
        </Button>
      </div>


      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {workHours && (
        <>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Total Hours: {workHours.total}</h2>
          {visualizationType === 'expandable' ? (
            <table className="w-full border-collapse border dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="p-2 border text-left dark:border-gray-700 dark:text-white">Period</th>
                  <th className="p-2 border text-right dark:border-gray-700 dark:text-white">Hours</th>
                </tr>
              </thead>
              <tbody>
                {renderYears()}
              </tbody>
            </table>
          ) : (
            <TableVisualization data={workHours} isDarkMode={isDarkMode} />
          )}
        </>
      )}
    </div>
  );
};
    
export default WorkHoursVisualization;
