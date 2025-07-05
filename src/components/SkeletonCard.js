import React from 'react';

const SkeletonCard = () => (
  <div className="bg-gray-100 animate-pulse rounded shadow-md overflow-hidden">
    <div className="w-full h-48 bg-gray-300" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-5/6" />
      <div className="h-3 bg-gray-300 rounded w-2/3" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-3" />
    </div>
  </div>
);

export default SkeletonCard;
