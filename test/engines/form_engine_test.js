QUnit.test( "default form engine", function( assert ) {
  var engine = new forma.FormEngine();
  assert.ok(engine, 'default engine exists');

  var form = new forma.Form({ title: 'Login', icon: 'user' });
  var formHtml = engine.generateFormTag(form).toHtml();

  assert.ok(formHtml.indexOf('<div class="forma-title">') !== -1, 'should iclude title tag');
  assert.ok(formHtml.indexOf('<i class="fa fa-user forma-title-icon"></i>') !== -1, 'icon should present too');
  assert.ok(formHtml.indexOf('<form role="form" class="form-body">') !== -1, 'form body should present');
  assert.ok(formHtml.indexOf('<%if (typeof _errors !== "undefined" && typeof _errors._form !== "undefined" && _errors._form){%><div class="alert alert-danger"><%= _errors._form %></div><%}%>') !== -1, 'global error detection should present');
});