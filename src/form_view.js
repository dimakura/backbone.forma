exports.FormView = (function() {

  var FormView = Backbone.Marionette.ItemView.extend({

    initialize: function(options) {
      this.form = options && options.form;
      if( !this.form ) {
        throw new exports.Error('form not defined');
      }
    },

    getTemplate: function() {
      var engine = new forma.FormEngine();
      var template = engine.generateFormTag(this.form).toHtml();
      return _.template(template);
    }

  });

  return FormView;

})();