// Gross Profit Margin: Unit Test
const grossProfitMargin = require('./app.js')

test('Find the Gross Profit Margin (totalSalesValue/totalRevenue) * 100', () => {
    expect(grossProfitMargin(50, 100)).toBe(50)
})

// Working Capital Ratio: Unit Test
const workingCapitalRatio = require('./app.js')

test('Find the Working Capital Ratio (totalAssets/totalLiabilities) * 100', () => {
    expect(workingCapitalRatio(20, 40)).toBe(50)
})