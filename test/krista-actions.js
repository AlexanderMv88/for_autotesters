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
        //--

    //Перехожу на страницу:
    await driver.get("https://www.krista.ru/");

    //Ждем появления запроса на использование cookie
    await driver.sleep(1000)
        //Отклоняею запрос на использование cookie
    await handleCookieRequest(driver);


    await driver.sleep(1000)
    await clickOnWebComponent(driver, "РЕШЕНИЯ");
    await driver.sleep(1000)
    await clickOnWebComponent(driver, "УЧЕБНЫЙ ЦЕНТР");
    await driver.sleep(1000)
    await clickOnWebComponent(driver, "СОТРУДНИЧЕСТВО");
    ""



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

async function clickOnWebComponent(driver, text) {

    //Переменной topMenu присваиваю результат поиска по переменной text (результат будет WebElement)
    const topMenu = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), '" + text + "')]")),
        // не пройдет 5 секунд
        5000
    );
    //--
    //--Беру родителя у найденого ранее WebElement-а
    //Переменной parent присваиваю родителя WebElement-а хранящегося в переменной topMenu
    var parent = topMenu.findElement(By.xpath("./.."));
    //--
    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(parent).perform();
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