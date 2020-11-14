const express = require("express");
const Knex = require("knex");
const router = express.Router();
const knex = require("../database");

// GET http://localhost:5000/api/reservations/

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservations_name = await knex("reservations"); 
    response.json(reservations_name); 
  } catch (error) {
    throw error;
  }
});


// POST http://localhost:5000/api/reservations/ 

router.post("/", async (request, response) => {
  try {
    const insertedReservation = await knex("reservations").insert(request.body.name);
    response.json(insertedReservation);
  } catch (error) {
    response.status(500).send(`
        {
         "id": 4,
         "name": ${request.body.name},
         "email": "bberto989@yahoo.com",
         "mealId": 4
              }`)

  }
});

// GET http://localhost:5000/api/reservations/{2}

router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const meals_id = await (await knex("reservations")).filter(content => content.id === parseInt(request.params.id));
    response.json(meals_id);
  } catch (error) {
    throw error;
  }
});

// PUT http://localhost:5000/api/reservations/{2}

router.put("/:id", async (request, response) => {    
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const update_reservation = await Knex('reservations').where(request.params.id).update( request.body.email );
    response.json(update_reservation);   
  } catch (error) {     

    throw error;  
  } 
});

// DELETE http://localhost:5000/api/reservations/{2}

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const reservations_deleted = await knex("reservations").where(request.params.id).del();
    response.json(reservations_deleted);
  } catch (error) {
    throw error; 
  }
}); 



module.exports = router;
