

function testLog(req, res, next) {
  console.log('Paso por el middleware de testeo _=+-');
  next();
}

module.exports = {
    testLog
}