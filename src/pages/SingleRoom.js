import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import defaultBcg from "../images/Room-1.jpg";

const SingleRoom = () => {
  const { slug } = useParams();
  const { getRoom } = useContext(RoomContext);
  const room = getRoom(slug);

  if (!room) {
    return (
      <div className='error'>
        <h3>No such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          Back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;

  const [mainImg, ...defaultImg] = images;

  return (
    <>
      <StyledHero img={mainImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImg.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>Info</h3>
            <h6>Price: ${price}</h6>
            <h6>Size: {size} SQFT</h6>
            <h6>Max Capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
            <h6>{pets ? "Pets Allowed" : "No Pets Allowed"}</h6>
            <h6>{breakfast && "Free Breakfast Included"}</h6>
          </article>
        </div>
      </section>
      <section className='room-extra'>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SingleRoom;
