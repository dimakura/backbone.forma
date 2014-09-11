QUnit.test( "default icon engine", function( assert ) {
  var engine = forma.iconEngine;
  assert.ok(engine, 'default engine exists');
  assert.ok(typeof engine.generateIcon === 'function', 'and it is a function');
  var icon = engine.generateIcon('user');
  assert.equal(icon, '<i class="fa fa-user"></i>', 'user icon generateion');
});