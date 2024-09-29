import React, { useState } from 'react';
import './home.css'; // Import the external CSS file
import GenreDropdown from './GenreDropdown';
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState([]); // Genre is now an array

  const [movies, setMovies] = useState([]); // To store the fetched movies
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [error, setError] = useState(null); // To handle errors

  

  const handleGenreChange = (selectedGenres) => {
    setGenre(selectedGenres); // Update the genre state in the main component
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loading spinner
    setError(null); // Reset any previous errors

    try {
      console.log(searchTerm, genre);
      
      // Making the API call to fetch data
      const response = await fetch('http://localhost:3000/movie/getmovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title:searchTerm,
          genre, // Pass the array of genres
         
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      // Parse the response as JSON
      const data = await response.json();
      setMovies(data); // Set the movies to state
    } catch (err) {
      setError(err.message); // Handle any errors
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="form-container">
        {/* Search Term Input */}
        <input
          type="text"
          placeholder="Search Movie"
          value={searchTerm.toUpperCase()}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
          className="input"
        />

        {/* Genre Selection (Multiple) */}
        <GenreDropdown onGenreChange={handleGenreChange} />

       
        

     
        <button type="submit" className="submit-button">
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Movies */}
      {movies.length > 0 && (
  <div className="movies-list">
    {movies.map((movie, index) => (
      <div 
        key={index} // Add a key for each element
        className="movie-card" 
        style={{ backgroundImage: `url(${movie.backgroundImage})` }} // Access the image URL from the movie object
      >
        <div className="movie-content">
          <h2 className="movie-title">{movie.title}</h2> {/* Access title from movie */}
          <p className="movie-genre"><strong>Genre:</strong> {movie.genre.join(', ')}</p> {/* Join multiple genres */}
          <p className="movie-release"><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p className="movie-rating"><strong>Rating:</strong> {movie.rating}</p>
          <a href="#" className="update-link">Wrong info? Update</a>
        </div>
      </div>
    ))}
  </div>
)}


      {/* If no movies are found */}
      {!loading && movies.length === 0 && !error && <p>No movies found.</p>}
    </div>
  );
};

export default Home;
