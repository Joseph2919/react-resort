import React from 'react'
import RoomFilter from '../components/RoomFilter';
import RoomList from '../components/RoomList';
import { withRoomConsumer } from '../context/RoomContext';
import Loading from './loading';

function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;
    if(loading) {
        return <Loading/>
     }
          return (
    <>
      <RoomFilter rooms = {rooms}/>
      <RoomList rooms = {sortedRooms}/>
    </>
  )
}

export default withRoomConsumer(RoomContainer);
