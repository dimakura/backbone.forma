QUnit.test( "default form engine", function( assert ) {
  var engine = new forma.FormEngine();
  assert.ok(engine, 'default engine exists');

  var form = new forma.Form({title: 'Login', icon: 'user'});
  var formHtml = engine.generateFormTag(form).toHtml();

  assert.ok(formHtml.indexOf('<div class="forma-title">') !== -1, 'should iclude title tag');
  assert.ok(formHtml.indexOf('<i class="fa fa-user forma-title-icon"></i>') !== -1, 'icon should present too');
});