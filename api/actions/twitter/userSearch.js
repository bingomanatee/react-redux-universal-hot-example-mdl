let passport = require('passport');

export default function userSearch(req) {
    return new Promise((resolve, reject) => {
        if (!req.user) {
            reject({error: 'must be logged in'});
        } else {
            var query = req.body.query;
            if (!query) {
                resolve({query: '', users: []});
            } else {
                var uri = 'https://api.twitter.com/1.1/users/search.json?include_entities=false&q=' + encodeURIComponent(query);
                if (req.user.twAuth) {
                    if (passport._strategies.twitter) {
                        passport._strategies.twitter._oauth._performSecureRequest(
                            req.user.twAuth.token,
                            req.user.twAuth.tokenSecret,
                            'GET',
                            uri,
                            null,
                            null, null, function (err, data) {
                                if (!err) {
                                    var jsonData = JSON.parse(data);
                                    resolve({
                                        query: query,
                                        users: jsonData
                                    });
                                } else {
                                    reject(err);
                                }
                            });
                    } else {
                        reject({error: 'no twitter passport strategy'});
                    }
                }
                else {
                    reject({error: 'no non-twitter-strategy path'});
                }
            }
        }
    });
}

