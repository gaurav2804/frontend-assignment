export function convertCurrency(conversionRate, amountInUSD) {
    return (conversionRate * amountInUSD).toFixed(2)
}