/**
 * deprecated for twitter login
 * @param req
 * @returns {Promise.<{name: *}>}
 */

export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  console.log('user logged in: ', user);
  return Promise.resolve(user);
}
