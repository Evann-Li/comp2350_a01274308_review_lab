const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', async (req, res) => {
	console.log("page hit");
	
	try {
		const result = await dbModel.getAllRestaurants();
		res.render('index', {allRestaurants: result});

		//Output the results of the query to the Heroku Logs
		console.log(result);
	}
	catch (err) {
		res.render('error', {message: 'Error reading from MySQL'});
		console.log("Error reading from mysql");
	}
});

router.post('/addRestaurant', (req, res) => {     
	console.log("form submit");     
	console.log(req.body); 
}); 

router.post('/addRestaurant', async (req, res) => {     
	console.log("form submit");     
	console.log(req.body);    
	try {   
		const success = await dbModel.addUser(req.body);   
		if (success) {    res.redirect("/");   
	}   else {    
		res.render('error', {message: "Error writing to MySQL"});    
		console.log("Error writing to MySQL");   
		}  
	}  
	catch (err) {   
		res.render('error', {message: "Error writing to MySQL"});   
		console.log("Error writing to MySQL");   
		console.log(err);  
	} 
});

router.get('/deleteRestaurant', async (req, res) => {     
	console.log("delete restaurant");    
	console.log(req.query);   
	let userId = req.query.id;    
	if (userId) {   
		const success = await dbModel.deleteUser(userId);   
		if (success) {    
			res.redirect("/");   
		}   else {    
			res.render('error', {message: 'Error writing to MySQL'});    
			console.log("Error writing to mysql");    
			console.log(err);   
		}  
	} 
}); 

router.get('/showReviews', async (req, res) => {
    console.log("show reviews for restaurant");
    console.log(req.query);
    const restaurantId = req.query.id;
    try {
        // Fetch reviews for the specified restaurantId
        const reviews = await dbModel.getReviewsByRestaurantId(restaurantId);
        res.render('reviews', { reviews: reviews });
        console.log(reviews);
    } catch (err) {
        res.render('error', { message: 'Error reading reviews from MySQL' });
        console.log("Error reading reviews from MySQL:", err);
    }
});

module.exports = router;
