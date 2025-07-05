import React from "react";
import VariantCard from "./variantCard";

const RoomCard = ({ room }) => (
  <div className="room-card p-4 shadow-md rounded bg-white border">
    {room.video_url ? (
      <video
        src={room.video_url}
        controls
        muted
        playsInline
        preload="none"
        className="mb-4 rounded"
      />
    ) : room.image ? (
      <img src={room.image} alt={room.room_name} className="mb-4 rounded" />
    ) : null}
    <h3 className="text-lg font-bold mb-1">{room.room_name}</h3>
    <p className="text-sm text-gray-600 mb-3">{room.description}</p>

    {room.variants?.map((variant, i) => (
      <VariantCard key={i} variant={variant} />
    ))}
  </div>
);

export default RoomCard;
