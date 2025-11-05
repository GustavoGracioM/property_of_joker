import NavBar from './component/NavBar'
import { useEffect, useRef, useState } from 'react';
import { BsSend, BsHeart, BsChat   } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

export default function ReelsPage() {
  const [videos, _setVideos] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    url: `/videos/video${i + 1}.mp4`,
  })));

  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.8, // ativa quando 80% do vídeo estiver visível
      }
    );

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);


  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="snap-start h-screen w-full flex items-center justify-center relative bg-black"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.url}
            className="h-full w-full object-cover"
            autoPlay
            playsInline
            loop
          />
          {/* UI sobre o vídeo */}
          <div className="absolute bottom-10 left-4 text-white mb-10">
            <div className='flex items-center gap-2'>
              <img src="../img/loading.png" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <strong className="font-bold">@Zabella_Gusttavo</strong>
                <h1 className='text-slate-200 text-base m-0 p-0'>Local</h1>
              </div>
            </div>
            <p>Descrição do vídeo...</p>
          </div>
          <div className="absolute bottom-10 right-4 flex flex-col items-center gap-4 text-white mb-10">
            <BsHeart size={30} />
            <BsChat size={30} />
            <BsSend size={30} />
            <SlOptionsVertical size={25} />
          </div>
        </div>
      ))}
      <NavBar />
    </div>
  );
}
