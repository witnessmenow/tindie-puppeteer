const whenItShipped = "today"

function generateMessage(data) {

    // Hello message
    message = "Hey " + data.FirstName + "\n\n"


    // When it shipped
    message += "Thank you for the order! It shipped " + whenItShipped + " and will hopefully be with you soon.\n\n"

    if (data.TrackingNumber) {
        message += "Your orders tracking number is: " + data.TrackingNumber + "\n\n"
    }

    // Where to get info
    message += "You can find instructions and information for the products here:\n"
    message += "\n"

    message += infoForItems(data);

    message += "\n"

    message += "Please be aware that due to Covid-19, deliveries may be slower than normal.\n\n"

    message += "If you have any questions, please get in touch!\n\n"

    message += "Thanks,\n"
    message += "Brian and Caroline"

    return message;

}

const productInfo = {
    "14727": "Power BLough-R: http://blough.ie/bloughr/",
    "20719": "I2S Matrix Shield: https://github.com/witnessmenow/ESP32-i2s-Matrix-Shield",
    "21280": "Flex-C-Friend: https://github.com/witnessmenow/ts100-flex-c-friend",
    "16343": "D1 Mini Matrix Shield: http://blough.ie/d1mat/"
}


function infoForItems(data) {
    let subMessage = "";
    const skuArray = data.Sku.split("|");
    skuArray.forEach(sku => {
        if (productInfo[sku]) {
            subMessage = subMessage + productInfo[sku] + "\n";
        } else {
            throw Error("Product SKU not recognized: " + sku);
        }
    });
    return subMessage;
}

module.exports = {
    generateMessage
};