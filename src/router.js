const Trie = require('./trie.js'),
      fs = require('fs');

const routerMethods = {
  handleRequests: async function handle(ctx) {
    let route = ctx.request.url.endsWith('/') 
          ? ctx.request.url 
          : ctx.request.url + "/";
    let node = this.get(route);

    // Mandatory trailing slash 

    console.log(node);

    if (!node) {
      // 404
      ctx.response.status = 404;
      return;
    }

    if (typeof node.handler == "string") {
      // File to render
      // https://stackoverflow.com/questions/24024566/display-a-static-html-file-with-koa-js
      ctx.type = "html";
      ctx.body = fs.createReadStream(node.handler);
      return;
    }

    if (node.fragment) {
      // apply fragment
      return node.handler(ctx, node.fragment);
    }
    return node.handler(ctx);
  }
}
// Route middleware for koa.js
function createRouter() {
  const trie = Trie.createTrie();
  return Object.assign(trie, routerMethods);
}

module.exports = { "create": createRouter };
