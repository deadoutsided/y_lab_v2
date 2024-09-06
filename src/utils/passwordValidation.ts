// eslint-disable-next-line no-useless-escape
const specialSymbols = new RegExp("[^A-Za-z0-9\s]", "g");
// eslint-disable-next-line no-useless-escape
const isOnlyLowCase = new RegExp("[^a-z0-9$&+,:~;=?@#|'<>.^*()%!\-\\/\_]", "g");

export default function validatePassword(password: string): string {
  if(password.length < 8){
    return "Password should have more 8 symbols"
  }
  else if(!password.match(specialSymbols)) return "Password should contain special symbols"
  else if(!password.match(isOnlyLowCase)) return "Password should contain upperCase letters"
  else return ''
}