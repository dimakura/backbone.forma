exports.TextField = (function() {
  var counter = 0;

  var TextField = function(options) {
 
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.name = options;
    }

    if ( !this.id ) { this.id = exports.utils.nextId(); }

  };

  TextField.prototype.generateFieldTag = function() {
    var engine = new forma.TextFieldEngine();
    return engine.generateFieldTag(this);
  };

  TextField.prototype.registerOnChangeEvent = function(view) {
    var self = this;
    exports.TextFieldEngine.registerOnChangeEvent(this, view, function(value) {
      view.model.set(self.name, value);
    });
  };

  return TextField;

})();
