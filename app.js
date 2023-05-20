// practice array functions
// accept http calls
// keep budget items
// save transaction items from csv
// Promises
// async/await 
console.log("Budget App")

const transactions = []
const transaction = {}

function parseTransactionCSV(contents) {
    // filterTransactionCardInput(contents)
    for (let row of contents.split(/\r?\n/)) {
        // is row a header
        const columns = row.split(',')
        console.log(`columns: ${columns} \nin row: ${row}\nlength: ${columns.length}`)
        if ([
                'Status', 
                'Transaction Date', 
                'Originating Account Last 4'
            ].includes(columns[0])
        ) {
            console.log("skipping header");
            continue;
        };
        // is row empty
        if (columns[0] === "") {
            console.log("Skipping empty row")
            continue;
        };
        // filter via regex
        const regexPatternCard1 = /^"([^"]*)","(\d{2}\/\d{2}\/\d{4})","(\d{2}\/\d{2}\/\d{4})","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)","(\(?\$?\d+(\.\d{2})?\)?)","([^"]*)",$/;
        const regexPatternCard4 = /^"(\d{2}\/\d{2}\/\d{4})","(-?\d+(?:\.\d+)?)","([^"]*)","([^"]*)","([^"]*)"$/;
        if (row.match(regexPatternCard1)) {
            const [fullMatch, account, postingDate, transactionDate, type, category, 
                merchantName, merchantState, description, transactionType, amount, referenceNumber
            ] = row.match(regexPatternCard1);
            console.log('Date:', transactionDate);
            console.log('Amount:', amount);
            transactions.push({
                date: transactionDate,
                description: description,
                category: category,
                amount: amount,
            })
        } else if (false) {
            // cardType2Format
        } else if (false) {
            // cardType3Format
        } else if (row.match(regexPatternCard4)) {
            // grab what we need OR grab everything
            const [fullMatch, date, amount, str1, str2, description] = row.match(regexPatternCard4);
            console.log('Date:', date);
            console.log('Number:', amount);
            console.log('String 3:', description);
            transactions.push({
                date: date,
                description: description,
                amount: amount,
            });
        } else {
            console.log("regex did not match")
        }

        console.log(transactions)

    };
}

// Create a button element to trigger file selection
const button = document.createElement('button');
button.textContent = 'Import Transaction Document';

// Create an input element to select a file from the user
const row = document.createElement('input');
row.type = 'file';
row.style.display = 'none';

// Append the input element to the button
button.appendChild(row);

// Listen for the button click event to open the file picker
button.addEventListener('click', () => {
    row.click();
});

// Listen for the 'change' event when a file is selected
row.addEventListener('change', (e) => {
    const file = e.target.files[0]; // Get the selected file

    const reader = new FileReader(); // Create a FileReader object

    // Define the 'onload' event handler to be executed when the file is successfully read
    reader.onload = (e) => {
        const contents = e.target.result; // Get the file contents
        parseTransactionCSV(contents)
    };

    // Read the file as text
    reader.readAsText(file);
});

// Append the button to the document body
document.body.appendChild(button);
