QUnit.test( "default text field engine", function( assert ) {
  var engine = new forma.TextFieldEngine();
  assert.ok(engine, 'default engine exists');
  
  var field = new forma.TextField({ name: 'username', label: 'Username' });
  var html = engine.generateFieldTag(field).toHtml();

  assert.ok(html.indexOf('<div class="forma-field form-group">') !== -1);
  assert.ok(html.indexOf('<label for="'+field.id+'">') !== -1);
  assert.ok(html.indexOf('Username') !== -1);
  assert.ok(html.indexOf('<input id="'+field.id+'" type="text" value="<%-username%>" class="form-control"></input>') !== -1);
});