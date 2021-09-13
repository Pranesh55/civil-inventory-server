import validator from 'fastest-validator';

const schema={
    name:{type:"string",optional:false,max:50},
    address:{type:"string",optional:false},
    street:{type:"string",optional:false},
    details:{type:"string",optional:true},
    mobile:{type:"string",max:10}
   
};
export default schema;