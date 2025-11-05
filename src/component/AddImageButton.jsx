import React from 'react';

export default function AddImageButton({ onSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onSelect) {
      const reader = new FileReader();
      reader.onload = () => {
        onSelect({ dataURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <label className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 4v16m8-8H4" />
        </svg>
        Adicionar outra imagem
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
