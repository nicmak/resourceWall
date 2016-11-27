"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");


module.exports = (knex) => {

router.get("/allCards", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
    });
});

//This will accept post requests that are /api/users + /cards
//And then will execute the following code...
router.post("/login", (req,res)=>{
  knex("")
});



router.post("/cards", (req,res) => {
  console.log("MAKING CARD");
  console.log(req.session.user_id)
  res.send(req.body);
  knex('cards')
    .insert({
      url: req.body.url,
      title: req.body.title,
      notes: req.body.notes,
      user_id: req.session.user_id //knex('users').select("id") //foreign key!
  })
  .then(function(response) {
    console.log("GREAT Card!!");
  })
  .catch(function(error){
    console.log(error,"CARD, MOTHAFUCKAAAA")
  })


  knex('categories')
    .insert({
      category_name: req.body.categories,
      card_id: null // knex('cards').select("id") //FOREIGN KEYS!
  })
  .then(function(response) {
    console.log("GREAT CATEGORY !!");
  })
  .catch(function(error){
    console.log(error,"CATEGORY, MOTHAFUCKAAAA")
  })

  // knex('cards_categories')
  //   .insert({
  //     card_id: null, // knex('cards').select("id") //FOREIGN KEYS!
  //     category_id: null // knex('categories').select("id")
  // })
  // .then(function(response) {
  //   console.log("Established cards_categories join !!");
  // })
  // .catch(function(error){
  //   console.log(error,"Did not establish cards_categories join!!!")
  // })

  // knex('likes')
  //   .insert({
  //     cards_id: "Liked",
  //     user_id: "Liked"
  //   })
  //   .then(function(response) {
  //     console.log("You liked this card");
  //   })
  //   .catch(function(error) {
  //     console.log(error, "You didn't like the card")
  //   })

  // knex('ratings')
  //   .insert({
  //     user_id: null,
  //     card_id: null,
  //     rating: null
  //   })
  //   .then(function(response){
  //     console.log("You rated the card")
  //   })
  //   .catch(function(error) {
  //     console.log(error,"you didnt rate the card")
  //   })

  // knex('comments')
  //   .insert ({
  //     user_id: null,
  //     timestamp: null,
  //     content: null,
  //     card_id: null,
  //   })
  //   .then(function(response) {
  //     console.log("You commented a card")
  //   })
  //   .catch(function(error) {
  //     console.log(error, "You did not comment a card")
  //   })

  //CAN I INCLUDE ANOTHER KNEX STATEMENT UNDERNEATH THAT WOULD RUN STIL;
})

router.post("/registration", (req, res) => {
  console.log("registration body", req.body);
  // res.send(req.body);
  // req.bod
  knex("users")
    .returning('id')
    .insert({
      first_name: req.body.firstName,
      last_name:  req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    .then(function(user) {
      req.session.user_id = user[0]
      console.log("req is here",req.session.user_id);
      console.log("GREAT Registration!!");
      console.log("Great cookie key assigned");
      res.redirect('/user')
    })
    .catch(function(error){
      console.log(error,"REGISTER, MOTHAFUCKAAAA")
    })



});
return router
}
