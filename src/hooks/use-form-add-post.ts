import React from 'react';

export const useAddFormPost = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [caption, setCaption] = React.useState('');
  const [err, setErr] = React.useState<string>('');

  const handleSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      setErr('File must be JPG, PNG, or WEBP');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErr('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setErr('');
  };

  React.useEffect(() => {
    if (file) setErr('');
  }, [file]);

  return { file, setFile, caption, setCaption, handleSelect, err, setErr };
};
