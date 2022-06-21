const fs = require('fs');

let data = fs.readFileSync('./data.json');
let accounts = JSON.parse(data);

// Variable initialisation
let totalrevenue = 0;

// i. Calculate total revenue figure:
// Extract "revenue" entries, then sum to get total
accounts.data
    .filter(entry => entry.account_category == 'revenue')
    .forEach(entry=> {
        totalrevenue += entry.total_value;
    });

console.log(totalrevenue)

// Variable initialisation
let expenses = 0;

// ii. Calculate total expenses:
// Extract "expense" entries, then sum to get total
accounts.data
    .filter(entry => entry.account_category == 'expense')
    .forEach(entry=> {
        expenses += entry.total_value;
    });

console.log(expenses)