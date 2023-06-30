import express from 'express';
import bodyParser from 'body-parser';
import router from './routes.js';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());
app.use(router); 

app.listen(7000, () => {
    console.log('Server is running on port 7000');
}); 