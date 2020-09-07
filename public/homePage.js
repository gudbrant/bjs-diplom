"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(callback => {    
    if (callback.success) {
      location.reload();
    }
  });
};

ApiConnector.current(callback => {  
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
  }
});

const ratesBoard = new RatesBoard();
const ratesCall = () => {
  ApiConnector.getStocks(callback => {    
    if (callback.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(callback.data);
    }
  });
}
ratesCall();
setInterval(ratesCall, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, callback => {    
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(!callback.success, `Баланс успешно пополнен на ${data.amount}${data.currency}`);
    } else {      
      moneyManager.setMessage(!callback.success, callback.data);
    }
  });
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, callback => {    
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(!callback.success, `Конвертирование ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} выполнено успешно`);      
    } else {      
      moneyManager.setMessage(!callback.success, callback.data);
    }
  });
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, callback => {    
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);     
      moneyManager.setMessage(!callback.success, `Перевод ${data.amount} ${data.currency} пользователю id${data.to} выполнено успешно`);      
    } else {      
      moneyManager.setMessage(!callback.success, callback.data);
    }
  });
}


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {  
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    moneyManager.updateUsersList(callback.data);
  };
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, callback => {    
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(!callback.success, `Пользователь ${data.name}(id:${data.id}) успешно добавлен в избранное`);
    } else {      
      favoritesWidget.setMessage(!callback.success, callback.data);
    }
  });
};

favoritesWidget.removeUserCallback = (id) => {  
  ApiConnector.removeUserFromFavorites(id, callback => {    
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(!callback.success, `Пользователь id:${id} успешно удален из избранного`);
    } else {      
      favoritesWidget.setMessage(!callback.success, callback.data);
    }
  });
};