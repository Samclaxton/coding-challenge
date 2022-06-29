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

console.log(`Revenue: $${totalRevenue.toLocaleString()}`)

// ii. Calculate total expenses:
// Extract "expense" entries, then sum to get total

let expenseResult = 0;

accounts.data
    .filter(entry => entry.account_category == 'expense')
    .forEach(entry=> {
        expenseResult += entry.total_value;
    });

let expenses = expenseResult.toLocaleString('en-US', {maximumFractionDigits: 0 })
console.log(`Expenses: $${expenses}`)

// iii. Calculate Gross Profit Margin:

// Variable initialisation:
let totalValueSales = 0;

// Step One: Extract "Total Sales" 
accounts.data
    .filter(entry => entry.account_type == 'sales' && entry.value_type == 'debit')
    .forEach(entry=> {
        totalValueSales += entry.total_value; 
    });

//Step Two: Divide figure by the revenue value calculated earlier to generate a percentage value.
  function grossProfitMargin (totalValueSales, totalRevenue) {
  return ((totalValueSales/totalRevenue) * 100)
}

console.log('Gross Profit Margin' + ' ' + grossProfitMargin(totalValueSales, totalRevenue).toFixed(1) + '%')

/* iv. Net Profit Margin:
Net profit margin = (Total Revenue - Total Expenses) / by revenue to calculate the percentage.
*/

function netProfit (totalRevenue, expenseResult) {
    return ((totalRevenue - expenseResult)/totalRevenue * 100)
}
console.log('Net Profit Margin:' + ' ' + netProfit(totalRevenue, expenseResult).toFixed(1) + '%')

// v. Working Capital Ratio:

// This is calculated dividing the assets by the liabilities creating a percentage value where assets are calculated by:

// Adding the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank or current_accounts_receiveable

let assetsDebit = 0; 

accounts.data
    .filter(entry => (entry.account_category == 'assets' && entry.value_type == 'debit') && (entry.account_type == 'bank' || entry.account_type == 'current_accounts_receivable' || entry.account_type == 'current'))
    .forEach(entry=> {
        assetsDebit += entry.total_value;
    });

// Subtracting the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable

let assetsCredit = 0;

 accounts.data
    .filter(entry => (entry.account_category == 'assets' && entry.value_type == 'credit') && (entry.account_type == 'current' || entry.account_type == 'current' || entry.account_type == 'current_accounts_receivable'))
    .forEach(entry=> {
        assetsCredit += entry.total_value;
    });

    // Calculating Total Assets:
    totalAssets = assetsDebit - assetsCredit; 

    // Calculating liabilities are calculated by:

    // Adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable

let liabilitiesCredit = 0;

accounts.data
    .filter(entry => (entry.account_category == 'liability' && entry.value_type == 'credit') && (entry.account_type == 'current' || entry.account_type == 'current_accounts_payable'))
    .forEach(entry=> {
        liabilitiesCredit += entry.total_value;
    });

// Subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable

let liabilitiesDebit = 0;

accounts.data
    .filter(entry => (entry.account_category == 'liability' && entry.value_type == 'debit') && (entry.account_type == 'current' || entry.account_type == 'current_accounts_payable'))
    .forEach(entry=> {
        liabilitiesDebit += entry.total_value;
    });

    // Calculating Total Liabilities
    totalLiabilities = liabilitiesCredit - liabilitiesDebit; 

    // Calculating the Working Capital Ratio figure:
    function workingCapitalRatio (totalAssets, totalLiabilities) {
        return ((totalAssets/totalLiabilities) * 100)
    }

console.log('Working Capital Ratio:' + ' ' + workingCapitalRatio(totalAssets, totalLiabilities).toFixed(1) + '%')

    module.exports = netProfit
    module.exports = workingCapitalRatio
    module.exports = grossProfitMargin
