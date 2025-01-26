
import asynchandler from 'express-async-handler';
import { Team } from '../models/team.model.js';
import Chat from '../models/chat.model.js';

export const createTeam = asynchandler(async (req, res) => {
    const {name , description , size} = req.body;
    if(!name || !description || !size){
        return res.status(400).json({ message: "All fields are required" });
    }

    const leader = req.user._id; 
    
    const newTeam = await new Team({
        name,
        description,
        leader,
        size
    });
    newTeam.members.push(leader);
    await newTeam.save();

    

    if(!newTeam){
        return res.status(500).json({ message: "Invalid Team Data" });
    }

    // create a chat for the team
    const chat = await Chat.create({
        chatName: newTeam.name,
        users: [leader],
        groupAdmin: leader
    })
    newTeam.chat = chat._id;
    await newTeam.save();

    res.status(201).json({ message: "Team created 🤩", team: newTeam });

});

export const getAllTeams = asynchandler(async (req, res) => {
    const teams = await Team.find().populate('members');
    res.status(200).json({ teams });
});

export const SearchTeam = asynchandler(async (req, res) => {
    // search using regex
    const {name } = req.params;
    const teams = await Team.find({ name: new RegExp(name, 'i') });
    res.status(200).json({ teams });
});

export const deleteTeamById = asynchandler(async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if(!team){
        return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
});

export const updateTeamById = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, size } = req.body;
    const team = await Team.findByIdAndUpdate(id, { name, description, size }, { new: true }).populate('members');
    if(!team){
        return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team updated successfully", team });
});


export const getUserTeams = asynchandler(async (req, res) => {
    const teams = await Team.find({ members: { $in: [req.user._id] } })
        .populate('members')
        .populate({
            path: 'chat',
            populate: [
                { 
                    path: 'users', 
                    select: 'name email' 
                },
                { 
                    path: 'groupAdmin', 
                    select: 'name email' 
                },
                { 
                    path: 'latestMessage', 
                    populate: { 
                        path: 'sender', 
                        select: 'name email' 
                    } 
                }
            ]
        });

    if (!teams || teams.length === 0) {
        return res.status(404).json({ message: "No teams found" });
    }

    res.status(200).json({ teams });
});
