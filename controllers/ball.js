var ball = require('../models/ball');
// List of all balls
exports.ball_list = async function (req, res) {
    try{
    theballs = await ball.find();
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
    res.render('ball', { title: 'Ball Search Results', results: theballs });
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
    
// Handle a show one view with id specified by query
exports.ball_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await ball.findById( req.query.id)
    res.render('balldetail',
    { title: 'Ball Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle building the view for creating a ball.
// No body, no in path parameter, no query.
// Does not need to be async
exports.ball_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('ballcreate', { title: 'Ball Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    
// Handle building the view for updating a costume.
// query provides the id
exports.ball_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await  ball.findById(req.query.id)
    res.render('ballupdate', { title: 'Ball Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };


// Handle a delete one view with id from query
exports.ball_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await ball.findById(req.query.id)
    res.render('balldelete', { title: 'Ball Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };