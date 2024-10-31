import passport from "passport";
const checkIntID = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID. It must be an integer.' });
    }
    next();
};

const allowAnonymousUsers = (req, res, next) =>{
  console.log(!req.user && !req.cookies["annoUser"]);
    if (!req.user && !req.cookies["annoUser"]){
      const anonymousId = `anon-${Date.now()}`;  
      res.cookie('annoUser', anonymousId, {
        httpOnly: true,    
        maxAge: 1000 * 60 * 60 * 24,
      });
      console.log('New anonymous user assigned:', anonymousId);
    }
    next();
}

const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
          return next(err);  
      }
      if (user) {
          req.user = user;  
      }
      next();
  })(req, res, next);
};

export default {
  checkIntID,
  allowAnonymousUsers,
  optionalAuth
};