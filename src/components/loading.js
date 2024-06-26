import React from 'react'
import LoadingGif from '../images/loading.gif';

export default function loading() {
  return (
    <div className='loading'>
      <h4>rooms data loading...</h4>
      <img src={LoadingGif} alt='/' />
    </div>
  )
}
