'use client';

import Image from 'next/image';
import { useState } from 'react';
import { env } from '~/utils/env.mjs';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        const url = await response.json();
        console.log(url);

        setImage(url.payload);
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <Image src={image} alt="image" height={100} width={100} />
    </div>
  );
};

export default FileUpload;
