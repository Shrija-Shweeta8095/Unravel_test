// src/mock/roomData.js
import { transformHotelJson } from '../utils/transformedData';
import sampleJson from './rooms.json';

const roomData = transformHotelJson(sampleJson);

export default roomData;
