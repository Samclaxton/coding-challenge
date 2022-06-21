const fs = require('fs');

let data = fs.readFileSync('./data.json');
let accounts = JSON.parse(data);
// console.log(accounts);

// Variable initialisation
let totalrevenue = 0;

// Calculate total revenue figure
// Extract "revenue" entries, then sum to get total
accounts.data
    .filter(hi => hi.account_category == 'revenue')
    .forEach(hi=> {
        totalrevenue += hi.total_value;
    });

// Next step...

console.log(totalrevenue)