
// imp shims

if (!("imp" in getroottable())) {

  imp <- {

    wakeup = function(timeout, callback) {
      callback();
    },

    cancelwakeup = function(id) {
    }

  };

}

// server shims

if (!("server" in getroottable())) {

  server <- {
    log = print,
    error = print
  };

}
