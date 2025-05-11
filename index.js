const express = require("express")
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase} = require ("./db/db.connect")
const Movie = require("./models/movie.models")

app.use(express.json())
initializeDatabase()

async function readAllMovies() {
    const movies = await Movie.find()
    return movies
}

app.get("/movies", async(req,res) =>{
  try{
        const allMovies = await readAllMovies()
        if(allMovies){
          res.json(allMovies)
        }else{
        res.status(404).json({error: "Movies not found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch movies."})
        }
})


async function readMovieByTitle(movieTitle) {
    try {
         const movieByTitle = await Movie.findOne({title: movieTitle})
    return movieByTitle
    } catch (error) {
     throw error
    }
   
}

app.get("/movies/:movieTitle", async(req,res) =>{
    try {
        const movie = await readMovieByTitle(req.params.movieTitle)
        if(movie){
res.json(movie)
        } else{ res.status(404).json({error: "Movie not found."})}  
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movie."})
    }
})
//Adding data to database using POSTMAN

async function createMovie(newMovie){
try{
const movie = new Movie(newMovie)
const saveMovie = await movie.save()
return saveMovie
} catch(error){
throw error
}
}

app.post("/movies", async (req,res) =>{
    try{
        const savedMovie = await createMovie(req.body)
        res.status(201).json({message: "Movie added succesfully.", movie: savedMovie})
        
    } catch (error){
        res.status(500).json({error: "Failed to add movie."})
        }
})

//Deleting from DB using POSTMAN

async function deleteMovie(movieId){
    try{
        const deletedMovie = await Movie.findByIdAndDelete(movieId)
        return deletedMovie     
    } catch (error){
        console.log(error)
        }
}


app.delete("/movies/:movieId", async (req,res) =>{
    try{
        const movie = await deleteMovie(req.params.movieId)
        res.status(200).json({message: "Movie deleted succesfully.", movie: movie})
        
    } catch (error){
        res.status(500).json({error: "Failed to delete movie."})
        }
})


//Updating in DB using POSTMAN

async function updateMovie(movieId, dataToUpdate){
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true});
        return updatedMovie     
    } catch (error){
        console.log(error)
        }
}


app.post("/movies/:movieId", async(req,res)=>{
    try{
const movie = await updateMovie(req.params.movieId, req.body)
if(movie){
res.status(200).json({message: "Movie updated successfully.", movie: movie})
} else{
    res.status(404).json({message: "Movie not found."})
}
    }catch(error){
        res.status(500).json({error: "Failed to update movie."})
        }
})

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`)
})