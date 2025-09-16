// Alaa Ahmad


// for debugger
 
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    // We will set our breakpoint on the next line.
    total += items[i];
    console.log(`Current total is: ${total}, after adding item: ${items[i]}`);
  }
  return total;
}

const itemPrices = [10, 25, 15, 5];
const finalTotal = calculateTotal(itemPrices);

console.log(`The final total is: ${finalTotal}`);