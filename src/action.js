exports.Action = (function() {

  var Action = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.label = options;
    }
  };

  Action.prototype.generateActionButtonTag = function() {
    var engine = new exports.ActionEngine();
    return engine.generateActionButtonTag(this);
  };

  return Action;

})();