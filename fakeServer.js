class Server {

  isIdValid(id, callback) {
    setTimeout(() => {
      if (id !== 'bob') {
        callback(true);
      } else {
        callback(false);
      }
    }, 100);
  }
  
  loadCountries(callback) {
    setTimeout(() => {
      callback([
        {id: 'JP', label: 'Japan'},
        {id: 'FR', label: 'France'},
        {id: 'USA', label: 'USA'}
      ]);
    }, 100);
  }

  register(user, callback) {
    setTimeout(() => {
      try {
        if (!user.id) {
          callback({error: "Missing id"});
        } else if (!user.name) {
          callback({error: "Missing name"});
        } else if (!user.email) {
          callback({error: "Missing e-mail"});
        }
        callback({
          // TODO
        });
      } catch (e) {
        console.error("Boom", e);
        callback({error: "Unexpected error"});
      }
    }, 100);
  }
}

window.server = new Server();
