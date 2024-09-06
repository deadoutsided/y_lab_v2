
// eslint-disable-next-line no-useless-escape
const simpleEmailRegex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+", "g");

export default function validateEmail(email: string): string {
  if(!email.match(simpleEmailRegex)){
    return 'Incorrect Email'
  }
  else return ''
}