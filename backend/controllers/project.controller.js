
import asynchandler from 'express-async-handler';
import { Project } from '../models/project.model.js';


export const createProject = asynchandler(async(req,res)=>{
    const {title , description , link=''} = req.body;

    if(!title || !description ){
        return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user._id

    const project = new Project({
        title,description,link,user:userId
    })

    await project.save();

    if(!project){    
        return res.status(500).json({ message: "Invalid Project Data" });
    }

    res.status(201).json({ message: "Project created 🤩", project });

})

export const getProjectByUserId = asynchandler(async(req,res)=>{
    const {userId} = req.params;
    const projects = await Project.find({user:userId});
    res.status(200).json({ projects });
})

export const deleteProject = asynchandler(async(req,res)=>{
    const {projectId} = req.params;
    if(!projectId){
        return res.status(400).json({ message: "Project id is required" });
    }
    const project = await Project.findByIdAndDelete(projectId);
    if(!project){
        return res.status(400).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully", project });
})