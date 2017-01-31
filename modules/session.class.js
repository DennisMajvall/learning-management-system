module.exports = class Session {

  schema(){
    return {
      cookieVal: String,
      lastActivity: Date,
      content: {type: mongoose.Schema.Types.Mixed}
    };
  }

}
