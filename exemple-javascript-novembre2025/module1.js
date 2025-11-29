function square(n){
  return n*n
}
function isEven(n){
  if(n%2==0){
      return true
    }else{
      return false
    }
}
// version plus concise : 
function isEvenVersionConcise(n) {
  return n % 2 === 0;
}

function greet(name){
  console.log(`Bonjour ${name} !`)
}
 const add = (a,b)=>a+b