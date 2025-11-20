// MONGO DB CONNECTION EXPRESS CODE

let express = require("express")
let app = express()
app.listen("3000", ()=>{
console.log("server is connected")
})

let connectDB = require("./DBCON/connect")
connectDB();

// let createDocument = require("./model/model")
// createDocument()
// let getData = require("./model/model")
// getData()
// let updateData = require("./model/model")
// updateData("1")





// const http = require("http");
// // let means variable ...const mean constant.


// let server = http.createServer(
//     (req, res) => {
//         if (req.url("/eng")) {
//             res.write("<h1> hiii </h1>");
//         }
//         else if (req.url("/school")) {
//             req.write("<h1>top</h1>");
//         }
//         else{
//             req.write("<h1>botto<h1>");

//         }
//         res.end();
//     }
// );


// const express = require('express')

// const app = express()

// app.get('/',(req,res)=>{
//     res.sendFile("about.html",{root:__dirname})
// })
// app.get('/us',(req,res)=>{
//     res.sendFile("us.html",{root:__dirname})
// })


// app.listen("3000",()=>{

//     console.log("server is connected")
//     console.log(__dirname)
//     console.log(__filename)
// })





// const express = require('express')
// const hbs=require('hbs')

// const app = express()
// app.set("view engines","hbs")
// app.set()
// app.set("views","./templateng/views");

// app.listen("3000",()=>{
//     console.log("server is connected");
//     console.log(__dirname )
//      console.log(__dirname )
// })