const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");

async function example(){

    var searchString = "Automation testing with Selenium";

    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    await driver.get("https://www.krista.ru/");

    var topMenu = await driver.findElement(By.className("avia-menu-text"));
    var parent = topMenu.findElement(By.xpath("./.."));


/*    console.log('WebElement is:',topMenu);
    console.log('Id is:',await topMenu.getId());
    console.log('Text is:',await topMenu.getText());
    console.log('atribute is:',await topMenu.getAttribute("class"));
    console.log('atribute is:',await topMenu.getAttribute("text"));
    console.log('atribute is:',await topMenu.getAttribute("value"));*/
    console.log('atribute is:',await topMenu.getAttribute("innerHTML"));
    console.log('atribute is:',await parent.getAttribute("itemprop"));


    //It is always a safe practice to quit the browser after execution
    await driver.quit();

}

example()