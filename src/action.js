exports.Action = (function() {

  var Action = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.label = options;
    }
  };

  return Action;

})();