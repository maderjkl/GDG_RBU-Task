import movies from "../models/moviemodel.js";

export const savemovie = async (req, res) => {
    try{
        const{title,genre,released_date,rating}=req.body;
        
        if(!title || !genre || !released_date || !rating){
            res.status(400).json({message:"Please fill all the fields"});
        }
         const checkexit=await movies.findOne({title:title,genre:{ $in: genre },released_date:released_date,rating:rating});
         
        if(checkexit){
           return  res.status(400).json({message:"Movie already exists"});
        }

        const newmovie=new movies({title,genre,released_date,rating});
       
        const savedmovie=await newmovie.save();   
        
        if(!savedmovie) throw new Error("something went wrong"); 
        return res.status(201).json({message:"Movie added successfully",movie:savedmovie});
    }
    catch(error){
    return  res.status(500).json({message:error.message})
    }

    
}

export const getallmovie = async (req, res) => {
    try {
        console.log("Fetching all movies");
        const moviesList = await movies.find(); // Fetch all movies from the database
        console.log(moviesList); // Log the fetched movies
        
        // If no movies are found, send an empty array
        if (moviesList.length === 0) {
            console.log("No movies found, returning an empty array.");
            return res.status(200).json([]); // Return an empty array if no movies found
        }

        // If movies are found, log success and return the movies
        console.log("Movies fetched successfully");
        return res.status(200).json( moviesList ); // Use shorthand for the object
    } catch (error) {
        console.error("Error fetching movies:", error.message); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" }); // Return an error response
    }
}


export const getmovie = async (req, res) => {
    try{
       
        const{title,genre}=req.body;
        console.log(title,genre)
        const movie=await movies.find({title:title,genre:{ $in: genre }});
        console.log(movie)
        console.log("in get one")
        if(movie.length===0) {
            console.log("in not movie")
          
        }
        res.status(200).json(movie);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }       
}


export const updatemovie = async (req, res) => {
    try{
        const{title,genre,released_date,rating}=req.body;
        const movie=await movies.findOneAndUpdate({title:title,genre:genre,released_date:released_date,rating:rating});
      
        
        if(movie.length===0) {
            console.log("in not movie")
            next();
        }
        res.status(200).json(movie);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }       
}