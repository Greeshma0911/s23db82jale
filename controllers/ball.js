var ball = require('../models/ball');
// List of all balls
exports.ball_list = async function (req, res) {
    try{
    theballs = await ball.find();
    console.log(theballs);
    res.send(String(theballs));

    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


   // for a specific Ball.
exports.ball_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await ball.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    

// // for a specific ball.
//exports.ball_detail = function(req, res) {
//  res.send('NOT IMPLEMENTED: shoe detail: ' + req.params.id);
// };
// // Handle ball create on POST.
// exports.shoe_create_post = function(req, res) {
//  res.send('NOT IMPLEMENTED: shoe create POST');
// };
// // Handle ball delete form on DELETE.
// exports.ball_delete = function(req, res) {
//  res.send('NOT IMPLEMENTED: shoe delete DELETE ' + req.params.id);
// };
// // Handle ball update form on PUT.
// exports.ball_update_put = function(req, res) {
//  res.send('NOT IMPLEMENTED: shoe update PUT' + req.params.id);
// };
// VIEWS
// Handle a show all view
exports.ball_view_all_Page = async function(req, res) {
    try{
    theballs = await ball.find();
    res.render('ball', { title: 'ball Search Results', results: theballs });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

  // Handle Costume update form on PUT.
exports.ball_update_put = async function(req, res) {
   console.log(`update on id ${req.params.id} with body
   ${JSON.stringify(req.body)}`)
   try {
   let toUpdate = await ball.findById( req.params.id)
   // Do updates of properties
   if(req.body.ball_type)
   toUpdate.ball_type = req.body.ball_type;
   if(req.body.ball_size) toUpdate.ball_size = req.body.ball_size;
   if(req.body.ball_cost) toUpdate.ball_cost = req.body.ball_cost;
   let result = await toUpdate.save();
   console.log("Sucess " + result)
   res.send(result)
   } catch (err) {
   res.status(500)
   res.send(`{"error": ${err}: Update for id ${req.params.id}
   failed`);
   }
   };


    // Handle ball create on POST.
exports.ball_create_post = async function(req, res) {
    console.log(req.body)
    let document = new ball();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    //{"ball_size":100, "ball_type":"throw_ball", "ball_cost":1000}
    document.ball_size = req.body.ball_size;
    document.ball_type = req.body.ball_type;
    document.ball_cost = req.body.ball_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


   // Handle Ball delete on DELETE.
exports.ball_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await ball.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    