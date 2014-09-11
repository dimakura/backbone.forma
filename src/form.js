exports.Form = (function() {

  var Form = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.title = options;
    }
  };

  return Form;

})();