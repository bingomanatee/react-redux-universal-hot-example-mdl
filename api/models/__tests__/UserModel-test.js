import {expect} from 'chai';
import initMongoose from './../initMongoose';
import mongoose from 'mongoose';

describe('UserModel', () => {
    let conn;
    let dbName;
    let UserModel;
    beforeEach(function (done) {
        this.timeout(5000);
        const n = Math.floor(Math.random() * 1000000);
        dbName = `userModelTestCollection${n}`;
        conn = initMongoose(`mongodb://localhost:27017/${dbName}`);
        const testDB = () => {
            if (conn.readyState != 1) {
                setTimeout(testDB, 200);
            } else {
                UserModel = require('./../UserModel')(conn);
                done();
            }
        };

        testDB();
    });

    afterEach(function (done) {
        this.timeout(5000);
        conn.db.dropDatabase(() => done());
    });

    it('can serialize a user', function (done) {
        this.timeout(10000);

        const PHOTOS = ["http://www.foo.com/bar.png", "http://www.foo.com/vey.png"];

        var user = new UserModel({
            username: 'foo',
            displayName: 'Foo Johnson',
            provider: 'twitter',
            photos: PHOTOS,
            /*   json: {
             foo: 1,
             bar: 2
             }, */
            twAuth: {
                tokenSecret: 'foo',
                token: 'bar'
            }
        });

        var data = user.toObject();
        delete data._id;

        UserModel.serialize(data)
            .then(id => {
                UserModel.findById(id, (err, user) => {
                    expect(user.username).to.equal('foo');
                    expect(user.displayName).to.equal('Foo Johnson');
                    done();
                });
            });
    });
    it('can deserialize a user', function (done) {
        this.timeout(10000);

        const PHOTOS = ["http://www.foo.com/bar.png", "http://www.foo.com/vey.png"];

        var user = new UserModel({
            username: 'foo',
            displayName: 'Foo Johnson',
            provider: 'twitter',
            photos: PHOTOS,
            /*   json: {
             foo: 1,
             bar: 2
             }, */
            twAuth: {
                tokenSecret: 'foo',
                token: 'bar'
            }
        });

        var data = user.toObject();
        delete data._id;

        UserModel.serialize(data)
            .then(id => {
                UserModel.deserialize(id)
                    .then(dsUser => {
                        expect(dsUser.username).to.equal(user.username);
                        expect(dsUser.displayName).to.equal(user.displayName);
                        done();
                    });
            });
    });

    it('can create a user', function (done) {
        this.timeout(10000);
        const PHOTOS = ["http://www.foo.com/bar.png", "http://www.foo.com/vey.png"];

        var user = new UserModel({
            username: 'foo',
            displayName: 'Foo Johnson',
            provider: 'twitter',
            photos: PHOTOS,
            /*   json: {
             foo: 1,
             bar: 2
             }, */
            twAuth: {
                tokenSecret: 'foo',
                token: 'bar'
            }
        });

        user.save(err => {
            UserModel.findOne({username: 'foo'}, (err, foo) => {
                expect(foo.username).to.equal('foo');
                expect(foo.displayName).to.equal('Foo Johnson');
                expect(foo.provider).to.equal('twitter');
                expect(foo.photos[0]).to.equal(PHOTOS[0]);
                expect(foo.photos[1]).to.equal(PHOTOS[1]);
                expect(Array.from(foo.photos)).to.deep.equal(PHOTOS);
                expect(foo.twAuth.tokenSecret).to.equal('foo');
                expect(foo.twAuth.token).to.equal('bar');
                done();
            });
        });
    });
});
