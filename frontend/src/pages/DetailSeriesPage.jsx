import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailSeriesPage() {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const [dataSeriesDetail, setDataSeriesDetail] = useState({});

  const params = useParams();

  const getDetailApiSeries = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/tv/${params.id}?api_key=47aab7668ec7bf6aecaf74e0672195c5`
    );
    console.log(response);
    setDataSeriesDetail(response.data);
  };

  useEffect(() => {
    getDetailApiSeries();
  }, []);

  return (
    <>
      <div className="py-10"></div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-20">
          <div className="m-auto">
            <img src={`${imgUrl}${dataSeriesDetail.poster_path}`} />
          </div>
          <div className="items-start">
            <h1 className="text-3xl font-semibold mb-2">
              {dataSeriesDetail.original_name}
            </h1>
            <p className="text-gray-500 mb-2">{dataSeriesDetail.overview}</p>
            <p className="text-gray-500 mb-2">
              {dataSeriesDetail.vote_average}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
