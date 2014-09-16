QUnit.test( "default text field engine", function( assert ) {
  var engine = new forma.TextFieldEngine();
  assert.ok(engine, 'default engine exists');
  
  var field = new forma.TextField({ name: 'username', label: 'Username' });
  var html = engine.generateFieldTag(field).toHtml();

  assert.ok(html.indexOf('<div class="forma-field form-group <%if(typeof _errors !== "undefined" && _errors && _errors.username){%>has-error<%}%>">') !== -1);
  assert.ok(html.indexOf('<label for="'+field.id+'">') !== -1);
  assert.ok(html.indexOf('Username') !== -1);
  assert.ok(html.indexOf('<input id="'+field.id+'" name="username" type="text" value="<%-username%>" class="form-control"></input>') !== -1);
});