// Alaa Ahmad


function safe(asyncFn) {
  // It returns a new async function.
  return async function(...args) {
    try {
      // If the original function succeeds, return [null, result].
      return [null, await asyncFn(...args)];
    } catch (err) {
      return [err, null];
    }
  };
}

//test
// An async function that will succeed.
async function getMyDetails() {
  return { name: 'Alaa Ahmad', major: 'Computer Engineering' };
}

// An async function that will fail.
async function getCourseDetails() {
  throw new Error('fail function');
}

// Run the demo.
async function main() {
  const [userErr, userDetails] = await safe(getMyDetails)();
  if (userErr) {
    console.error('Error fetching my details:', userErr.message);
  } else {
    console.log('Successfully fetched user:', userDetails);
  }

  const [courseErr, courseDetails] = await safe(getCourseDetails)();
  if (courseErr) {
    console.error('Error fetching course:', courseErr.message);
  } else {
    console.log('Successfully fetched course:', courseDetails);
  }
}

main();