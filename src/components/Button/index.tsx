import {cn as bem} from "@bem-react/classname"
import './style.css';

interface IButton {
  text: string,
  type?: 'submit' | 'reset' | 'button',
  theme: 'form',
  onClick: () => void,
  disabled: boolean,
}

function Button(props: IButton){
  const cn = bem("Button");

  return (
    <button disabled={props.disabled} className={cn({theme: props.theme})} onClick={props.onClick} type={props.type ? props.type : 'button'}>{props.text}</button>
  )
}

export default Button