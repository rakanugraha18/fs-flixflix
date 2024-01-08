import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
export default function MovieUpcoming() {
  const [dataUpcoming, setDataUpcoming] = useState([]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const getApiUpcoming = async () => {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=47aab7668ec7bf6aecaf74e0672195c5"
    );

    setDataUpcoming(response.data.results);
  };

  useEffect(() => {
    getApiUpcoming();
  }, []);

  return (
    <>
      <div className="py-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {dataUpcoming.length > 0 ? (
          <>
            {dataUpcoming.map((movie, i) => {
              return (
                <div key={i}>
                  <Card
                    redirect="/detail"
                    id={movie.id}
                    title={movie.original_title}
                    img={`${imgUrl}${movie.poster_path}`}
                    date={movie.release_date}
                    rating={movie.vote_average}
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
