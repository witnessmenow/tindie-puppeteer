const whenItShipped = "today"

function generateMessage(data) {

    // Hello message
    message = "Hey " + data.FirstName + "\n\n"


    // When it shipped
    message += "Thank you for the order! It shipped " + whenItShipped + " and will hopefully be with you soon.\n\n"

    if (data.trackingNumber) {
        message += "Your orders tracking number is: " + data.trackingNumber + "\n\n"
    }

    // Where to get info
    message += "You can find instructions and information for the products here:\n"

    message += infoForItems(data);

    message += "\n"

    message += "Please be aware that due to Covid-19, deliveries may be slower than normal.\n\n"

    message += "If you have any questions, please get in touch!\n\n"

    message += "Thanks,\n"
    message += "Brian and Caroline"

    return message;

}

function infoForItems(data) {
    // TODO:
    return "";
}

module.exports = {
    generateMessage
};