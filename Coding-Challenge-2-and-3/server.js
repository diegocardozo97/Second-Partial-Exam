const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();

const { DATABASE_URL, PORT } = require( './config' );
const SportsModel = require('./models/sport-model');

const app = express();


app.delete("/sports/delete", jsonParser, (req, res) => {
    if (!req.body.id || !req.query.sportId) {
        res.statusMessage = "Not the id included";
        return res.status(406).end();
    }
    if (req.body.id !== req.query.sportId) {
        res.statusMessage = "Not the same  id";
        return res.status(409).end();
    }

    SportsModel.deleteSport(req.body.id).then(status => {
        console.log(status)
        if (status.deletedCount === 0) {
            res.statusMessage = "Id not found";
            return res.status(404).end(); 
        }
        return res.status(204).end();
    }).catch(err => {
        res.statusMessage = "DB eerror:" + err;
        return res.status(500).end();
    });
});

app.post("/sports/add", jsonParser, (req, res) => {
    SportsModel.addSport(req.body).then(status => {
        console.log(status);
        return res.status(200).end();
    }).catch(err => {
        res.statusMessage = "DB eerror:" + err;
        return res.status(500).end();
    });
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});


/*
sudo systemctl start mongod

*/