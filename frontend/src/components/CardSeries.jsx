import { Link } from "react-router-dom";
export default function CardSeries(props) {
  const { img, title, first_date, rating, id } = props;
  return (
    <>
      <Link to={`/detailSeries/${id}`}>
        <div className="bg-white p-4 rounded-lg shadow-md  md:hover:ease-out md:duration-[250ms] hover:shadow-orange-500">
          <div className="h-16 items-center text-center">
            <h2 className="text-3xl sm:text-3xl md:text-xl lg:text-2xl xl:text-2xl font-semibold mb-2 text-orange-500">
              {title}
            </h2>
          </div>
          <img
            className="max-w-full max-h-[655px] object-cover mb-2 rounded-lg mx-auto"
            src={img}
          />
          <div className="Movie-date items-center text-center">
            First Air Date: {first_date}
          </div>
          <div className="Movie-rate items-center text-center">
            Rating : {rating}
          </div>
        </div>
      </Link>
    </>
  );
}
