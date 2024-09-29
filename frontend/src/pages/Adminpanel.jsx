import React, { useState } from 'react';
import './AdminPanel.css'; // Importing the CSS file
import toast from 'react-hot-toast';
const MovieForm = () => {
  const [movieName, setMovieName] = useState('');
  const [genres, setGenres] = useState([]); // To store multiple selected genres
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance'];

  // Handle genre selection (multi-select)
  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setGenres(selectedOptions);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const movieData = {
      title:movieName,
      genre:genres, // Sending selected genres as an array
      
released_date:releaseDate,
      rating,
    };

    console.log('Movie Data:', movieData);
try{
    const response =await fetch('http://localhost:3000/movie/savemovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
}
catch(error){
  console.log(error);
}
    // Reset form after submission
    setMovieName('');
    setGenres([]);
    setReleaseDate('');
    setRating('');
  };

  return (
    <div className="form-container">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="movieName">Movie Name</label>
          <input
            type="text"
            id="movieName"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter movie name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genres">Genre</label>
          <select
            id="genres"
            multiple={true} // Enable multiple selection
            value={genres}
            onChange={handleGenreChange}
            required
          >
            {genreOptions.map((genre, index) => (
              <option key={index} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            step="0.1"
            placeholder="Enter rating (1-10)"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;
