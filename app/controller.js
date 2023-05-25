const dbo = require('../config/config');
const moment = require('moment');
const io = require('../index');


module.exports={
    addCount:async(req,res,next)=>{
        try {
          const {action,date}=req.body;
          if(!action||!date){
            res.status(403).json({message:"action and date is required"});
          }
          const dbConnect = dbo.getDb();
          dbConnect
            .collection('viewers-control')
            .findOne({action:action}).then(function(data){
               // console.log(data.action);
             
                if(data){
                    let count = data.count+1;
                    dbConnect
                    .collection('viewers-control')
                   
                    .updateOne({action:action},{$set:{count:count,date:date}},{ upsert: true },function(err,obj){
                       
                        if (err) throw err;
                        
                        io.socketIO().emit('message', 'tes')
                        res.status(201).json({
                          message:"Update success"
                        })
                        
                    })
                  
                }else{
                 res.status(403).json({message:"action not found"});
                }

            });
            

        } catch (error) {
            next(error);
        }
    },

    readCount:async(req,res,next)=>{
        try {
            const dbConnect = dbo.getDb();
            dbConnect
            .collection('viewers-control')
            .find({},{projection:{_id:0}})
            .limit(50)
            .toArray(function (err, result) {
              if (err) {
                res.status(400).send('Error read data');
              } else {
                res.status(200).json({
                  status:"success",
                  data:result
                });
              }
            });
        } catch (error) {
            next(error);
        }
    }

}