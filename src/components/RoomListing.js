import React, { useEffect, useState, useRef, useCallback } from 'react';
import RoomCard from './RoomCard';
import SkeletonCard from './SkeletonCard';

const RoomListing = ({ fetchRooms }) => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef();

  const loadMoreRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const newRooms = await fetchRooms(page);
      setRooms((prev) => [...prev, ...newRooms]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
      setError('Failed to load more rooms.');
    } finally {
      setLoading(false);
    }
  }, [page, fetchRooms]);

  useEffect(() => {
    loadMoreRooms();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreRooms();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [loaderRef, loading, loadMoreRooms]);

  return (
    <div className="room-listing grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room, idx) => (
        <RoomCard key={room.id || idx} room={room} />
      ))}
      {loading && Array(3).fill(0).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      {error && <div className="error">{error}</div>}
      <div ref={loaderRef} className="loading-trigger"></div>
    </div>
  );
};

export default RoomListing;
