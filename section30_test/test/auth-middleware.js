const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function () {
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

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      }
    };
    //stub could be used to replace the external methods for testing purposes
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => { });
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
  });
});
