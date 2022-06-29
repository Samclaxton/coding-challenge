const fs = require('fs');

let data = fs.readFileSync('./data.json'); // Accesses the data.json file
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

console.log(`Revenue: $${totalrevenue}`)

// ii. Calculate total expenses:
// Extract "expense" entries, then sum to get total

let expenses = 0;

accounts.data
    .filter(entry => entry.account_category == 'expense')
    .forEach(entry=> {
        expenses += entry.total_value;
    });

console.log(`Expenses: $${expenses.toFixed()}`)

/* iii. Calculate Gross Profit Margin:
Gross Profit Margin = (Revenue - Cost of Goods Sold) / Revenue * 100
*/

// Variable initialisation
let totalValueSales = 0;

/* Step One:
 Extract "Total Sales" 
*/
accounts.data
    .filter(entry => entry.account_type == 'sales')
    .forEach(entry=> {
        totalValueSales += entry.total_value; 
    });

console.log(`Total Value Sales: $${totalValueSales}`)

/* Step Two:
Extract Cost of Goods Sold - All 'debit' transactions
*/
let COGS = 0;

accounts.data
    .filter(entry => entry.value_type == 'debit')
    .forEach(entry=> {
        COGS += entry.total_value; 
    });

  grossProfitMargin = (totalValueSales - COGS)/totalrevenue * 100
  console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed()}%`) 




