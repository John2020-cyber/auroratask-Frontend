
const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 80;



function makeGetRequest(path) {
	axios.get(path).then(
		(response) => {
			var result = response.data;
			console.log(result);
            app.get('/', (req,res) =>{

				let date_ob = new Date();
				
				// current day
				date_ob.setDate(date_ob.getDate() + 1);
				let day = ("0" + date_ob.getDate()).slice(-2);

				// current month
				date_ob.setMonth(date_ob.getMonth() + 1);
				let month = ("0" + date_ob.getMonth() ).slice(-2);

				// current year
				let year = date_ob.getFullYear();

				// current hours
				date_ob.setHours(date_ob.getHours() + 5);
				let hours = ("0" + date_ob.getHours()).slice(-2);

				// current minutes
				date_ob.setMinutes(date_ob.getMinutes());
				let minutes = ("0" + date_ob.getMinutes()).slice(-2);

                res.send(`${day}/${month}/${year} ${hours}:${minutes} ${result}`);
            });
		},
		(error) => {
			console.log(error);
		}
	);
}
//use environment PORT when you are using Docker containter as frontend and backend will be running on same host, change port to of frontend or backend to get stable results
makeGetRequest(`http://backend:${port}`);

app.listen(port, () => console.log(`Listening on port ${port}..`));