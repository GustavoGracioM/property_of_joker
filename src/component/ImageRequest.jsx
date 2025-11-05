export default function ImageRequest({ onChange }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="aspect-[9/12] flex items-center justify-center">
      <label className="cursor-pointer border-2 border-dashed border-gray-400 p-4 rounded-xl hover:border-blue-500 transition-all w-full h-full flex flex-col items-center justify-center">
        <img src="/imgResquest.png" className="w-24 h-24 opacity-50 mb-2" />
        <span className="text-gray-500 text-sm">Clique para adicionar imagem</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
