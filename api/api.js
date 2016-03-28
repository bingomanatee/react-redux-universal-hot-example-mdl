import express from 'express';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import passport from'passport';
const TwitterStrategy = require('passport-twitter').Strategy;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const pretty = new PrettyError();

const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');
console.log('_______ config: ', config);
const twitterCallbackUrl = `http://${config.apiHost}:${config.apiPort}/login/twitter/auth`;
console.log('return api: ', twitterCallbackUrl);

var twitterConfig = require('./../keys/twitter.json');
var keys = {
    callbackURL: twitterCallbackUrl,
    consumerKey: twitterConfig.consumer_key,
    consumerSecret: twitterConfig.consumer_secret
};

app.use(bodyParser.json());
app.use(session({
    secret: config.sessionKey,
    store: new MongoStore({
        url: 'mongodb://localhost/eyfApp'
    })
}));
passport.use(new TwitterStrategy(keys,
    function (token, tokenSecret, profile, cb) {
        console.log('profile: ', profile);
        cb(null, profile);
    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());


app.get('/login/twitter/auth',
    passport.authenticate('twitter', {
        failureRedirect: `/login`,
        successRedirect: '/'
    }));

app.get('/login/twitter',
    passport.authenticate('twitter'));

/* passport.authenticate('twitter', {failureRedirect: `$(config.host}:${config.port}/login`}),
 function (req, res) {
 res.redirect(`$(config.host}:${config.port}/`);
 }); */

app.use((req, res) => {
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

    const {action, params} = mapUrl(actions, splittedUrlPath);

    if (action) {
        action(req, params)
            .then((result) => {
                if (result instanceof Function) {
                    result(res);
                } else {
                    res.json(result);
                }
            }, (reason) => {
                if (reason && reason.redirect) {
                    res.redirect(reason.redirect);
                } else {
                    console.error('API ERROR:', pretty.render(reason));
                    res.status(reason.status || 500).json(reason);
                }
            });
    } else {
        res.status(404).end('NOT FOUND');
    }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
    const runnable = app.listen(config.apiPort, (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
        console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    });

    io.on('connection', (socket) => {
        socket.emit('news', {msg: `'Hello World!' from server`});

        socket.on('history', () => {
            for (let index = 0; index < bufferSize; index++) {
                const msgNo = (messageIndex + index) % bufferSize;
                const msg = messageBuffer[msgNo];
                if (msg) {
                    socket.emit('msg', msg);
                }
            }
        });

        socket.on('msg', (data) => {
            data.id = messageIndex;
            messageBuffer[messageIndex % bufferSize] = data;
            messageIndex++;
            io.emit('msg', data);
        });
    });
    io.listen(runnable);
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
}
