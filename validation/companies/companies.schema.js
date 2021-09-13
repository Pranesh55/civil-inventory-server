import validator from 'fastest-validator';

const schema={
    name:{type:"string",optional:false,max:50},
    mobile:{type:"string",optional:false,min:10,max:10},
    email:{type:"email",optional:false},
    password:{type:"string",optional:false,min:6,max:8}
   
};
export default schema;