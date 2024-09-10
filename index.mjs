import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import createServer from "./src/utils/server.mjs"
import connectDB from "./src/config/db.mjs";
import passport from "./src/middleware/passport.mjs";


// Initialize express app
const app = createServer();
app.use(passport.initialize());
// Database Connection
connectDB();

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
const PORT = normalizePort(process.env.PORT || 3000);
app.listen(PORT,()=> console.log(`App running on port ${PORT}`));