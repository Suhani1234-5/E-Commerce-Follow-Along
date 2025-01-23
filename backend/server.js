const app = require("./app");
const connectDatabase = require("./db/Database");
// Handling uncaught Exception when setting up backend server
process.on( " uncaught Exception" ,(err)=>{
    console. log(`Error: ${err.messageF}`) ;
    console.log(`shutting down the server for handling uncaught exceptions`) ;
    process.exit(1);});
// config
if (process .env.NODE_ENV !== "PRODUCTION") {
    require( "dotenv" ).config({
        path: "config/.env" ,});
    };
// connect db
connectDatabase( ) ;
// create server
const server = app.listen(process.env.PORT, ( )=> {
    console. log(
        `Server is running on http://localhost:${process.env.PORT}`);
 });
 //Unhandled promise rejection
 process.on("unhandledRejection", (err) => {
     console.error(`Unhandled Rejection: ${err.message}`);
     console.log("Shutting down the server due to unhandled promise rejection.");
 
     server.close(() => {
         process.exit(1); // Exit with failure code
     });
 });