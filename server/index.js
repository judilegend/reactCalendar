const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const router = require("./routes/AdminRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use("/api/calendar", require("./routes/Calendarroutes"));
app.listen(port, console.log(`Server running....`));
