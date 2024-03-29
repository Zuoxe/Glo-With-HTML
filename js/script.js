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
const cmsOpenCheckbox = document.getElementById("cms-open");

const cmsInputValue = document.querySelector("#cms-other-input")




let screens = document.querySelectorAll(".screen");


const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    cmsValue: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},

    init: function () {
        this.addTitle()
        this.roolRange();
        this.swithButton();
        this.showHiddenVariants();
        this.cmsOther()


        selectInput.addEventListener("input", this.swithButton)
        countInput.addEventListener("input", this.swithButton)
        cmsOpenCheckbox.addEventListener("change", this.showHiddenVariants)

        startBtn.addEventListener("click", this.start)
        resetBtn.addEventListener("click", this.reset)
        buttonPlus.addEventListener("click", this.addScreenBlock)

        inputRange.disabled = true;

        inputRange.addEventListener("input", this.roolRange)
    },

    addTitle: function () {
        document.title = title.textContent
    },

    disableInput: function () {
        const totalCountInput = document.querySelectorAll(".main-controls__input input")
        const totalSelectInput = document.querySelectorAll("select[name=views-select]")

        buttonPlus.disabled = true;

        totalCountInput.forEach((item) => {
            item.disabled = true
        })

        totalSelectInput.forEach((item) => {
            item.disabled = true;
        })
    },

    deleteForms: function () {
        screens = document.querySelectorAll(".screen");
        appData.screens.length = 0;

        screens.forEach((item, index) => {
            if (index >= 1) {
                item.remove();
            }
        })
    },

    cmsOther: function () {
        const cmsSelect = document.querySelector("#cms-select")
        const cmsOtherIput = document.querySelector(".hidden-cms-variants .main-controls__input")
        // cmsInputValue = addEventListener("input")

        cmsSelect.addEventListener("change", (e) => {
            const currentTarget = e.currentTarget

            console.log(currentTarget);
            console.log(currentTarget.value);
            console.log(cmsInputValue.value);
            currentTarget.value === "other" ? cmsOtherIput.style = "display:block " : cmsOtherIput.style = "display:none "
            if (currentTarget.value !== "other") {
                this.cmsValue = currentTarget.value
            } else {
                this.cmsValue = +cmsInputValue.value
            }

        })
    },

    showHiddenVariants: function () {
        const checkOpenCMS = document.getElementById("cms-open")
        const hiddenCMS = document.querySelector(".main-controls__item.hidden-cms-variants")
        checkOpenCMS.checked ? hiddenCMS.style = "display:flex" : hiddenCMS.style = "display:none"

    },

    enableInput: function () {
        const totalCountInput = document.querySelectorAll(".main-controls__input input")
        const totalSelectInput = document.querySelectorAll("select[name=views-select]")

        buttonPlus.disabled = false;

        totalCountInput.forEach((item, index) => {
            if (index <= 0) {

                item.disabled = false
                item.value = ""
            }
        })

        totalSelectInput.forEach((item, index) => {
            if (index <= 0) {

                item.disabled = false;
                item.value = ""
            }
        })
    },

    resetChecks: function () {
        const check = document.querySelectorAll("input[type=checkbox]")
        check.forEach((item) => item.checked = false)
    },

    resetPrices: function () {
        appData.screenCount = 0
        appData.fullPrice = 0;
        appData.screenPrice = 0;
        appData.servicePercentPrice = 0
        appData.servicePricesNumber = 0
        appData.servicePricesPercent = 0
        appData.cmsValue = 0;

        cmsInputValue.value = "0"
        total.value = "0"
        totalCount.value = "0"
        totalCountOther.value = "0"
        fullTotalCount.value = "0"
        totalCountRollBack.value = "0"

    },

    reset: function () {

        appData.enableInput();
        appData.deleteForms();
        appData.resetPrices();
        appData.resetChecks();
        appData.switchResetBtn();
        appData.deleteObjectPrices()
        console.log(appData);

    },

    start: function () {


        console.log(cmsInputValue.value);
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.disableInput();
        appData.switchStartBtn();
        console.log(appData);

        inputRange.disabled = false;
    },

    switchStartBtn: function () {
        startBtn.style = "display:none"
        resetBtn.style = "display:block"
    },

    switchResetBtn: function () {
        startBtn.style = "display:block"
        resetBtn.style = "display:none"
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
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice + (this.fullPrice * (cmsInputValue.value / 100))
        totalCount.value = this.screenCount;
    },

    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            const count = screen.querySelector("input");

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                countScreens: +count.value
            })

        })
        console.log(this.screens);
    },
    addServices: function () {

        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]")
            const label = item.querySelector("label")
            const input = item.querySelector("input[type=text]")

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]")
            const label = item.querySelector("label")
            const input = item.querySelector("input[type=text]")

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })

    },

    addScreenBlock: function () {
        const cloneNode = screens[0].cloneNode(true);

        const cloneNodeInput = cloneNode.querySelector('input')
        const cloneNodeSelect = cloneNode.querySelector('select')

        cloneNodeInput.value = '';
        cloneNodeSelect.value = '';

        screens[0].after(cloneNode);
    },

    addPrices: function () {

        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }

        for (let screen of this.screens) {
            this.screenCount += +screen.countScreens
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        if (this.cmsValue > 0) {
            appData.fullPrice = +this.screenPrice + this.servicePricesPercent + appData.servicePricesNumber
            appData.fullPrice = this.fullPrice + (this.fullPrice * (this.cmsValue / 100))

        } else {
            appData.fullPrice = +this.screenPrice + this.servicePricesPercent + appData.servicePricesNumber
        }
    },

    deleteObjectPrices: function () {
        for (let key in this.servicesNumber) {
            delete this.servicesNumber[key]

        }
        for (let key in this.servicesPercent) {
            delete this.servicesPercent[key]
        }
    },

}

appData.init();
