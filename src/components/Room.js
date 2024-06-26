import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/Room-1.jpg';
import PropTypes from 'prop-types';

export default function Room({ room }) {
  const { name, slug, images, price } = room;
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="overlay"></div>
        <div className='price-top'>
          <div className='price'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link"> Features </Link>
      </div></div>
      <p className='room-info'>{name}</p>
      
      
    </article>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
