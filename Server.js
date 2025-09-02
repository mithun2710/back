const express = require ("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const PORT = 3333;

mongoose.connect("mongodb+srv://mithunkumarace23_db_user:mithun2005MK@cluster0.718odkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.log(error)
})

const expenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    }
})

const Expense = mongoose.model("Expense",expenseSchema);

app.post("/post",async (req,res)=>{
    try {
        const {title,amount}=req.body;
        const NewExpense = new Expense({
            title,
            amount
        })
        await NewExpense.save();
        res.json({message: "Expense created successfully",expense:NewExpense});
    } catch (error) {
        res.send({message: "Error creaating expense",error: error.message});
    }
})

app.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json({message:"Expenses retrived succussfull"});
    } catch (error) {
        res.json({message:"Error retriving exper"});
    }
});

app.delete("/delete",async(req,res)=>{
    try {
        const {id} = req.params;
        await Expense.findByIdAndDelete(id);
        res.json({message:"Expense deleting successfully"});
    } catch (error) {
        res.json({message:"Error deleting expense",error:error});
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});