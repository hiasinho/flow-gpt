import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const styles = "p-2 outline-none max-w-[350px]";

interface EditableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const Editable = ({
  value,
  editable = false,
  onChange,
  ...props
}: EditableProps) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const text = useRef<string>(value || "");
  const classes = clsx(styles, {
    "cursor-text": editable,
  });

  const handleChange = (ev: ContentEditableEvent) => {
    text.current = ev.target.value;
  };

  const handleBlur = () => {
    onChange && onChange(text.current);
  };

  useEffect(() => {
    editableRef.current?.focus();
  }, [editable]);

  useEffect(() => {
    text.current = value ? value : ''
  }, [value])

  return (
    <ContentEditable
      className={classes}
      innerRef={editableRef}
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
      disabled={!editable}
      {...props}
    />
  );
};
