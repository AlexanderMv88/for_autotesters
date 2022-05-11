const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const { until } = require("selenium-webdriver");
const jestConfig = require("../jest.config");
jest.setTimeout(10000);

let driver;

//Группирует тесты
describe('Тесты функционала https://b2b.warm-on.ru/', () => {
    //Перед всеми тестами выполняется 
    beforeAll(async() => {
        //--Создаю и настраиваю WebDriver
        /*let driver Создаем переменную driver
        new Builder() Начинаем создавать экземпляр WebDriver. await означает дождаться выполнения асинхронной функции
        .forBrowser("chrome") Настраивает целевой браузер для клиентов, созданных этим экземпляром
        .build() Создает клиент WebDriver на основе конфигурации*/
        driver = await new Builder().forBrowser("chrome").build();
        //Разворачиваю браузер в полноэкранный режим
        await driver.manage().window().maximize()
    }, 30000);

    //После всех тестов выполняется
    afterAll(async() => {
        await driver.quit();
    }, 40000);

    //Тест
    test('Должен придти к заголовку "Регистрация"', async() => {
        //Перехожу на страницу:
        await driver.get("https://b2b.warm-on.ru/");
        //Скролю до кнопки и нажимаю - "Стать партнером"
        await scrollAndClickOnWebComponent(driver, 1300, "Стать партнером");
        //Сохраняю заглавие страницы в переменную title
        var title = await driver.getTitle();
        console.log()
            //Проверяю, что значение переменной title соответствует "Регистрация"
        expect(title).toEqual("Регистрация");
    });

    test('Должен придти к заголовку "Регистрация"', async() => {
        //Перехожу на страницу:
        await driver.get("https://b2b.warm-on.ru/");
        //Скролю до кнопки и нажимаю - "Стать партнером"
        await scrollAndClickOnWebComponent(driver, 1300, "Стать партнером");
      
    });

    //Тут можно писать еще тесты
});




async function scrollAndClickOnWebComponent(driver, scroll, text) {


    await driver.executeScript("window.scrollTo(0, " + scroll + ")");
    await driver.sleep(2000);

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