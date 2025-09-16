// Alaa Ahmad

function delay(ms) {
  // Return a new Promise that resolves after the specified ms.
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Use an async function for 'await'
async function showUserDetails() {
  console.log('Fetching details for Alaa Ahmad');
  
  await delay(2000); 
  console.log('Name: Alaa Ahmad');
  
  await delay(1000); 
  console.log('Major: Computer Engineering');
  console.log('Process complete.');
}

showUserDetails();