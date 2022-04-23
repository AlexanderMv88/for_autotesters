const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
const {until} = require("selenium-webdriver");

async function example(){

    var searchString = "Automation testing with Selenium";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.manage().window().maximize()
    await driver.get("https://www.krista.ru/");


    //await driver.sleep(10000);

    //const topMenu = await driver.findElement(By.className("avia-menu-text"));
    const topMenu = driver.wait(
        until.elementLocated(By.className('avia-menu-text')),
        5000
    );
    var parent = topMenu.findElement(By.xpath("./.."));

    console.log('atribute is:',await topMenu.getAttribute("innerHTML"));
    console.log('atribute is:',await parent.getAttribute("itemprop"));

    const actions = driver.actions({async: true});
    // Perform context-click action on the element
    //await actions.contextClick(parent).perform();
    await actions.click(parent).perform();

    await driver.sleep(5000)
    var title = await driver.getTitle();
    console.log('Title is:',title);

    //It is always a safe practice to quit the browser after execution
    await driver.quit();

}

example()