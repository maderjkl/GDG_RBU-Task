// MovieInfoCard.js
import React from 'react';
import './Card.css';

const Card = ({ title, genre, releaseDate, rating, backgroundImage }) => {
  return (
    <div 
      className="movie-card" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="movie-content">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-genre"><strong>Genre:</strong> {genre}</p>
        <p className="movie-release"><strong>Release Date:</strong> {releaseDate}</p>
        <p className="movie-rating"><strong>Rating:</strong> {rating}</p>
    
      </div>
    </div>
  );
};

export default Card;
