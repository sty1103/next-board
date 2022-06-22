import { useRef } from 'react';

interface ContentEditableProps {
  value: string;
  name: string;
  onChange: Function;
}

export default function ContentEditable({ value, name, onChange }: ContentEditableProps) {
  const defaultValue = useRef(value);
  
  return (
    <div
      data-name={name}
      contentEditable="true"
      dangerouslySetInnerHTML={{__html: defaultValue.current}}
      onInput={() => onChange(event)}>
    </div>
  )
}