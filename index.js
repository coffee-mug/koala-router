const Koa = require('koa'),
      app = new Koa(),
      router = require('./src/router.js').create();

// Routes
console.log(router);

// Handle file references
router.add('/', "./src/static/index.html");

router.add('/lol', async ctx => {
  ctx.body = "POL";
});

router.add('/dol', async ctx => {
  ctx.body = "dol";
});

// Call the router
app.use(router.handleRequests.bind(router));
app.listen(8000);
