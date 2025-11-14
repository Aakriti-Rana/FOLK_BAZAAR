const http = require("http");
let server = http.createServer(
    (req, res) => {
        res.write("<h1> enginnering </h1>");
        res.write("<h1> school</h1>");
        res.end("<h1> bml munjal</h1>");
    }
);
// ()=>{} this function used when to write a code inside a code..here printing.
server.listen(3000,()=> { 
    console.log("server is succes");
})

// ROUTING STARTING :

