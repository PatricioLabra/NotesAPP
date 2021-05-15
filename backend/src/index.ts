import express from "express";
import morgan from "morgan";

const app = express();
const port = 3003;

// Settings
app.set('port', port);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
})