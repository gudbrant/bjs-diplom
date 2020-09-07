  
"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => response.success ? location.reload() : userForm.setLoginErrorMessage(response.error));
};


/*
userForm.loginFormCallback = data => {
  ApiConnector.login(data, callback => {
    console.log(callback);
    if (callback.success) {
      location.reload();
    } else {
      console.log(callback.data);
      userForm.setLoginErrorMessage(callback.data);
    }
  });
};
*/

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => response.success ? location.reload() : userForm.setRegisterErrorMessage(response.error));
};


/*
userForm.registerFormCallback = data => {
  ApiConnector.register(data, callback => {
    console.log(callback);
    if (callback.success) {
      location.reload();
    } else {
      console.log(callback.data);
      userForm.setRegisterErrorMessage(callback.data);
    }
  });
};
*/