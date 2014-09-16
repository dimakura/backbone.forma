
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
      name: this.field.name,
      type: type,
      value: '<%-'+this.field.name+'%>',
      class: 'form-control'
    });
  };

  var generateErrorTemplate = function() {
    return [
      '<%if(_errors && _errors.'+this.field.name+'){%>',
      '<div class="text-danger"><%= _errors.'+this.field.name+' %></div>',
      '<%}%>'
    ].join('');
  };

  var Engine = function() {
    /* nothing here */
  };

  Engine.prototype.generateFieldTag = function(field, opts) {
    var errors = opts && opts.errors;
    this.field = field;
    this.iconEngine = exports.iconEngine;

    var children = [
      generateLabelTag.apply(this),
      generateInputField.apply(this),
      generateErrorTemplate.apply(this)
    ];

    var classNameTemplate = '<%if(_errors.'+this.field.name+'){%>has-error<%}%>';

    return new exports.html.Tag('div', { class: ['forma-field', 'form-group', classNameTemplate] }, children);
  };

  Engine.registerOnChangeEvent = function(field, view, callback) {
    view.events['change #'+field.id] = function() {
      callback( $('#'+field.id).val() );
    };
  };

  return Engine;

})();

exports.TextFieldEngine = exports.DefaultTextFieldEngine;
