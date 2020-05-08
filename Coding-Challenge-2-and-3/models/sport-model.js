const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  num_players: {
    type: Number,
    required: true,
  }
});

const sportsModel = mongoose.model("sports", schema);

module.exports = {
  deleteSport: (id) => {
    return sportsModel.remove({id}).then(status => {
      return status;
    }).catch(err => {
      throw new Error("An db error happened:" + err);  
    });
  },
  addSport: (body) => {
    return sportsModel.insertMany([body]).then(status => {
      return status;
    }).catch(err => {
      throw new Error("An db error happened:" + err);  
    });
  },
};
