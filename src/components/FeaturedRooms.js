import React from 'react';
import { useRoomContext } from '../context/RoomContext';
import Room from './Room';
import LoadingGif from '../components/loading';

const FeaturedRooms = () => {
  const { loading, featuredRooms } = useRoomContext();
  console.log(LoadingGif)

  if (loading) {
    return <LoadingGif />;
  }

  return (
    <section className="featured-rooms">
      <h2 className="featured-rooms-title">Featured Rooms</h2>
      <div className="featured-rooms-center">
        {featuredRooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
