import validator from 'fastest-validator';

const schema={
    mobile:{type:"string",optional:false,min:10,max:10},
    password:{type:"string",optional:false,min:6,max:8}
   
};
export default schema;