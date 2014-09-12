exports.TextField = (function() {
  var counter = 0;

  var TextField = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.name = options;
    }
    if ( !this.id ) {
      this.id = 'formaid-' + ( counter++ );
    }
  };

  TextField.prototype.generateFieldTag = function() {
    var engine = new forma.TextFieldEngine();
    return engine.generateFieldTag(this);
  };

  return TextField;

})();