import express from "express";
import morgan from "morgan";

// My imports
import { router } from './routes/router';

const app = express();
const port = 3003;

// Settings
app.set('port', port);
app.set('json spaces', 2);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(router);


app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
})