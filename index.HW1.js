const express = require("express")
const { initializeDatabase } = require("./db/db.connect")
const app = express()
const Restaurants = require("./models/restaurants.model")

app.use(express.json())
initializeDatabase()

async function createRestaurant(newRestaurant){
   try{
const restaurant = new Restaurants(newRestaurant)
const saveRestaurant = await restaurant.save()
return saveRestaurant
   }catch(error){
throw error
   }
} 

app.post("/restaurants", async(req, res) =>{
    try{
const savedRestaurant = await createRestaurant(req.body)
res.status(201).json({message: "Restaurant added successfully.", restaurant: savedRestaurant})
    }catch(error){
        res.status(500).json({error: "Failed to add restaurant."})
    }
})


async function deleteRestaurant(restaurantId) {
    try{
        const deletedRestaurant = await Restaurants.findByIdAndDelete(restaurantId)
        return deletedRestaurant    
    } catch (error){
        console.log(error)
        }
}

app.delete("/restaurants/:restaurantId", async(req, res) =>{
    try{
        const restaurant = await deleteRestaurant(req.params.restaurantId)
        res.status(200).json({message: "Restaurant deleted succesfully.", restaurant: restaurant})
        
    } catch (error){
        res.status(500).json({error: "Failed to delete restaurant."})
        }
})


// Updating using POSTMAN

async function updateRestaurant(restaurantId, dataToUpdate){
    try{
        const updatedRestaurant = await Restaurants.findByIdAndUpdate(restaurantId, dataToUpdate, {new: true});
        return updatedRestaurant   
    } catch (error){
        console.log(error)
        }
}


app.post("/restaurants/:restaurantId", async(req,res)=>{
    try{
const restaurant = await updateRestaurant(req.params.restaurantId, req.body)
if(restaurant){
res.status(200).json({message: "Restaurant updated successfully.", restaurant: restaurant})
} else{
    res.status(404).json({message: "Restaurant not found."})
}
    }catch(error){
        res.status(500).json({error: "Failed to update restaurant."})
        }
})


const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`)
})