import passport from'passport';
const TwitterStrategy = require('passport-twitter').Strategy;
var twitterConfig = require('./../../keys/twitter.json');

export default (app, config) => {
    const twitterCallbackUrl = `http://${config.apiHost}:${config.apiPort}/login/twitter/auth`;
    var keys = {
        callbackURL: twitterCallbackUrl,
        consumerKey: twitterConfig.consumer_key,
        consumerSecret: twitterConfig.consumer_secret
    };
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
    app.get('/login/twitter',
        passport.authenticate('twitter'));

    app.get('/login/twitter/auth',
        passport.authenticate('twitter', {
            failureRedirect: `/login`,
            successRedirect: `http://${config.host}:${config.port}/`
        }));
}
