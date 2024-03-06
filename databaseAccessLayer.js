const database = include('/databaseConnection');


async function getAllRestaurants() {
	let sqlQuery = `
		SELECT name, description
		FROM restaurant;
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from restaurant table");
		console.log(err);
		return null;
	}
}
  
async function addUser(postData, callback) {     
	let sqlInsertSalt = `  INSERT INTO restaurant (name, description)   
	VALUES (:name, :description);  `;     
	let params = {                 
		name: postData.name,             
		description: postData.description,                     
	};     
	console.log(sqlInsertSalt);  
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
} 

async function deleteUser(webUserId) {     
	let sqlDeleteUser = `   DELETE FROM web_user  WHERE web_user_id = :userID  `;       
	let params = {         
		userID: webUserId     
	};     
	console.log(sqlDeleteUser);  
	try {   
		await database.query(sqlDeleteUser, params);   
		return true;  
	}  
	catch (err) {   
		console.log(err);   
		return false;  
	}         
} 

module.exports = { getAllRestaurants, addUser, deleteUser }
