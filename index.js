const puppeteer = require('puppeteer');
const csv = require('csv-parser')
const fs = require('fs')

// The message you want to write is probably different to mine, so I moved it out to its own file.
var message = require('./message.js');

const waitBetweenPages = 500;
const timeOutValue = 20000;

// You can set this to true if you feel comfortable with it, im not sure its a good idea...
automaticSubmit = false;

const tindieOrderUrl = 'https://www.tindie.com/orders/'

async function markAsShipped(browser, data) {

    console.log('Adding label for ' + data.FirstName + ' ' + data.LastName);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 })

    const orderUrl = tindieOrderUrl + data.OrderNumber + '/'
    await page.goto(orderUrl);

    // --------------------------------------------
    // Check if its the login page
    // 
    // You should login in using the browser
    // --------------------------------------------

    while (page.url() !== orderUrl) {
        console.log(page.url())
        console.log(orderUrl)
        console.log("Needs Login")
        // Need to login manually
        await page.waitForNavigation({ timeout: 0 });
    }

    // --------------------------------------------
    // PAGE 1
    // --------------------------------------------

    //Double check we are on the correct page by checking for "Print Packing Slip" button
    await page.waitForSelector('a.btn[href="/orders/print/' + data.OrderNumber + '/"]', { timeout: timeOutValue });

    // Adding Message
    const messageText = message.generateMessage(data);
    //console.log(messageText);
    await page.focus('textarea#id_message');
    await page.keyboard.type(messageText);

    // Adding Tracking
    if (data.TrackingNumber) {
        await page.focus('input#id_tracking_code');
        await page.keyboard.type(data.TrackingNumber);
    }

    if (automaticSubmit) {
        await page.$eval(('input#submit-id-save'), element => element.click());
    } else {
        // Pause on the page til navigation happens
        await page.waitForNavigation({ timeout: 0 });
    }

    await page.waitForTimeout(waitBetweenPages);


}

async function launchBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "./user_data",
        args: [
            '--window-size=1920,1080'
        ]
    });
    return browser;
}

async function processData(browser, allData) {
    for (const d of allData) {
        await markAsShipped(browser, d);
    }
}

csvData = [];

console.log("Launching Browser");
launchBrowser().then(brow => {
    //fs.createReadStream('data.csv')
    fs.createReadStream('../AnPostPuppet/track-data.csv')
        .pipe(csv())
        .on('data', (data) => csvData.push(data))
        .on('end', () => {
            processData(brow, csvData);
        });
});