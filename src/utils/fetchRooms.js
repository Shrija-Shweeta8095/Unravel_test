// utils/fetchRooms.ts
import sampleData from '../mockJson/rooms.json'; 
import { transformHotelJson } from './transformedData';

const transformedRooms = transformHotelJson(sampleData);

console.log(sampleData,"sampleData")
// Simulate paginated fetch (like an API)
export const fetchRooms = (page, limit = 5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * limit;
      const end = start + limit;
      resolve(transformedRooms.slice(start, end));
    }, 1000); // simulate network delay
  });
};
