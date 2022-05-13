
const express = require('express');
const app = express();
const axios = require('axios');
let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

function makeGetRequest(path) {
	axios.get(path).then(
		(response) => {
			var result = response.data;
			console.log(result);
            app.get('/', (req,res) =>{

                res.send(`${date}/${month}/${year} ${hours}:${minutes} ${result}`);
            });
		},
		(error) => {
			console.log(error);
		}
	);
}
makeGetRequest('http://127.0.0.1:3000');
app.listen(4000, () => console.log('Listening on port 4000..'));
