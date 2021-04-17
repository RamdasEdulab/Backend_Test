var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImageDataSchema = new Schema({
  Image:{type: String,},
  Image_URL:{type: String},
  Title:{type:String},
  Content_Heading:{type:String},
 

});

mongoose.model('Image',ImageDataSchema);