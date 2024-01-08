import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../Services/GlobalAPI";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

const screenWidth = window.innerWidth;
function Slider() {
  const elementref = useRef();
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostPerPage] = useState(7);

  const slider = movieList.slice(currentPage, postsPerPage);
  const imgUrl = import.meta.env.VITE_APP_IMGURL;
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalAPI.getTrendingVideo.then((resp) => {
      console.log(resp.data.results);
      setMovieList(resp.data.results);
    });
  };

  return (
    <>
      <div className="w-full h-[250px] md:h-[590px] px-5 z-0">
        <Carousel className="block">
          {slider.map((movie, i) => {
            return (
              <Link key={movie.id} to={`/detail/${movie.id}`}>
                <img
                  key={movie.id}
                  src={`${imgUrl}${movie.backdrop_path}`}
                  className="min-w-full md:h-[590px] object-cover object-center mr-5 rounded-md "
                />
              </Link>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default Slider;
