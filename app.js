//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json    
    const {id} = req.params;
    const spell = ApiData.spells.find((spells)=> spells.id == id);
    res.json(spell);
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const filters = req.query;
    if(!ApiData.hogwartsStudent && !ApiData.hogwartsHouse ){
        res.json(ApiData.characters)
    }
    const result = ApiData.characters.filter((character) => {
        return character.hogwartsStudent == JSON.parse(filters.hogwartsStudent) || character.hogwartsHouse == filters.hogwartsHouse
    });
    res.json(result);
});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const data = req.body;
    if(!data.spell && !data.id && !data.use){
        res.status(400).json({
            operation:"FAILED"
        });
        throw new Error ();
    }
    ApiData.push(data);
    res.status(200).json({
        operation: "ok"
    });
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});