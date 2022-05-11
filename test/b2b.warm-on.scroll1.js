const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const { until } = require("selenium-webdriver");


async function example() {

    //--Создаю и настраиваю WebDriver
    /*let driver Создаем переменную driver
    new Builder() Начинаем создавать экземпляр WebDriver. await означает дождаться выполнения асинхронной функции
    .forBrowser("chrome") Настраивает целевой браузер для клиентов, созданных этим экземпляром
    .build() Создает клиент WebDriver на основе конфигурации*/
    let driver = await new Builder().forBrowser("chrome").build();
    //Разворачиваю браузер в полноэкранный режим
    await driver.manage().window().maximize()


    //Перехожу на страницу:
    await driver.get("https://b2b.warm-on.ru/");

    await scrollAndClickOnWebComponent(driver, 1300, "Стать партнером");


    //Жду 5 секунд чтобы загрузилась страница
    await driver.sleep(5000)

    //Беру заголовок и сохраняю в переменную title
    var title = await driver.getTitle();
    //Вывожу в терминал значение переменной title
    console.log('Title is:', title);

    //Завершает сеанс браузера
    await driver.quit();

}

example()



async function scrollAndClickOnWebComponent(driver, scroll, text) {

    //Скрол вниз
    await driver.executeScript("window.scrollTo(0, 1000)");
    await driver.sleep(300);

    const element = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), '" + text + "')]")),
        // не пройдет 5 секунд
        5000
    );

    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(element).perform();
}

async function clickOnWebComponent(driver, text) {

    //Переменной topMenu присваиваю результат поиска по переменной text (результат будет WebElement)
    const element = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), '" + text + "')]")),
        // не пройдет 5 секунд
        5000
    );
    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(element).perform();
}

async function handleCookieRequest(driver) {

    //Переменной topMenu присваиваю результат поиска по переменной text (результат будет WebElement)
    const webElement = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), 'Cancel')]")),
        // не пройдет 5 секунд
        5000
    );
    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(webElement).perform();
}