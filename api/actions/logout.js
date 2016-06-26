export default function logout (req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null;
      if (req.logout && typeof (req.logout) === 'function') {
        req.logout();
      }
      return resolve(null);
    });
  });
}
