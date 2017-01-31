module.exports = class Sessionhandler {

  constructor(
    mongooseSessionModel,
    cookieName = "app-session",
    removeInactiveSessionsAfterMs = 60*60*1000 // one hour
  ){
    this.Session = mongooseSessionModel;
    this.getSessionsFromDB(); // will set this.sessionMem
    this.cookieName = cookieName;
    this.removeInactiveSessionsAfterMs = removeInactiveSessionsAfterMs;
    setInterval(
      ()=>{this.removeInactiveSessions();},
      removeInactiveSessionsAfterMs/10 // run every 6 minutes if default
    );
  }


  middleware(){
    // Create Express middleware
    return (req,res,next)=>{
      var cookieVal = this.getCookie(req) || this.setCookie(res);
      req.session = this.getSession(cookieVal);
      req.session.lastActivity = new Date();
      req.session.save();
      next();
    }
  }


  getCookie(req){
    // Read the cookie from the request object
    return req.cookies[this.cookieName];
  }


  setCookie(res){
    // Set the cookie on the respond object
    var val = this.generateCookieVal();
    res.cookie(this.cookieName,val,{
      expires: 0,
      httpOnly: true,
      path: "/",
      secure: false, // only https
    });
    return val;
  }


  generateCookieVal(){
    // Generate a random cookie value
    var newVal;
    while(!newVal || this.sessionMem[newVal]){
      newVal = (Math.random()+'').split('.')[1];
    }
    return newVal;
  }


  getSession(cookieVal){
    // Get the session from sessionMem
    if(!this.sessionMem[cookieVal]){
      // If no session create one
      var session = new this.Session({
        cookieVal:cookieVal,
        content: {user:false}
      });
      this.sessionMem[cookieVal] = session;
    }
    // Return the session
    return this.sessionMem[cookieVal];
  }


  getSessionsFromDB(){
    // this.sessionMem -> sessions hashed by cookieVal
    this.sessionMem = {};
    // get all sessions stored in the db
    this.Session.find((err,sessionsArr)=>{
      // hash them into sessionmem with the cookie val as key
      (sessionsArr || []).forEach((session)=>{
        this.sessionMem[session.cookieVal] = session;
      });
    });

  }


  removeInactiveSessions(){
    for(var i in this.sessionMem){
      if(
        this.sessionMem[i].lastActivity.getTime() +
        this.removeInactiveSessionsAfterMs < new Date().getTime()
      ){
        // inactive for too long - remove
        this.sessionMem[i].remove(); // remove from MongoDB
        delete this.sessionMem[i]; // remove from this.sessionMem
      }
    }
  }

}
