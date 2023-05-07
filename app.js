const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let today = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }
    const day = today.toLocaleDateString("en-US", options);
    res.render("list",
        { listTitle: day, newListItems: items })
})

app.post("/", (req, res) => {
    let input = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(input);
        res.redirect("/work")
    } else {
        items.push(input);
        res.redirect("/");
    }

})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})
app.get("/aboutus", (req, res) => {
    res.render("aboutus")
})



app.listen(3000, () => {
    console.log("Server running on port 3000")
})