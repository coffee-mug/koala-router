// Factories functions
function createNode() {
  let node = {
    handler: null,
    fragment: null,
    next: new Array(256),
  }
  return Object.create(node);
}

function createTrie(root, radix=256) {
  root = root || createNode();

  var source = {
    root: root,
    radix: radix
  }

  var methods = {
    traverse(node, key, index, fragment) {
      if (!node)
        return null;

      // Wildcard
      if (node.next[42]) {
        // get the fragment
        var fragment = this.captureFragment(key, index);

        // Must replace the key with *
        console.log("Fragment", fragment);
        key = key.replace(fragment, '*');
        console.log("updated key", key);
      }

      console.log("Fragment to pass as an argument", fragment);

      if (index == key.length) {
        node.fragment = fragment;
        return node
      }

      var nextChar = key[index].charCodeAt();
      return this.traverse(node.next[nextChar], key, index + 1, fragment)
    },
    put(node, key, index, handler) {
      if (!node) {
        node = createNode()
      }
      if (index == key.length) {
        node.handler = handler 
        return node
      }
      var nextChar = key[index].charCodeAt();

      node.next[nextChar] = this.put(node.next[nextChar], key, index + 1, handler)
      return node;
    },
    captureFragment(k, i) {
      let concat = "";
      while (k[i] !== "/") {
        concat += k[i];
        i++
      }
      return concat;
    },
    add(key, handler) {
      return this.put(this.root, key, 0, handler);
    },
    get(key) {
      return this.traverse(this.root, key, 0, null);
    },
  }

  // Object.assign and create methods allow us to "hide" some methods by making them
  // delegated instead of copied as a property of the object
  // Let's leverage this to hide initialization aspects (radix and root)
  let hidden = Object.create(source);
  return Object.assign(hidden, methods);
}

// TODO: Implement unit tests once wi-fi back
module.exports = { "createTrie": createTrie };
