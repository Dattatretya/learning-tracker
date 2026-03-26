import todoModel from "../models/todos.model"


export const todoController =async (req, res) => {
    try{

        const {title, description} = req.body

        if (!title){
            return res.status(404).send({
                message: "Title is required"
            })
        }

        if (!description){
            description = ""
        }

        const todo = await todoModel({title: title, description: description})

        await todo.save()

        return res.status(200).send({
            status: "success",
            message: "Todo saved successfully"
        })

    }
    catch(err){
        res.status(500).send({
            message:"Internal server error"
        })
        console.log(err)
    }
}