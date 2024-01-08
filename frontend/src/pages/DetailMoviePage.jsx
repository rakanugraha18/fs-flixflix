import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailMoviePage() {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const [dataDetail, setDataDetail] = useState({});

  const params = useParams();

  const getDetailApiMovie = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=47aab7668ec7bf6aecaf74e0672195c5`
    );
    setDataDetail(response.data);
  };

  useEffect(() => {
    getDetailApiMovie();
  }, []);

  return (
    <>
      <div className="py-10"></div>
      <section className="mx-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-20">
          <div className="m-auto">
            <img src={`${imgUrl}${dataDetail.poster_path}`} />
          </div>
          <div className="items-start">
            <h1 className="text-3xl font-semibold mb-2">{dataDetail.title}</h1>
            <p className="text-gray-500 mb-2">{dataDetail.overview}</p>
            <p className="text-gray-500 mb-2">{dataDetail.vote_average}</p>
          </div>
        </div>
      </section>
    </>
  );
}
