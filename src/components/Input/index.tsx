import {
  memo,
  useState,
  useLayoutEffect,
  useCallback,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import {cn as bem} from "@bem-react/classname"
import { debounce } from "../../utils/debounce";
import './style.css';

interface inputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  theme: "form";
  type: "text" | "password" | "email";
  placeholder: string;
}

function Input(props: inputProps) {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce<(arg0: ChangeEvent<HTMLInputElement>) => void>(
      (value) => props.onChange(value),
      600
    ),
    [props.onChange]
  );

  const onChange: ChangeEventHandler<HTMLInputElement> | undefined = (
    event
  ) => {
    setValue(event.target.value);
    onChangeDebounce(event);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input')

  return (
    <input
      className={cn({theme: props.theme})}
      value={value}
      onChange={onChange}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default memo(Input);
