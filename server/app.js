const express = require('express');
const appData = require('../data.json');
const seller = appData.seller;
const app = express();
const apiRoute = express.Router();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

apiRoute.get('/seller', (req, res) => {
  res.json({
    code: 200,
    data: appData.seller
  })
})
apiRoute.get('/goods', (req, res) => {
  res.json({
    code: 200,
    data: appData.goods
  })
})
apiRoute.get('/ratings', (req, res) => {
  res.json({
    code: 200,
    data: appData.ratings
  })
})

app.use('/api', apiRoute);

app.listen(3030)