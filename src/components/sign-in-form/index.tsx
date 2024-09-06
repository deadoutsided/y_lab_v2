import { useCallback, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import {cn as bem} from "@bem-react/classname"
import showIcon from "../../assets/eye-password-hide-svgrepo-com.svg"
import './style.css';


function SignIn(){

  const [authData, setAuthData] = useState({email: '', password: ''})
  
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const callbacks = {
    showPassword: useCallback(() => setIsPasswordHidden(prev => !prev), [setIsPasswordHidden])
  }

  const getHandler = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({...authData, [name]: event.target.value});
    }
  }

  const cn = bem("signIn")

  return (
    <form className={cn()}>
      <h1 className={cn("title")}>Sign In</h1>
      <Input type="text" placeholder="Email" value={authData.email} onChange={getHandler('email')} theme="form"/>
      <Input type={isPasswordHidden ? "password" : "text"} placeholder="Password" value={authData.password} onChange={getHandler('password')} theme="form"/>
      <img src={showIcon} className={cn("showPassIcon")} onClick={callbacks.showPassword}/>
      <Button disabled={false} text="Sign in" theme="form" onClick={() => {}} type="submit"/>
    </form>
  )
}

export default SignIn