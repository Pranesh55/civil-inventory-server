import mysql from 'mysql';


var db_config={
    host:'sql6.freemysqlhosting.net',
    user:'sql6436342',
    password:'KU51jhgUIC',
    database:'sql6436342',
    charset:"utf8mb4",
}
var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); 
                                                   
  
    connection.connect(function(err) {              
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }else{
          console.log("DB connected");
      }                                    
    });                                     
                                            
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
  }
  handleDisconnect();

export default connection;