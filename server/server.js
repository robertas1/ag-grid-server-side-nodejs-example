import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import express from 'express';
import bodyParser from 'body-parser';

import OlympicWinnersService from './olympicWinnersService';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/olympicWinners', function(req, res) {
    console.log('req.body ');
    console.log(JSON.stringify(req.body));
    OlympicWinnersService.getData(req.body, (rows, lastRow) => {
        res.json({ rows: rows, lastRow: lastRow });
        //console.log('responce : ');
        //console.log({ rows: rows, lastRow: lastRow });
    });
});

app.listen(4000, () => {
    console.log('Started on localhost:4000');
});