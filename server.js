const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");
const PORT = process.env.PORT || '5000';

app.use(bodyParser.json({
  limit: '150mb',
  verify: (req, res, buf) => { req.rawBody = buf; }
}));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/media', express.static(__dirname + '/media'));

app.use(express.static(path.join(__dirname, process.env.FORNT_END)));

/*mongodb connection using mongoose*/
const conectionUrl = process.env.conectionUrl || 'mongodb+srv://admin:vishal1234@cluster0.yuwek.mongodb.net/image_gallery?retryWrites=true&w=majority';
mongoose.connect(conectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb Connected....')).catch(err => console.log(err));

mongoose.Promise = global.Promise;
/*API ROUTES*/
require('./routes/index')(app, mongoose);

app.listen(PORT, () => { console.log(`Server is running.. on port ${PORT}`); });