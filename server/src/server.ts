import http from 'http'
import express from "express";
import logging from '../config/logging'
import config from "../config/config";
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'
import roomRoutes from './routes/roomRoutes'

const router = express()

/** Server Handler */
const httpServer = http.createServer(router)

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(()=>{
        logging.info('Mongoose CONNECTED.')
    })
    .catch((error:any)=>{
        logging.error(error)
    })

router.use((req, res, next)=>{
    logging.info(`METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress}`);
    res.on('finish', ()=>{
        logging.info(`METHOD: '${req.method}' - URL:'${req.url}' - IP${req.socket.remoteAddress} - STATUS: '${res.statusCode}`)
    });
    next();
});

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

/**Routes */
router.use('/api/users', userRoutes);
router.use('/api/user', userRoutes);
router.use("/api/projects", projectRoutes);
router.use("/api/rooms", roomRoutes)
// router.use('/api')
/**Errors */
router.use((req,res,next)=>{
    const error = new Error('not found')

    return res.status(404).json({
        message: error.message
    })
})

/**Requests */
httpServer.listen(config.server.port, ()=>{
    logging.info(`Server is running at ${config.server.host}:${config.server.port}`)
})