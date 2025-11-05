import React, { useEffect, useState } from "react";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Controla a visibilidade da tela de loading após 5 segundos (simulando tempo de carregamento)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);  // Inicia o fade-out após o tempo de carregamento
    }, 5000); // 5 segundos, pode ser ajustado

    return () => clearTimeout(timer);
  }, []);

  // Quando a animação de fade-out terminar, escondemos o componente completamente
  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Faz o componente desaparecer completamente após o fade-out
      }, 1000); // Duração da animação fade-out (1s)
      return () => clearTimeout(timer);
    }
  }, [isFadingOut]);

  return (
    <figure className={`flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 via-gray-800 to-black transition-opacity ${
      isVisible
        ? isFadingOut
          ? 'fade-out'
          : 'fade-in'
        : 'opacity-0'
    }`}>
      <div>
        <img class="rounded-full w-120 h-120 object-cover border-4 border-white shadow-xl animate-spin-slow" src="../img/loading.png" alt="image description" />
        <figcaption className="mt-2 text-3xl text-white font-semibold text-center animate-pulse">Carregando...</figcaption>
      </div>
  </figure>)
  
  
};

export default Loading;