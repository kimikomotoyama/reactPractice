Registration
============

Let's build a user registration form. It must ask the following information:

* user id (mandatory): the user id must not already be used
* name (mandatory)
* e-mail address (mandatory): it must be a valid address
* country (optional): populated using a list of countries loaded from the server

The user should not be able to hit the submit button if the form has validation errors. When everything has been validated, the user should see a thank you message.

There is a dummy server implementation that should be used to load the "remote" data and perform validation:

    server.register(user, (result, error) => {
      if (error) {
        console.error("Registration failed:", error);
      } else {
        // TODO
      }
    });

Reference image for the form:

![Form Sample](https://cdn.glitch.com/dd24390c-870b-40a1-baae-0f151812e5d4%2FFormSample.png?1542007103804)

Reference image for the validation:

![User Id Validation](https://cdn.glitch.com/dd24390c-870b-40a1-baae-0f151812e5d4%2FFieldValidation.png?1542007105765)
