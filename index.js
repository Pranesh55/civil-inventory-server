import express from 'express';
import bodyParser from 'body-parser';
import companiesRoutes from './routes/companies.js'
import productRoutes from './routes/products.js'
import siteRoutes from './routes/sites.js'
import supplierRoutes from './routes/suppliers.js'
// import teacherRoutes from './routes/teachers.js';
var app=express();

var PORT= process.env.PORT || 5000;
app.use(bodyParser.json());
app.use('/company',companiesRoutes);
app.use('/products',productRoutes);
app.use('/sites',siteRoutes);
app.use('/suppliers',supplierRoutes);
// app.use('/teachers',teacherRoutes);
app.listen(PORT,()=>{
    console.log("Server running");
})

app.get('/',(req,res)=>{
    console.log("Hello Everyone");
    res.send("Hello World");
});
app.all('*',(req,res,next)=>{
    const err=new Error(`Request url ${req.path} not found`);
    err.statusCode=404;
    next(err);
    // res.status(404).json({
    //     message:err.message,
    //     stack:err.stack
    // })
});
app.use((err,req,res,next)=>{
    // console.log(err);
    const statusCode=err.statusCode || 500;
    var error={};
    if(statusCode==422){
        console.log(err);
        for(const f of err.values()){
            console.log(f);
            error[f.field]=[];
            error[f.field].push(f.message);
        }
    }
    // console.log(error);
    res.status(statusCode).json({
        message:err.message,
        errors:error
    });
})
