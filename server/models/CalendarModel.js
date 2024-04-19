const mongoose = require('mongoose')

const CalendarSchema = mongoose.Schema(
    {
        start:Date,
        end:Date,
        title:String
    }
)

const Calendar = mongoose.model('Calendar' , CalendarSchema)
module.exports = Calendar