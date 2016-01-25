module.exports = function(MyUser) {

  MyUser.afterRemote('login', function(context, accessToken, next) {
    if (accessToken != null) {
      if (accessToken.id != null) {
        context.res.cookie('access_token', accessToken.id, {
          signed: context.req.signedCookies ? true : false,
          maxAge: 1000 * accessToken.ttl
        });
        context.res.cookie('userId', accessToken.userId.toString(), {
          signed: context.req.signedCookies ? true : false,
          maxAge: 1000 * accessToken.ttl
        });
      }
    }
    return next();
  });

  MyUser.afterRemote('logout', function(context, result, next) {
    context.res.clearCookie('access_token');
    context.res.clearCookie('userId');
    return next();
  });

};
