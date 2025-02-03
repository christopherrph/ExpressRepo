function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }
  
function findPrimesInRange(start, end) {
const primes = [];
for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
}
return primes;
}
  
module.exports = { isPrime, findPrimesInRange };