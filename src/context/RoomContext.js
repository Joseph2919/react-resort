import React, { useState, useEffect, createContext, useContext } from 'react';
//import items from '../Data';
import Client from '../contentful';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Client.getEntries({
          content_type: "Resort",
          order:"sys.createdAt"
        });console.log("Contentful Response: ", response);

        let roomsData = formatData(response.items);
        console.log("Formatted Rooms Data: ", roomsData);
        let featuredRoomsData = roomsData.filter((room) => room.featured === true);
        let maxPrice = Math.max(...roomsData.map(item => item.price));
        let maxSize = Math.max(...roomsData.map(item => item.size));
        setRooms(roomsData);
        setSortedRooms(roomsData);
        setFeaturedRooms(featuredRoomsData);
        setLoading(false);
        setPrice(maxPrice);
        setMaxPrice(maxPrice);
        setMaxSize(maxSize);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
}, []);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    const room = rooms.find((room) => room.slug === slug);
    return room;
  };

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    switch(name) {
      case 'type':
        setType(value);
        break;
      case 'capacity':
        setCapacity(parseInt(value));
        break;
      case 'price':
        setPrice(parseInt(value));
        break;
        case 'minPrice':
          setMinPrice(parseInt(value));
          break;
        case 'maxPrice':
          setMaxPrice(parseInt(value));
          break;
      case 'minSize':
        setMinSize(parseInt(value));
        break;
      case 'maxSize':
        setMaxSize(parseInt(value));
        break;
      case 'breakfast':
        setBreakfast(value);
        break;
      case 'pets':
        setPets(value);
        break;
      default:
        break;
    }
    filterRooms();
  };

  const filterRooms = () => {
    let tempRooms = [...rooms];
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    tempRooms = tempRooms.filter(room => room.price <= price);
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    setSortedRooms(tempRooms);
  };

  return (
    <RoomContext.Provider value={{ rooms, sortedRooms, featuredRooms, loading, getRoom, handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoomContext = () => {
  return useContext(RoomContext);
};

const withRoomConsumer = (Component) => {
  return function ConsumerWrapper(props) {
    return (
      <RoomContext.Consumer>
        {value => <Component {...props} context={value} />}
      </RoomContext.Consumer>
    );
  };
};

export { RoomProvider, useRoomContext, RoomContext, withRoomConsumer };
