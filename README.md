# tindie-puppeteer

Puppeteer automation of Tindie.com - For automatically marking things as shipped.

Unfortunately this functionality is not available through the Tindie API, so I've had to get creative!

This is a work in progress, but I have used it for a few orders now it seems to work well.

This is provided with no warranty!

## Installation

Note: At the moment it's really only intended for people with a coding background.

- Download and install [NodeJS](https://nodejs.org/en/download/)
- Download this code and navigate to folder on the command line.
- Type 'npm install'

## Usage

- Generate a CSV file in the same format as the data.csv supplied with this code base
- Update the file reference to your csv file in `index.js`
- Modify `message.js` to suit your message
- Run `node index.js`
- The first time you run it you will need to login into Tindie, this should be saved for later runs
- By default it will automatically populate appropriate fields, but will not click the "Shipped" button.
- If you want to test running through the list without actually clicking the "Shipped" button, just click on a different menu item on the Tindie navigation menu.

## CSV Details

The script will automatically convert the CSV file into an object that can be called based on the column names.

The main script uses the following properties from each CSV row

- OrderNumber
- TrackingNumber (if applicable)
- FirstName (only for console logging)
- LastName (only for console logging)

Each CSV row will also be passed into `message.js`. You can use the other columns to build your message string if required.
