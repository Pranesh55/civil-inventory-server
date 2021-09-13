import express from 'express';
import bodyParser from 'body-parser';
import connection from '../connection.js';
import joi from '@hapi/joi';
import validator from 'fastest-validator';
const router=express.Router();

const v=new validator();

import schema from '../validation/products/products.schema.js';

router.get('/:id',(req,res)=>{
    // res.send(users);
    var email=req.body.name;
    var password=req.body.password;
    connection.query("SELECT * FROM companies WHERE id=?",[req.params.id],(err,rows,fields)=>{
        if(!err){
           
            if(rows.length==0){
                 var obj={};
                var messagekey="message";
                obj[messagekey]="Company Not Found";
                JSON.stringify(obj);
                res.status(404).send(obj);
            }else{
                res.status(200).send(rows);
            } 
           
        }else{
            console.log(err);
        }
    })
});
router.get('/',(req,res)=>{
    // res.send(users);
    connection.query("SELECT * FROM products where company_id = (?)",[[req.query.company_id]],(err,rows,fields)=>{
        if(!err){
            console.log(fields);
            res.status(200).send(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/', async (req,res,next)=>{
    try{
        console.log("/register");
        var response=v.validate(req.body,schema);
        if(response!==true){
            response.statusCode=422;
            console.log(response);
            response.message="Given Data Invalid";
            var error=Error("Given Data Invalid");
                            error.statusCode=422;
            next(response);
            
        }else{
            console.log(req.query);
            var date=new Date().getDate();
            connection.query("INSERT INTO products (company_id,name,unit,price,stock,description,created_date,updated_date) VALUES (?)",[[req.query.company_id,req.body.name,req.body.unit,req.body.price,req.body.stock,req.body.description,new Date(),new Date()]],(err,rows,fields)=>{
                        if(!err){
                            var response={};
                            var insertedRow=JSON.stringify(rows)
                            console.log(insertedRow);
                            response['message']="Product created successfully"
                            res.send(response);
                            console.log("Success");
                        }else{
                            
                            var error=[];
                            console.log(err);
                            var err1={}
                            console.log(err1);
                            error.push(err1)
                    
                            err1['message']=err['sqlMessage']
                            err1['field']='mobile'
                        
                            
                            error.statusCode=422;
                            console.log(err);
                            next(error);
                        }
                    });
        }
    }catch(error){
        console.log(error);
        console.log("error ");
        error.statusCode=500;
        next(error);
    }
   
});

router.put('/:id',(req,res)=>{
    connection.query("UPDATE company SET age =? WHERE id=?",[req.body.age,req.params.id],(err,rows,fields)=>{
        if(!err){
            if(fields!=undefined){
                connection.query("SELECT * FROM students where id=?",[req.params.id],(err1,rows1,fields1)=>{
                    if(!err1){
                        res.send(rows1);
                    }else{
                        console.log(err1);
                    }
                })
            }else{
                var obj={};
                var messagekey="message";
                obj[messagekey]="User Not Found";
                JSON.stringify(obj);
                res.status(404).send(obj);      
            }   
        
        }else{
            console.log(err);
        }
    });
});
router.post('/login',(req,res,next)=>{
    // res.send(users);
    var mobile=req.body.mobile;
    var password=req.body.password;
    try{
        var result=v.validate(req.body,loginSchema);
        if(result!==true){
            result.statusCode=422;
            result.message="Invalid Credentials";
            var error=new  Error("Given Data Invalid")
            error.statusCode=422;
            error.errors=result;
            next(result);
        }else{
            connection.query("SELECT * FROM companies WHERE mobile=? AND password=?",[mobile,password],(err,rows,fields)=>{
                if(!err){
                    if(rows.length==1){
                        delete rows[0].password;
                        res.status(200).send(rows[0]);
                    }else if(rows.length==0){
                        var error=new Error("Credentials invalid");
                        error.statusCode=404;
                        next(error);
                    }

                }else{
                    // console.log(err);
    
                    var error=Error("Some Error Occured!!!");
                    error.statusCode=500;
                    next(error);
                }
            });
        }
    }catch(error){
        console.log(error);
        var error=Error("Some Error Occured!");
        error.statusCode=500;
        next(error);
    }
    
});


export default router;

