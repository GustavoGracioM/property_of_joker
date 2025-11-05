import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchPostId } from '../api/api';
import { FiMoreHorizontal } from "react-icons/fi";
import MyGallery from "./component/MyGallery";
import { GoHeart } from "react-icons/go";
import { VscComment } from "react-icons/vsc";
import { BsBookmark, BsSend } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import LoadingScreen from "./Loading/LoadingScreen";
import NavBar from "./component/NavBar";
import InstagramCardTest from "./component/InstagramCardTest";
import { ArrowLeft } from "lucide-react";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPostId(id);
      setPost(data);
      const imagePromises = data.images.map(img => {
        return new Promise(resolve => {
          const image = new Image();
          image.src = img.url;
          image.onload = resolve;
          image.onerror = resolve;
        });
      });

      await Promise.all(imagePromises);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    };

    getPost();
  }, [id]);

  if (isLoading || !post) {
    return (
      <>
       <LoadingScreen />
        <NavBar />
      </>
    )
  }

  const backPage = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate(-1)
    }, 1000);
    
  }

  return (
    <>
      <div className="flex items-center p-2 gap-2">
        <ArrowLeft onClick={backPage} />
        <strong className="text-xl">Publicações</strong>
      </div>
      <InstagramCardTest post={post} />
      <NavBar />
    </>
  );
}
