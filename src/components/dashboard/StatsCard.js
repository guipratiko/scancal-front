import React from 'react';

const StatsCard = ({ title, value, target, unit, color = 'green' }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-100';
      case 'red':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const percentage = target > 0 ? Math.round((value / target) * 100) : 0;

  return (
    <div className="card p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</h3>
        <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getColorClasses(color)}`}>
          {percentage}%
        </div>
      </div>
      
      <div className="flex items-baseline">
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
          {Math.round(value)}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 ml-1">{unit}</span>
      </div>
      
      <div className="mt-2 sm:mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span className="truncate">Meta: {Math.round(target)} {unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
          <div
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              color === 'blue' ? 'bg-blue-500' :
              color === 'yellow' ? 'bg-yellow-500' :
              color === 'red' ? 'bg-red-500' :
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
