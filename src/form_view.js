exports.FormView = (function() {

  var FormView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.form = options && options.form;
      if( !this.form ) {
        throw new exports.Error('form not defined');
      }
      console.log(this.form);
    }
  });

  return FormView;

})();