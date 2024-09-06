import { useCallback, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import {cn as bem} from "@bem-react/classname"
import showIcon from "../../assets/eye-password-hide-svgrepo-com.svg"
import './style.css';
import validatePassword from "../../utils/passwordValidation";
import validateEmail from "../../utils/emailValidation";


function SignIn(){

  const [authData, setAuthData] = useState({email: '', password: ''})
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [formErrors, setFormErrors] = useState({email: '', password: '', hasError: false});

  const callbacks = {
    showPassword: useCallback(() => setIsPasswordHidden(prev => !prev), [setIsPasswordHidden]),
    onSubmit: useCallback((e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const passwordValidation = validatePassword(authData.password);
      const emailValidation = validateEmail(authData.email);
      /* if(!passwordValidation && !emailValidation){
        setFormErrors({hasError: true, email: emailValidation, password: passwordValidation})
      }
      else if(!passwordValidation && emailValidation){
        set
      } */
      setFormErrors({email: emailValidation, password: passwordValidation, hasError: Boolean(emailValidation || passwordValidation)})
    }, [authData.email, authData.password])
  }

  const getHandler = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({...authData, [name]: event.target.value});
    }
  }

  const cn = bem("signIn")

  return (
    <form className={(cn({emailError: !!formErrors.email, passwordError: !!formErrors.password}))}>
      <h1 className={cn("title")}>Sign In</h1>
      <Input type="text" placeholder="Email" value={authData.email} onChange={getHandler('email')} theme="form"/>
      {formErrors.email ? <p className={cn("errorText")}>{formErrors.email}</p> : <></>}
      <Input type={isPasswordHidden ? "password" : "text"} placeholder="Password" value={authData.password} onChange={getHandler('password')} theme="form"/>
      {formErrors.password ? <p className={cn("errorText")}>{formErrors.password}</p> : <></>}
      <img src={showIcon} className={cn("showPassIcon")} onClick={callbacks.showPassword}/>
      <Button disabled={false} text="Sign in" theme="form" onClick={callbacks.onSubmit} type="submit"/>
    </form>
  )
}

export default SignIn