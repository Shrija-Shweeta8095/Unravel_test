import React, { useState } from "react";
import VariantCard from "./components/variantCard";
import fullRoomData from "./mockJson/roomData";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./components/Spinner"
export default function App() {
  const itemsPerPage = 10;

  const [visibleRooms, setVisibleRooms] = useState(
    fullRoomData.slice(0, itemsPerPage)
  );
  const [page, setPage] = useState(1);
  const [hasMoreRooms, setHasMoreRooms] = useState(true);

  const fetchMoreRooms = () => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newRooms = fullRoomData.slice(startIndex, endIndex);

    setVisibleRooms((prev) => [...prev, ...newRooms]);
    setPage((prev) => prev + 1);

    if (endIndex >= fullRoomData.length) {
      setHasMoreRooms(false);
    }
  };

  return (
    <section
      className="container d-flex justify-content-center"
      style={{ minHeight: "100%", padding: "2rem" }}
    >
      <div style={{ width: "100%" }}>
        <h1 className="mb-4 text-center">Room Variants</h1>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          <InfiniteScroll
            dataLength={visibleRooms.length}
            next={fetchMoreRooms}
            hasMore={hasMoreRooms}
            loader={<Spinner />}
            endMessage={<p>No more rooms to load</p>}
          >
            {visibleRooms.map((variant, i) => (
              <VariantCard key={variant.variant_id || i} variant={variant} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
