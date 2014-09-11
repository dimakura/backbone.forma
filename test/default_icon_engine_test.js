QUnit.test( "default icon engine", function( assert ) {
  var engine = forma.iconEngine;
  assert.ok(engine, 'default engine exists');
  assert.ok(typeof engine.generateIconTag === 'function', 'and it\'s generateIconTag property is a function');
  var icon = engine.generateIconTag('user', {class: 'user-icon'}).toHtml();
  assert.equal(icon, '<i class="fa fa-user user-icon"></i>', 'user icon generateion');
});