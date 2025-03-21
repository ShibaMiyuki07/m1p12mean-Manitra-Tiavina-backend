const app = require('./app');
const connectDB = require('./config/db');
const  port  = process.env.NODE_ENV || 8888;

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});