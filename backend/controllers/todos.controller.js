import todoModel from "../models/todos.model.js"


export const setTodoController = async (req, res) => {

    const {title, description} = req.body

    try{

        console.log("body", title, description)

        if (!title){
            return res.status(404).send({
                message: "Title is required"
            })
        }


        const todo = await todoModel({title: title, description: description})

        const response = await todo.save()

        if (response._id){
            return res.status(200).send({
            status: "success",
            message: "Todo saved successfully"
        })
        }
        else{
            return res.status(402).send({
            status: "failed",
            message: "Internal server error"
        })
        }

        

    }
    catch(err){
        return res.status(500).send({
            message:"Internal server error",
            error: err
        })
    }
}

export const getTodosController = async (req, res) => {
    try{

        const todos =await  todoModel.find()

        if (!todos){
            return res.status(404).send({
                message: "No todos found"
            })
        }

        return res.status(200).send({
            status: "success",
            todos,
            message: "Todos successfully fetched"
        })
    }
    catch(err){
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

export const deleteTodosController = async (req, res) => {
    try{

        const {ids} = req.body

        if (!ids){
            return res.status(400).send({
                message: "No ids found to delete"
            })
        }

        const deleteTodo = await todoModel.deleteMany({_id: {$in: ids}})

        console.log(deleteTodo)

        return res.status(200).send({
            status: "success",
            message: "Selected todos deleted"
        })

    }
    catch(err){
        res.status(500).send({
            message: "Internal server error",
            error: err
        })
    }
}

export const editTodo = async (req, res) => {
    try{
        const {id, title} = req.body;

        console.log(req.body)

        if (!id || !title){
            return res.status(400).send({
                message: "Id and title are required fields"
            })
        }

        const idExist = await todoModel.findById({_id:id})

        if (!idExist){
            return res.status(404).send({
                message: "Id doesnot exist"
            })
        }

        const edit = await todoModel.updateOne({_id: id}, {title: title})

        console.log(edit)

        if (edit.acknowledged){
            return res.status(200).send({
            status: "success",
            message: "Edited successfully"
        })
        }


    }
    catch(err){
        return res.status(500).send({
            message: "Internal server error",
            error: err
        })
    }
}