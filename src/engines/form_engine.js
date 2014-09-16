/**
 * Form engine can be overriden in `forma.FormEngine`, it should be accessible via `new forma.FormEngine()`.
 */
exports.DefaultFormEngine = (function() {

  var generateTitleTag = function() {
    var title = this.form.title
      , icon = this.form.icon
      , children = []
      , iconTag
      , titleTag;

    if ( title ) {

      if ( icon ) {
        iconTag = this.iconEngine.generateIconTag(icon, { class: 'forma-title-icon' });
        children.push(iconTag);
      }

      if ( title ) {
        children.push(new exports.html.Tag('span', { class: 'forma-title-text' }, title));
      }
      
      return new exports.html.Tag('div', { class: 'forma-title' }, children);
    }
  };

  var generateFieldsTag = function() {
    var fields = this.form.fields
      , children = [];

    if ( fields ) {
      return new exports.html.Tag('div', { class: 'form-fields' }, fields.map(function(field) {
        return field.generateFieldTag();
      }));
    }
  };

  var generateActionsTag = function() {
    if ( this.form.actions ) {
      var children = this.form.actions.map(function(action) { return action.generateActionButtonTag(); });
      return new exports.html.Tag('div', { class: 'form-actions' }, children);
    }
  };

  var generateBodyTag = function() {
    return new exports.html.Tag('form', { role: 'form', class: 'form-body' }, [
      generateFieldsTag.apply(this),
      generateActionsTag.apply(this),
    ]);
  };

  var Engine = function() {
    /* nothing here */
  };

  Engine.prototype.generateFormTag = function(form) {
    this.form = form;
    this.iconEngine = exports.iconEngine;

    var children = [
      generateTitleTag.apply(this),
      generateBodyTag.apply(this)
    ];

    return new exports.html.Tag('div', {class: 'forma-form'}, children);
  };

  return Engine;

})();

exports.FormEngine = exports.DefaultFormEngine;