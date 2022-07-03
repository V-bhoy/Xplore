const mongoose = require('mongoose');
const XPlore = require('../models/xplore');

const createXplore = async (req,res)=>{
    const xplore = req.body;
    const newXplore = new XPlore({
        ...xplore, 
        createdAt: new Date().toISOString(),
    });

    console.log(newXplore);
    try{

       newXplore.save((err)=>{
          if(err){
            console.log(err);
            return res.status(500).json({message:"Oops! Something went wrong",err});
          }
          else{
               res.status(201).json(newXplore);
          }
       });
    
    }
    catch(error){
        res.status(404).json({message:"Something Went Wrong!"})
    }

}

const getXplore  = async(req,res)=>{
    const{page} = req.query;
    try{
          const limit=6;
          const startIndex = (Number(page)-1) *limit;
          const total = await XPlore.countDocuments({});
          const xplores = await XPlore.find().limit(limit).skip(startIndex);
          res.status(200).json({
            data:xplores, 
            currentPage:Number(page), 
            totalXplores: total, 
            numberOfPages: Math.ceil(total/limit)
        });
    }
    catch(err){
        res.status(404).json({message:"Something Went Wrong!"})
    }
}

const getSingleXplore  = async(req,res)=>{
    const {id} = req.params;
    try{
          const xplore = await XPlore.findById(id);
          res.status(200).json(xplore);
    }
    catch(err){
        res.status(404).json({message:"Something Went Wrong!"})
    }
}


const userXplores = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"user does not exist"})
    }
    const xplores = await XPlore.find({owner: id});
    res.status(200).json(xplores);
}


const deleteXplore = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"xplore not found"})
        }
        await XPlore.findByIdAndRemove(id);
        res.json({message:"Xplore Deleted Successfully"})
    }
    catch(err){
        res.status(404).json({message:"Something Went Wrong!"})
    }
   
}

const updateXplore = async(req,res)=>{
    const {id} = req.params;
    const {title, description, creator, imageUrl, tags} = req.body;
    console.log(id,req.body)
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"xplore not found"})
        }
        const updatedXplore = {
            creator,
            title,
            description,
            tags,
            imageUrl,
            _id: id
        }
        await XPlore.findByIdAndUpdate(id, updatedXplore, {new: true} );
        res.json(updateXplore);
    }
    catch(err){
        res.status(404).json({message:"Something Went Wrong!"})
    }
   
}

const getXploreBySearch = async(req,res)=>{
    const {q} = req.query;
    try{
         const quer= new RegExp(q,"i");
         const xplores = await XPlore.find({$or:[{title:{$regex: quer}},{location:{$regex: quer}}]});
         res.json(xplores);
    }
    catch(err){
          res.status(404).json({message: "Something went wrong!"})
    }
}

const getXploreByTag = async(req,res)=>{
    const {tag} = req.params;
    try{
         const xplores = await XPlore.find({tags: {$in: tag}});
         res.json(xplores);
    }
    catch(err){
          res.status(404).json({message: "Something went wrong!"})
    }
}

const getRelatedXplore = async(req,res)=>{
    const tags = req.body;
    try{
         const xplores = await XPlore.find({tags: {$in: tags}});
         res.json(xplores);
    }
    catch(err){
          res.status(404).json({message: "Something went wrong!"})
    }
}

const likeXplore = async (req,res)=>{
    const {id} = req.params; 
    console.log(req.userId);
    try{
    if(!req.userId){
        return res.json({message: "User is not authenticated"})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"xplore not found"})
    }
    const xplore = await XPlore.findById(id);
    
    const index = await xplore.likes.findIndex((id)=>id===String(req.userId))
    if(index===-1){
        xplore.likes.push(req.userId)
    }
    else{
        xplore.likes = xplore.likes.filter((id)=> id!==String(req.userId))
    }
    const updatedXplore = await XPlore.findByIdAndUpdate(id, xplore, {new: true})
    res.status(200).json(updatedXplore)
 }
 catch(error){
    res.status(404).json({message: "Something went wrong!"})
 }
}

module.exports = {createXplore, getXplore, getSingleXplore, userXplores, deleteXplore, updateXplore, getXploreBySearch, getXploreByTag, getRelatedXplore, likeXplore};