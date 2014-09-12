exports.Form = (function() {

  var Form = function(options) {
    if (typeof options === 'object') {
      _.extend(this, options);
    } else if (typeof options === 'string') {
      this.title = options;
    }
  };

  Form.prototype.toHtml = function() {
    var engine = new forma.FormEngine();
    return engine.generateFormTag(this).toHtml();
  };

  return Form;

})();