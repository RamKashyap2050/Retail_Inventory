const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventory'
})
app.listen('3001', () => {
    console.log('running on port 3001')
})
app.get("/show", (req, res) =>
{
    const sqlshow = "SELECT * FROM inventory_table";
    db.query(sqlshow, (err,result) =>{
        res.send(result)
    })

})
app.delete("/delete/:id", (req, res) =>{
    const products = req.params.id
    const sqlDelete = 
     "DELETE FROM inventory_table WHERE id = ?";
     db.query(sqlDelete, products, (err,result) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
     })
})
app.delete("/update/:id", (req, res) =>{
    const products = req.params.id
    const sqlDelete = 
     "DELETE FROM inventory_table WHERE id = ?";
     db.query(sqlDelete, products, (err,result) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
     })
})
 app.post("/create", (req,res) => {
     const product_name = req.body.product_name;
     const product_price = req.body.product_price;
     const product_img_url = req.body.product_img_url;

     const sqlInsert = 
     "INSERT INTO inventory_table(product_name, product_price, product_img_url) VALUES (?,?,?)";
     db.query(sqlInsert, [product_name, product_price, product_img_url], (err, result) => {
        if(err){
         console.log(err)
        }
        else{
         console.log("success")
        }
     }
     );
})