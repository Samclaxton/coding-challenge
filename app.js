const fs = require('fs');

let data = fs.readFileSync('./data.json'); // Accesses the data.json file
let accounts = JSON.parse(data); 

// Variable initialisation
let totalRevenue = 0;

// i. Calculate total revenue figure:
// Extract "revenue" entries, then sum to get total
accounts.data
    .filter(entry => entry.account_category == 'revenue')
    .forEach(entry=> {
        totalRevenue += entry.total_value;
    });

console.log(`Revenue: $${totalRevenue}`)

// ii. Calculate total expenses:
// Extract "expense" entries, then sum to get total

let expenses = 0;

accounts.data
    .filter(entry => entry.account_category == 'expense')
    .forEach(entry=> {
        expenses += entry.total_value;
    });

console.log(`Expenses: $${expenses.toFixed()}`)

// iii. Calculate Gross Profit Margin:

// Variable initialisation:

let totalValueSales = 0;

/* Step One:
 Extract "Total Sales" 
 */

accounts.data
    .filter(entry => entry.account_type == 'sales' && entry.value_type == 'debit')
    .forEach(entry=> {
        totalValueSales += entry.total_value; 
    });

console.log(`Total Value Sales: $${totalValueSales}`)

/* Step Two:
Divide figure by the revenue value calculated earlier to generate a percentage value.
*/

  grossProfitMargin = (totalValueSales/totalRevenue) * 100
  console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed(1)}%`) 

// iv. Net Profit Margin:
// This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue to calculate a percentage.
// Net profit margin = Total Revenue - Total Expenses

netProfit = totalRevenue - expenses;
console.log(`Net Profit Figure: $${netProfit.toFixed()}`) // Note: Remove this line of code before final commit

netProfitMargin = (netProfit/totalRevenue)*100
console.log(`Net Profit Margin: ${netProfitMargin.toFixed(1)}%`)

// v. Working Capital Ratio:

// This is calculated dividing the assets by the liabilities creating a percentage value where assets are calculated by:

// Adding the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank or current_accounts_receiveable

let assetsDebit = 0; 

accounts.data
    .filter(entry => (entry.account_category == 'assets' && entry.value_type == 'debit') && (entry.account_type == 'bank' || entry.account_type == 'current_accounts_receivable' || entry.account_type == 'current'))
    .forEach(entry=> {
        assetsDebit += entry.total_value;
    });

console.log(`Assets: $${assetsDebit}`)

// Subtracting the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable

let assetsCredit = 0;

accounts.data
    .filter(entry => (entry.account_category == 'assets' && entry.value_type == 'credit') && (entry.account_type == 'current' || entry.account_type == 'current' || entry.account_type == 'current_accounts_receivable'))
    .forEach(entry=> {
        assetsCredit += entry.total_value;
    });

    console.log(`Assets Credit: $${assetsCredit}`)

    totalAssets = assetsDebit - assetsCredit; // Calculating Total Assets:
    console.log(`Assets Total: $${totalAssets}`)

// Calculating liabilities are calculated by:

// adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable

let liabilitiesCredit = 0;

accounts.data
.filter(entry => (entry.account_category == 'liability' && entry.value_type == 'credit') && (entry.account_type == 'current' || entry.account_type == 'current_accounts_payable'))
.forEach(entry=> {
    liabilitiesCredit += entry.total_value;
});

console.log(`Liabilities Credit: ${liabilitiesCredit.toFixed()}`)

// Subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable

let liabilitiesDebit = 0;

accounts.data
.filter(entry => (entry.account_category == 'liability' && entry.value_type == 'debit') && (entry.account_type == 'current' || entry.account_type == 'current_accounts_payable'))
.forEach(entry=> {
    liabilitiesDebit += entry.total_value;
});

console.log(`Liabilities Debit: $${liabilitiesDebit}`)

totalLiabilities = liabilitiesCredit - liabilitiesDebit; // Calculating Total Liabilities
console.log(`Liabilities Total: $${totalLiabilities.toFixed()}`)

// Calculating the Working Capital Ratio figure:

workingCapitalRatio = (totalAssets/totalLiabilities) * 100
console.log(`Working Capital Ratio: ${workingCapitalRatio.toFixed(2)}%`)
