import { Router } from "express"
import { get } from "http"
import { cryptPassword } from "../crypto.js"
import userModel from "../models/usersmodel.js"

const userRouter = Router()

//Route ajouter un utilisateur

userRouter.post("/user", async (req, res) =>{
    try {
        req.body.password = await cryptPassword(req.body.password)
        let user = new userModel(req.body)
        await user.save()
        res.json(user)
    
    }catch (error){
        console.log(error);
        res.json(error)
    }
})

//Route de récupération de tous les utilisateurs

userRouter.get("/users", async (req, res)=> {
    try{
        let users = await userModel.find();
        res.json(users)
    }catch (error) {
        res.send(error)
    }
})

//Route de récupération d'un utilisateur avec id

userRouter.get("/user/findById/:id", async (req, res) => {
    try {
        let user = await userModel.findOne({_id: req.params.id});
        res.json(user)
    }catch (error) {
        res.send(error);
    }
})

//Route de récupération d'un utilisateur avec son mail

userRouter.get("/user/findByMail/:mail", async (req, res) => {
    try {
        let user = await userModel.findOne({_mail: req.params.mail});
        res.json(user)
    }catch (error) {
        res.send(error)
    }
})
//Route de modification des utilisateurs

userRouter.put("/user/:id", async (req, res) => {
    try {
        let user = await userModel.updateOne({_id: req.params.id },req.body)
        res.json(user)
    }catch(error){
        
    }
})

// Route de suppression des utilisateurs

userRouter.delete("/user/:id", async (req, res) => {
    try {
        let user = await userModel.deleteOne({_id: req.params.id})
        res.json(user)
    }catch (error) {
        res.send(error)
    }
})



export default userRouter