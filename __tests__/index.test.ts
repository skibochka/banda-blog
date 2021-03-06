// *******************************
// * CHECK AUTHORIZATION LOGIC
// *******************************
require('./tests/authorization.test');

// ********************************
// * CHECK DEFAULT USER BLOG LOGIC
// ********************************
require('./tests/defaultUserBlog.test');

// ********************************
// * CHECK DEFAULT ADMIN BLOG LOGIC
// ********************************
require('./tests/adminUserBlog.test');

// ********************************
// * CHECK USER ERRORS
// ********************************
require('./tests/defaultUserErrors.test');

// ********************************
// * CHECK AUTHORIZATION ERRORS
// ********************************
require('./tests/middlewaresErrors.test');

// ********************************
// * CHECK GETTING POSTS
// ********************************
require('./tests/gettingPosts.test');

// *******************************
// * CHECK AUTHORIZATION ERRORS
// *******************************
require('./tests/authorizationNegative.test');
