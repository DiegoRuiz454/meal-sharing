const express = require("express");
const Knex = require("knex");
const router = express.Router();
const knex = require("../database");

// GET http://localhost:5000/api/reviews/

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reviews_names = await knex("reviews"); 
    response.json(reviews_names);
  } catch (error) {
    throw error;
  }
});


// POST http://localhost:5000/api/reviews/ 

router.post("/", async (request, response) => {
  try {
    const insertedreviews = await knex("reviews").insert(request.body.content);
    response.json(insertedreviews);
  } catch (error) {
    response.status(500).send(`{
        "id": 4,
        "numberOfStars": 3,
        "content": ${request.body.content},
        "mealId": 4,
        "createdAt": 123455
      }`)

  }
});

// GET http://localhost:5000/api/reviews/{2}

router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const review_id = await (await knex("reviews")).filter(content => content.id === parseInt(request.params.id));
    response.json(review_id);
  } catch (error) {
    throw error;
  }
});

// PUT http://localhost:5000/api/reviews/{2}

router.put("/:id", async (request, response) => {    
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const update_review = await Knex('reviews').where({id :request.params.id}).update( request.body.content );
    response.json(update_review);   
  } catch (error) {     
    throw error;  
  }  
});

// DELETE http://localhost:5000/api/reviews/{2}

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const meals_deleted = await knex("reviews").where(request.params.id).del();
    response.json(meals_deleted);
  } catch (error) {
    throw error; 
  }
});



module.exports = router;
