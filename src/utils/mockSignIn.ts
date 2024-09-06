const users = [
  {email: 'abobaName@gmail.com', password: '123456!A'},
  {email: 'someDude@ya.ru', password: '123456!A'},
  {email: 'someSpiderMan@ya.ru', password: '123456!A'},
]

export default function signInFetch(email: string, password: string): Promise<{email: string, password: string} | {error: string}>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const authorizedUser = users.find((el) => el.email === email);
      if(authorizedUser && authorizedUser.password === password){
        resolve(authorizedUser)
      }
      reject({error: '404 User Not Found'})
    }, 600)
  })
}