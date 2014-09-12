/**
 * Form engine can be overriden in `forma.FormEngine`, it should be accessible via `new forma.FormEngine()`.
 */
exports.DefaultTextFieldEngine = (function() {

  var generateLabelTag = function() {
    if( this.field.label ) {
      var children = [ this.field.label ];
      if ( this.field.required ) {
        children.push(new exports.html.Tag('span', { class: 'forma-required' }, '*'));
      }
      return new exports.html.Tag('label', { for: this.field.id }, children);
    }
  };

  var generateInputField = function() {
    var type = this.field.hidden ? 'password' : ( this.field.email ? 'email' : 'text');
    return new exports.html.Tag('input', {
      id: this.field.id,
      type: type,
      value: '<%-'+this.field.name+'%>',
      class: 'form-control'
    });
  };

  var Engine = function() {
    /* nothing here */
  };

  Engine.prototype.generateFieldTag = function(field) {
    this.field = field;
    this.iconEngine = exports.iconEngine;

    var children = [
      generateLabelTag.apply(this),
      generateInputField.apply(this),
    ];

    return new exports.html.Tag('div', { class: ['forma-field', 'form-group'] }, children);
  };

  return Engine;

})();

exports.TextFieldEngine = exports.DefaultTextFieldEngine;