import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  initialText: string;
  isTextarea?: boolean;
  onSave: (text: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ initialText, isTextarea = false, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isTextarea) {
      handleBlur();
    } else if (e.key === 'Escape') {
      setText(initialText); // Revert changes
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  if (isEditing) {
    const InputComponent = isTextarea ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={isTextarea ? 'editable-textarea' : 'editable-input'}
      />
    );
  }

  return (
    <div onClick={() => setIsEditing(true)} className="editable-text-display">
      {text || <span className="placeholder">{isTextarea ? "Click to add details..." : "Click to edit..."}</span>}
    </div>
  );
};

export default EditableText;
