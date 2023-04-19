const asyncHandler = require('express-async-handler');
const userService = require('./userService')

const searchBook = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const serachedBook = await userService.searchBook(name);
    res.status(200).json({
        data: serachedBook,
    })
})

module.exports = {
    searchBook,
}