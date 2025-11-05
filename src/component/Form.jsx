export default function FormCreate({ legend, setLegend, local, setLocal, data, setData, images  }) {
  return (
    <>
    <div className="flex justify-center p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="w-36 h-36 md:w-407 md:h-40 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <img
              src={url.original}
              alt={`image-${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
    
      {/* LEGENDA */}
      <div className="relative border-b border-gray-200">
        <textarea
          value={legend}
          onChange={(e) => setLegend(e.target.value)}
          placeholder="Escreva uma legenda..."
          maxLength={200}
          rows={4}
          className="w-full bg-transparent text-gray-800 placeholder-gray-400 resize-none p-3 focus:outline-none"
        />
        <div className="absolute bottom-2 right-3 text-gray-400 text-xs">
          {legend.length}/200
        </div>
      </div>

      {/* LOCALIZAÇÃO */}
      <div className="flex items-center justify-between mt-3 mb-1 px-1">
        <span className="text-blue-600 text-sm font-medium">Adicionar localização</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v10" />
        </svg>
      </div>
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Digite a localização"
        className="w-full bg-transparent text-gray-800 placeholder-gray-400 px-3 py-2 border-b border-gray-200 focus:outline-none"
      />

      {/* DATA */}
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full mt-4 bg-transparent text-gray-800 px-3 py-2 border-b border-gray-200 focus:outline-none"
      />
    </>
  )
}