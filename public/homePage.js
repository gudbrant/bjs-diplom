"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => response.success ? location.reload() : alert(response.error));
};

ApiConnector.current(response => response.success ? ProfileWidget.showProfile(response.data) : alert(response.error));


const ratesBoard = new RatesBoard();


function getCours() {
    ApiConnector.getStocks(response => response.success ? (ratesBoard.clearTable(), ratesBoard.fillTable(response.data)) : alert(response.error));
}
getCours();
setInterval(() => getCours(), 60000);


const moneyManager = new MoneyManager();


moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Баланс успешно пополнен на ${data.amount}${data.currency}`)) : moneyManager.setMessage(response.success, response.error));
};


moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Конвертирование ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} выполнено успешно`)) : moneyManager.setMessage(response.success, response.error));
};


moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Перевод ${data.amount} ${data.currency} пользователю id${data.to} выполнено успешно`)) : moneyManager.setMessage(response.success, response.error));
};


const favoritesWidget = new FavoritesWidget();


ApiConnector.getFavorites(response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data)) : favoritesWidget.setMessage(response.error));


favoritesWidget.addUserCallback = data => { ApiConnector.addUserToFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, `Пользователь ${data.name}(id:${data.id}) успешно добавлен в избранное`)) : favoritesWidget.setMessage(response.success, response.error)) };
/*Удаление пользователя */
favoritesWidget.removeUserCallback = data => { ApiConnector.removeUserFromFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, `Пользователь id:${id} успешно удален из избранного`)) : favoritesWidget.setMessage(response.success, response.error)) };