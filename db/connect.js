import mongoose from "mongoose";

const connectDB = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}
export default connectDB;

/*mongoose.connect(connectString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("CONNECTED...");
}).catch((err) => {
    console.log(err);
})*/
// import mysql from 'mysql';

// const connection = mysql.createConnection({
//     host : 'localhost',
//     user: 'root',
//     password:'',
//     database:'product_info'
// })

// export default connection;