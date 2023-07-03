const _ = require('lodash')
const Blog = require('../models/blog')

const totalLikes = (arr) => {
    if (arr.length === 0) return 0
    if (arr.length === 1) return arr[0].likes


    return arr.reduce((acc, each) => acc += each.likes, 0)
}

const favoriteBlog = (list) => {
    const blogLikes = list.map(blog => blog.likes)
    const favorite = Math.max(...blogLikes)
    const index = blogLikes.indexOf(favorite)
    const obj = list[index]
    const { title, author, likes } = obj
    return { title, author, likes }
}

const mostBlogs = (...args) => {
    const authors = _.map(...args, (blog) => blog.author)
    const values = _.countBy(authors)
    const arr = Object.entries(values).map(([ author, blogs ]) => ({ author, blogs }))
    const maxBlogs = Math.max(...arr.map(blog => blog.blogs))
    const popular = arr.filter(blog => blog.blogs === maxBlogs)
    const [ first ] = popular
    return first;
}

const mostLikes = (...args) => {
    //firstly created a new array of objects of the author names and likes
    const newObj = _.map(...args, ({ author, likes }) => ({ author, likes }))
    
    //got the names of all the authors pre-filtering - which in this case means avoiding duplicates
    const authors = _.map(...args, ({ author }) => author)
    
    //filtered the authors array
    const uniqAuthors = _.uniq(authors)
    //initialized an empty array to hold each author and an array of objects of each author and their total likes
    let arr = []
    
    //looping through the filtered authors array to create an object of each author and their total likes
    for(const key of uniqAuthors) {
        let obj = {}
        obj['author'] = key
        obj['likes'] = newObj.filter(each => each.author === key)
                            .map(({ author, likes }) => likes)
                            .reduce((acc, i) => acc + i, 0)
        arr.push(obj)
    }
    
    //looping through the array of author and total likes object to get likes then returning the highest likes
    const likes = Math.max(...arr.map(each => each.likes))
    //filtering the array of objects and total likes to find the object with likes that is the same as the max likes meaning the author himself
    const finals = arr.filter(each => each.likes === likes)
    const [ first ] = finals
    return first
}

const blogsInDB = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

const initialBlogs = [
    {
        title: 'First Note',
        author: 'First Author',
        url: 'http://localhost.test',
        likes: 4
    },
    {
        title: 'Second Note',
        author: 'First Author',
        url: 'http://localhost.test',
        likes: 4
    },
    {
        title: 'Second Note',
        author: 'Second Author',
        url: 'http://localhost.test',
        likes: 3
    },
]

const singleBlog = [
    {
        title: 'First Note',
        author: 'First Author',
        url: 'http://localhost.test',
        likes: 4
    },
]

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes, initialBlogs, blogsInDB, singleBlog }