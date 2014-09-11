exports.Error = (function() {

  var FormaError = function(message) {
    this.name = 'FormaError';
    this.message = message;
    this.stack = (new Error()).stack;
  };

  FormaError.prototype = new Error();
  FormaError.prototype.constructor = FormaError;

  return FormaError;

})();