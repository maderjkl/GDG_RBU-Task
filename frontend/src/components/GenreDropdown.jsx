import React, { useState } from 'react';
import './GenreDropdown.css'; // Import your CSS for styling

const GenreDropdown = ({ onGenreChange }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const [selectedGenres, setSelectedGenres] = useState([]); // State to store selected genres
  const genres = ['Action', 'Romance', 'Comedy', 'Adventure', 'Horror'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const handleGenreSelect = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre) // Remove genre if already selected
      : [...selectedGenres, genre]; // Add genre if not selected
    
    setSelectedGenres(newSelectedGenres);
    onGenreChange(newSelectedGenres); // Pass the selected genres to the parent component
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedGenres.length > 0 ? selectedGenres.join(', ') : ' Genre'}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {genres.map((genre) => (
            <div 
              key={genre} 
              className={`dropdown-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
