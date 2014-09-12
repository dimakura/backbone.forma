exports.TextField = (function() {

  var TextField = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.name = options;
    }
  };

  return TextField;

})();