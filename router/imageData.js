var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var ImageDataSchema = require('../models/image');
var ImageModel = mongoose.model('Image');



   var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
     }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');


  router.post('/addImageData',upload,function(req,res){
    var imageData = new ImageModel ({
      Image: req.file.filename,
      Image_URL: req.body.Image_URL,
      Title:req.body.Title,
      Content_Heading:req.body.Content_Heading

    });
    imageData.save(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: result
        })
      }

    });

});

router.get('/getImageData',function(req,res){
    ImageModel.find({}).exec(function(err,Images){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: Images
        });
      }
    
    });
  
});

router.put('/updateImageData/:id',upload,function(req,res){
    update = {
      $set: {
        Image: req.file.filename,
        Image_URL : req.body.Image_URL,
        Title:req.body.Title,
        Content_Heading:req.body.Content_Heading
       
      }
    };
    ImageModel.findByIdAndUpdate(req.params.id,update,function (err, Imagedata) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: Imagedata
          })
        }
  
      });
  
  
  });

  router.delete('/delete-imagedata/:id',(req, res) => {
    ImageModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  module.exports=router;