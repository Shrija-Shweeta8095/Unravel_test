// src/utils/transformHotelJson.js
export const transformHotelJson = (dataArray) => {
  if (!Array.isArray(dataArray)) {
    console.warn("Expected an array of hotel objects");
    return [];
  }

  const allVariants = [];

  dataArray.forEach((data, hotelIndex) => {
    const hotel = data.hotel_details || {};
    const videoList = hotel.new_videos || [];
    const images = hotel.images || [];

    data.rooms_by_serial_no?.forEach((group, serialIndex) => {
      group.rooms?.forEach((room, roomIndex) => {
        room.variants?.forEach((variant, variantIndex) => {
          allVariants.push({
            variant_id: variant.variant_id || `${hotelIndex}-${serialIndex}-${roomIndex}-${variantIndex}`,
            room_name: variant.name || room.name || 'Unnamed Room',
            description: hotel.description || '',
            price:
              variant.total_price?.total_price_rounded ||
              null,
            current_price:
              variant.total_price?.discounted_price_rounded ||
              null,
            video_url: videoList[variantIndex]?.video_url?.med || null,
            image: images[0]?.threeX?.landscape || null,
            hotel_name: hotel.name || '',
            serial_no: group.serial_no,
            room_type: room.room_type_code || null,
            bed_type: room.properties.bed_type + " Bed" || null,
            adult_type: variant.display_properties[2].value || null
          });
        });
      });
    });
  });

  return allVariants;
};
