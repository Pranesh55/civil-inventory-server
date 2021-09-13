import validator from 'fastest-validator';

const schema={
    name:{type:"string",optional:false,max:50},
    unit:{type:"string",optional:false},
    price:{type:"number",optional:false},
    description:{type:"string",optional:true}
};
export default schema;