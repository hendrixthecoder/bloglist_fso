const _ = require('lodash')

const blogs = [
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsgerfr W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
]



const authors = blogs.map(({ author }) => author)
const blogAuthors = _.uniq(authors)

let arr = []

for(const name of blogAuthors) {
    let obj = {}
    obj['author'] = name
    obj['likes'] = blogs.map(({ author, likes }) => ({ author, likes }))
                        .filter(blog => blog.author === name)
                        .map(cat => cat.likes)
    arr.push(obj)
}

console.log(arr)



const mostPopular = (...args) => {
    const authors = _.map(...args, (blog) => blog.author)
    const values = _.countBy(authors)
    const arr = Object.entries(values).map(([ author, blogs ]) => ({ author, blogs }))
    const maxBlogs = Math.max(...arr.map(blog => blog.blogs))
    const popular = arr.filter(blog => blog.blogs === maxBlogs)
    return popular.length > 1 ? popular[0] : popular
}

// console.log(mostPopular(blogs));

const getAuthorWithMostLikes = (...args) => {
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
    return arr.filter(each => each.likes === likes)
}

// console.log(getAuthorWithMostLikes(blogs))

const likesArray = blogs.map(blog => blog.likes)
const maxNumOfLikes = Math.max(...likesArray)
const authorWithMostLikes = blogs.filter(blog => blog.likes === maxNumOfLikes)
// console.log(authorWithMostLikes.map(authors => authors.author));



// console.log(popularAuthor);
