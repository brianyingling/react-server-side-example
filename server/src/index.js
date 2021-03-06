import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com'), {
    proxyReqOptDecorator(opts) {
        opts.header['x-forward-host'] = 'localhost:3000';
        return ops;
    }
});

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();
    const promises = matchRoutes(Routes, req.path).map(({route})  => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
    // console.log(promises);

});

app.listen(3000, () =>{
    console.log('Listening on port 3000');
});
