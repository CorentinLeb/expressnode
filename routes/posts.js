const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model')
const cors = require('cors')

const bodyParser = require('body-parser')
// for express
router.use(cors())
router.use(bodyParser.json());

// route for all post
router.get('/',async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
    res.send(posts)
   })
   
   // route for single post
   router.get('/:title',async (req, res) => {
        try {
           const post = await Post.findOne({title:req.params.title})
           res.json(post)

        } catch (error) {
            console.warn(error)
            res.json({message: error.message})
        }
   })
   
   // POST ROUTE for new post
   router.post('/',async (req, res)=>{

        console.log(req.body);
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        });
        console.log(post);
        try{
            const savedPost = await post.save();
            res.json(savedPost)

        }catch(error){
            console.warn(error)
            res.json({message: error.message})
        }
   })





   // PUT ROUTE for Updating post



   router.put('/:id',async(req, res)=>{
       try {
           const posToUpdate = await Post.findById(req.params.id);
           const updatedPost = await Post.updateOne({_id:req.params.id},
        {$set :{
            title: req.body.title??posToUpdate.title,
            content: req.body.content??posToUpdate.content ,
            tags: req.body.tags??posToUpdate.tags
        }})
        res.json(updatedPost); 
       } catch (error) {
        console.warn(error)
        res.json({message: error.message})
       }
   })
   
   // DELETE ROUTE for delete
   router.delete('/:id',async (req,res)=>{

    try {
        const deletePost =await Post.remove({_id:req.params.id});
        res.json(deletePost)  
    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }

   })

   module.exports = router;