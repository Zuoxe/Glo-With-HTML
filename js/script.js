const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollBack = document.getElementsByClassName('total-input')[4]


let screens = document.querySelectorAll(".screen");



const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 50,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle()

        startBtn.addEventListener("click", appData.start)
        buttonPlus.addEventListener("click", appData.addScreenBlock)
    },
    addTitle: function () {
        document.title = title.textContent
    },

    start: function () {
        alert("Старт");
        appData.addScreens();
        appData.addServices();

        appData.addPrices();
        console.log(appData);

    },

    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })

        })
        console.log(appData.screens);
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]")
            const label = item.querySelector("label")
            const input = item.querySelector("input[type=text]")

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]")
            const label = item.querySelector("label")
            const input = item.querySelector("input[type=text]")

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })

    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: function () {

        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

    },

    getAllServicePrices: function () {

        for (let key in appData.services) {
            appData.AllServicePrices += appData.services[key];
        }
    },

    getFullPrice: function () {
        appData.fullPrice = Number(this.AllServicePrices) + Number(this.screenPrice);
    },

    getTitle: function () {
        return this.title.trim()[0].toUpperCase() + this.title.trim().slice(1).toLowerCase();

    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice * (appData.rollback / 100);
    },

    getPercent: function (price) {

        if (price > 30000) {
            return "Цена со скидкой 30% ";
        } else if (15000 <= price && price < 30000) {
            return "Цена со скидкой 5% ";
        } else if (price >= 0 && price <= 15000) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что-то пошло не так";
        }
    },



    logger: function () {
        console.log("Информация о проекте:");

        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);

    }
}

appData.init();
