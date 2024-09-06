import { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import {cn as bem} from "@bem-react/classname"
import showIcon from "../../assets/eye-password-hide-svgrepo-com.svg"
import './style.css';
import validatePassword from "../../utils/passwordValidation";
import validateEmail from "../../utils/emailValidation";
import signInFetch from "../../utils/mockSignIn";


function SignIn(){

  const [authData, setAuthData] = useState({email: '', password: ''})
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [formErrors, setFormErrors] = useState({email: '', password: '', hasError: false});
  const [signInRes, setSignInRes] = useState<{email: string, password: string} | {error: string}>({error: ''})

  useEffect(() => {
    setFormErrors({...formErrors, email: '', hasError: !!formErrors.password})
  }, [authData.email])
  useEffect(() => {
    setFormErrors({...formErrors, password: '', hasError: !!formErrors.email})
  }, [authData.password])

  const callbacks = {
    showPassword: useCallback(() => setIsPasswordHidden(prev => !prev), [setIsPasswordHidden]),
    onSubmit: useCallback(async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const passwordValidation = validatePassword(authData.password);
      const emailValidation = validateEmail(authData.email);
      setFormErrors({email: emailValidation, password: passwordValidation, hasError: Boolean(emailValidation || passwordValidation)})
      if(!formErrors.hasError) signInFetch(authData.email, authData.password).then((res) => setSignInRes(res)).catch(err => setSignInRes(err))
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
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(signInRes as any).error ? <p className={cn('authenticateInfo')}>{(signInRes as any).error}</p> : (signInRes as any).email ? <p className={cn('authenticateInfo')}>{(signInRes as any).email + ' Authenticated'}</p> : <></>}
      <Input type="text" placeholder="Email" value={authData.email} onChange={getHandler('email')} theme="form"/>
      {formErrors.email ? <p className={cn("errorText")}>{formErrors.email}</p> : <></>}
      <Input type={isPasswordHidden ? "password" : "text"} placeholder="Password" value={authData.password} onChange={getHandler('password')} theme="form"/>
      {formErrors.password ? <p className={cn("errorText")}>{formErrors.password}</p> : <></>}
      <img src={showIcon} className={cn("showPassIcon")} onClick={callbacks.showPassword}/>
      <Button disabled={!!formErrors.email || !!formErrors.password} text="Sign in" theme="form" onClick={callbacks.onSubmit} type="submit"/>
    </form>
  )
}

export default SignIn