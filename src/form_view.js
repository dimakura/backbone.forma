exports.FormView = (function() {

  var FormView = Backbone.Marionette.ItemView.extend({

    initialize: function(options) {
      if ( typeof options === 'object' ) { _.extend(this, options); }
      if ( !this.form ) { throw new exports.Error('form not defined'); }
    },

    getTemplate: function() {
      return _.template( this.form.toHtml() );
    }

  });

  return FormView;

})();