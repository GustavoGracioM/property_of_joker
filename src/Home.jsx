import InstagramCard from "./component/InstagramCard";
import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import NavBar from "./component/NavBar";
import LoadingScreen from "./Loading/LoadingScreen";
import InstagramCardTest from "./component/InstagramCardTest";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      const getPosts = async () => {
        const dataPosts = await fetchPosts();
        console.log(dataPosts)
        setPosts(dataPosts);
      };
      getPosts();
      return () => clearTimeout(timer);
    }, []);
  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <>
          <header className="top-0 left-0 w-full  bg-white border border-slate-200 z-50">
            <div className="h-16 flex items-center justify-center">
              <h1
                className="text-2xl text-black"
                style={{ fontFamily: "'Grand Hotel', cursive" }}
              >
                Property of Joker
              </h1>
            </div>
          </header>
          <div className="mb-20">
            {posts.length >=1 && posts.map((post) => (<InstagramCardTest post={post} />))}
          </div>
        </>
      )}
      <NavBar />
    </>
  );
}