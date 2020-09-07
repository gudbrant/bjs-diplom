"use strict";

//Завершение сеанса

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => response.success ? location.reload() : alert(response.error));
};


//Данные пользователя

ApiConnector.current(response => response.success ? ProfileWidget.showProfile(response.data) : alert(response.error));


const ratesBoard = new RatesBoard();

//курс валют

function getCours() {
    ApiConnector.getStocks(response => response.success ? (ratesBoard.clearTable(), ratesBoard.fillTable(response.data)) : alert(response.error));
}
getCours();
setInterval(() => getCours(), 60000);

//Валютные операции

const moneyManager = new MoneyManager();

//Добавление валюты

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Баланс успешно пополнен на ${data.amount}${data.currency}`)) : moneyManager.setMessage(response.success, response.error));
};

//Конвертация

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Конвертирование ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} выполнено успешно`)) : moneyManager.setMessage(response.success, response.error));
};

//Перевод

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => response.success ? (ProfileWidget.showProfile(response.data), moneyManager.setMessage(response.success, `Перевод ${data.amount} ${data.currency} пользователю id${data.to} выполнено успешно`)) : moneyManager.setMessage(response.success, response.error));
};

//Адрессная книга

const favoritesWidget = new FavoritesWidget();


ApiConnector.getFavorites(response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data)) : favoritesWidget.setMessage(response.error));

//Добавление пользователей в адресную книгу

favoritesWidget.addUserCallback = data => { ApiConnector.addUserToFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, `Пользователь ${data.name}(id:${data.id}) успешно добавлен в избранное`)) : favoritesWidget.setMessage(response.success, response.error)) };

//удаление пользователя из адресной книги

favoritesWidget.removeUserCallback = data => { ApiConnector.removeUserFromFavorites(data, response => response.success ? (favoritesWidget.clearTable(), favoritesWidget.fillTable(response.data), moneyManager.updateUsersList(response.data), favoritesWidget.setMessage(response.success, `Пользователь id:${id} успешно удален из избранного`)) : favoritesWidget.setMessage(response.success, response.error)) };