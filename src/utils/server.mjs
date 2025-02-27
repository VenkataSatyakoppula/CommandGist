import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from '../routes/index.mjs';
import cors from 'cors';

const connectServer = ()=>{
    const app = express();
    // Middleware
    app.use(cors( {
        origin: "http://localhost",
        credentials: true // Allow cookies to be sent
    })); // enable All CORS
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
    app.use(cookieParser()); // Parse cookies

    //Router
    app.use('/', indexRouter);
    return app
}

export default connectServer
