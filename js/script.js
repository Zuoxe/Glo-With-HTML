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

const countInput = document.querySelector(".main-controls__input input")
const selectInput = document.querySelector("select[name=views-select]")

let screens = document.querySelectorAll(".screen");

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle()
        appData.roolRange();
        appData.swithButton();

        selectInput.addEventListener("input", appData.swithButton)
        countInput.addEventListener("input", appData.swithButton)

        startBtn.addEventListener("click", appData.start)
        buttonPlus.addEventListener("click", appData.addScreenBlock)

        inputRange.disabled = true;

        inputRange.addEventListener("input", appData.roolRange)
    },
    addTitle: function () {
        document.title = title.textContent
    },

    start: function () {

        alert("Старт");

        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();

        console.log(appData);

        inputRange.disabled = false;
    },

    roolRange: function () {
        inputRangeValue.textContent = inputRange.value + "%";
        appData.rollback = parseInt(inputRange.value);

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
        totalCountRollBack.value = appData.servicePercentPrice.toFixed(0)

    },

    swithButton: function () {
        if (selectInput.value !== "" && countInput.value !== "") {
            startBtn.disabled = false;
        } else startBtn.disabled = true;
    },

    showResult: function () {
        total.value = appData.screenPrice
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullTotalCount.value = appData.fullPrice
        totalCount.value = appData.screenCount;
    },

    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            const count = screen.querySelector("input");

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                countScreens: +count.value
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

        for (let screen of appData.screens) {
            appData.screenCount += +screen.countScreens
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber

    },

}

appData.init();
