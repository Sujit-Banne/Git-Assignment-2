const express = require('express')
const mongoose = require('mongoose')
const post = express.Router()
const Post = require('../models/postModel')


//get data 
post.get('/', async (req, res) => {
    const data = await Post.find({})
    res.json(
        {
            status: "Success",
            Post: data
        }
    )
})

//create data 
post.post('/', async (req, res) => {
    const post = new Post(req.body)
    const data = await post.save()
    res.json({
        status: "Success",
        result: data
    })
})

//update data 
post.put('/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    const data = await Post.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!data) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.json({
        status: "Success",
        result: data
    })
})

//delete data 
post.delete('/:id', async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    const data = await Post.findOneAndDelete({ _id: id }, { ...req.body })
    if (!data) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.json({
        status: "Success",
        result: data
    })
})

module.exports = post