export const config = {
    mongo:{
        options:{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            maxPoolSize: 50,
            autoIndex: false,
            retryWrites: false
        },
        url: 'mongodb+srv://openman:!ngRQfSp9k5TA2r@cluster0.trzawsg.mongodb.net/cianna_lighting'
    },
    server:{
        host: 'localhost',
        port: 1337
    }
}
export default config