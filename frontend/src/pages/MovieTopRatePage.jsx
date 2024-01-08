import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
export default function MovieTopRatePage() {
  const [dataMovieTopRate, setDataMovieTopRate] = useState([]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const getApiMovieTopRate = async () => {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=47aab7668ec7bf6aecaf74e0672195c5"
    );

    setDataMovieTopRate(response.data.results);
  };

  useEffect(() => {
    getApiMovieTopRate();
  }, []);

  return (
    <>
      <div className="py-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {dataMovieTopRate.length > 0 ? (
          <>
            {dataMovieTopRate.map((movieTr, i) => {
              return (
                <div key={i}>
                  <Card
                    redirect="/detail"
                    id={movieTr.id}
                    title={movieTr.original_title}
                    img={`${imgUrl}${movieTr.poster_path}`}
                    date={movieTr.release_date}
                    rating={movieTr.vote_average}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div>Tidak ada data</div>
          </>
        )}
      </div>
    </>
  );
}
