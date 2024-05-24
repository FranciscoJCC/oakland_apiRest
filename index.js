const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
/* Errores */
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');


const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/api/v1/', (req, res ) => {
    res.send('Express en mi servidor');
});

//Cors config
const whiteList = ['http://localhost:5173']; //Dev local
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error('Permission co denied'));
        }
    }
};


//Auth
require('./utils/auth');

//Cors
app.use(cors(options));

//Router API
routerApi(app);

//Middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}/api/v1`);
});