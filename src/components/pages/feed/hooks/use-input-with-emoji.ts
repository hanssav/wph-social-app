import React from 'react';

export const useInputWithEmoji = () => {
  const [commentText, setCommentText] = React.useState<string>('');
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const insertEmoji = (emoji: string) => {
    const start = cursorPosition;
    const textBefore = commentText.substring(0, start);
    const textAfter = commentText.substring(start);
    const newText = textBefore + emoji + textAfter;

    setCommentText(newText);

    const newCursorPos = start + emoji.length;
    setCursorPosition(newCursorPos);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleCursorChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  return {
    setCommentText,
    commentText,
    insertEmoji,
    inputRef,
    handleCursorChange,
    handleInputChange,
  };
};
