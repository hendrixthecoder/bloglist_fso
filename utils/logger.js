require('dotenv').config()

const info = (...args) => {
    process.env.NODE_ENV === 'test' 
        ? '' 
        : console.log(...args);
}

const error = (...args) => {
    process.env.NODE_ENV === 'test' 
        ? '' 
        : console.log(...args);
}

module.exports = { info, error }

