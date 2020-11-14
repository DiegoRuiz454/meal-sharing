const express = require("express");
const Knex = require("knex");
const router = express.Router();
const knex = require("../database");

//GET api/meals/ query parameters

//api/meals?maxPrice=90

router.get("/", async (request, response) => {
  try {
    console.log(request.query);
    // knex syntax for selecting things. Look up the documentation for knex for further info

    let output = await knex("meals").where("price", "<", '90');
    if (request.query.maxPrice === '90' ){ 
   response.send(output)};
  } catch (error) {
    throw error;
  }
});

//api/meals?availableReservations=true

router.get("/", async (request, response) => {
  try {
    console.log(request.query);
    // knex syntax for selecting things. Look up the documentation for knex for further info
    
    let output = await knex("meals").where(knex("meals.reservations INNER JOIN meals ON resrevartions.meal_id = meals.id ORDER BY reservations.id DESC;"));
    if (request.query.maxPrice === 'true' ){ 
   response.send(output)};
  } catch (error) {
    throw error;
  }
});

//api/meals?title=Rød_grød_med 

router.get("/", async (request, response) => {
  try {
    console.log(request.query);
    // knex syntax for selecting things. Look up the documentation for knex for further info

    let output = await knex("meals").where("tilte", "LIKE", req.query.title).select();
    if (request.query.title === 'Rød grød med fløde' ){ 
   response.send(output)};
  } catch (error) {
    throw error;
  }
});


//api/meals?createdAfter=2019-04-05

router.get("/", async (request, response) => {
  try {
    console.log(request.query);
    // knex syntax for selecting things. Look up the documentation for knex for further info

    let output = await knex("meals").where("created_date", ">", request.query.createdAfter);
    if (request.query.createdAfter === '2019-04-05' ){ 
   response.send(output)};
  } catch (error) {
    throw error;
  }
});

//api/meals?limit=4

router.get("/", async (request, response) => {
  try {
    console.log(request.query);
    // knex syntax for selecting things. Look up the documentation for knex for further info

    let output = await knex("meals").limit(request.query.limit).select();
    if (request.query.limit === '4' ){ 
   response.send(output)};
  } catch (error) {
    throw error;
  }
});


// GET http://localhost:5000/api/meals/

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});


// POST http://localhost:5000/api/meals/ 

router.post("/", async (request, response) => {
  try {
    const insertedMeal = await knex("meals").insert(request.body.id);
    response.json(insertedMeal);
  } catch (error) {
    response.status(500).send(`{ 
      "id" : ${request.body.id},
      "NumberOfGuests" : 7,
      "title" : "colombian food",
      "description" : "great taste",
      "adress" : "asdsd",
      "time": "asd",
      "price" : 150,
      "reviews" : []
    }`)

  }
});

// GET http://localhost:5000/api/meals/{2}

router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const meals_id = await (await knex("meals")).filter(content => content.id === parseInt(request.params.id));
    response.json(meals_id);
  } catch (error) {
    throw error;
  }
});

// PUT http://localhost:5000/api/meals/{2}

router.put("/:id", async (request, response) => {    
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const update_meal = await Knex('meals').where(request.params.id).update( request.body.title );
    response.json(update_meal);   
  } catch (error) {     
    throw error;  
  } 
});

// DELETE http://localhost:5000/api/meals/{2}

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const meals_deleted = await knex("meals").where(request.params.id).del();
    response.json(meals_deleted);
  } catch (error) {
    throw error; 
  }
});



module.exports = router;
