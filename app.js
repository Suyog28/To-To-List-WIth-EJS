const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const todolistSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", todolistSchema);

const item1 = new Item({
    name: "Welcome to daily task list"
})

const item2 = new Item({
    name: "Read 20 Pages of Novel"
})

const item3 = new Item({
    name: "Study 2 hr a day"
})

const itemArry = [item1, item2, item3];

app.get("/", (req, res) => {
    // let today = new Date();
    // const options = {
    //     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    // }
    // const day = today.toLocaleDateString("en-US", options);

    Item.find({})
        .then((items) => {
            if (items.length === 0) {
                Item.insertMany(itemArry)
                    .then(() => {
                        console.log("Data inserted")
                    })
                    .catch((err) => {
                        console.log("Something went wrong" + err)
                    })
                res.redirect("/");
            } else {
                // console.log(items)
                res.render("list",
                    { listTitle: "Today", newListItems: items })
            }
        });
})


app.post("/", (req, res) => {
    let itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    })
    item.save();
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    const checkItem = req.body.checkbox;

    Item.findByIdAndDelete(checkItem)
        .then(() => {
            console.log("Item Deleted")
        }).catch((err) => {
            console.log(err)
        })
    res.redirect("/");
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