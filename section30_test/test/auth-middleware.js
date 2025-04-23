const expect = require('chai').expect;

const authMiddleware = require('../middleware/is-auth');

it('should throw an error if no authorization header is present', function () {
  // simulate const authHeader = req.get('Authorization'); 
  // and return a null
  const req = {
    get: function (headerName) {
      return null;
    }
  };
  // make chai to run the function not us run the function
  // reference, req, res, next
  expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
    'Not authenticated.'
  );
});
