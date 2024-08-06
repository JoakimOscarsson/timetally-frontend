import React from 'react';

const TableVisualization = ({ data, isDarkMode }) => {
  const processData = () => {
    const structuredData = [];
    Object.entries(data).forEach(([year, yearData]) => {
      if (year !== 'total') {
        Object.entries(yearData).forEach(([month, monthData]) => {
          if (month !== 'total') {
            const monthEntry = {
              year,
              yearTotal: yearData.total,
              month: month.split('-')[1],
              monthNumber: month.split('-')[0],
              monthTotal: monthData.total,
              weeks: Object.entries(monthData)
                .filter(([week]) => week !== 'total')
                .map(([week, hours]) => ({ week, hours }))
            };
            structuredData.push(monthEntry);
          }
        });
      }
    });
    return structuredData;
  };

  const processedData = processData();

  const getAlternatingColor = (index, isDark) => {
    if (isDark) {
      return index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
    }
    return index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100';
  };

  const cellStyle = `border p-2 ${isDarkMode ? 'border-gray-600 text-white' : 'border-gray-300'}`;
  
  return (
    <div className="overflow-x-auto mt-4">
      <table className={`w-full border-collapse ${isDarkMode ? 'text-gray-200' : ''}`}>
        <thead>
          <tr>
            {processedData.map((monthData, index) => (
              index === 0 || monthData.year !== processedData[index - 1].year ? (
                <th key={`year-${index}`} 
                    colSpan={processedData.filter(d => d.year === monthData.year).reduce((acc, curr) => acc + curr.weeks.length, 0)} 
                    className={`${cellStyle} text-left ${getAlternatingColor(parseInt(monthData.year) - 1, isDarkMode)}`}>
                  <span className="font-bold">{monthData.year}</span>
                  <span className="font-normal"> - {monthData.yearTotal} hours</span>
                </th>
              ) : null
            ))}
          </tr>
          <tr>
            {processedData.map((monthData, index) => (
              <th key={`month-${index}`} 
                  colSpan={monthData.weeks.length} 
                  className={`${cellStyle} text-left ${getAlternatingColor(parseInt(monthData.monthNumber) - 1, isDarkMode)}`}>
                <span className="font-semibold">{monthData.month}</span>
                <span className="font-normal"> - {monthData.monthTotal} hours</span>
              </th>
            ))}
          </tr>
          <tr>
            {processedData.flatMap(monthData => 
              monthData.weeks.map((week, index) => (
                <th key={`week-${monthData.month}-${index}`} 
                    className={`${cellStyle} ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'} font-normal`}>
                  {week.week.replace('week:', 'Week')}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {processedData.flatMap(monthData => 
              monthData.weeks.map((week, index) => (
                <td key={`hour-${monthData.month}-${index}`} 
                    className={`${cellStyle} text-center`}>
                  {week.hours}
                </td>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableVisualization;
