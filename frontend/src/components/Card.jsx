import { Link, redirect } from "react-router-dom";
export default function Card(props) {
  const { img, title, date, rating, id, redirect } = props;
  return (
    <>
      <Link to={`${redirect}/${id}`}>
        <div className="bg-white p-4 rounded-lg shadow-md  md:hover:ease-out md:duration-[250ms] hover:shadow-orange-500">
          <div className="h-16 items-center text-center">
            <h2 className="text-3xl sm:text-3xl md:text-xl lg:text-2xl xl:text-2xl font-semibold mb-2 text-orange-500">
              {title}
            </h2>
          </div>
          <img
            className="w-full h-full object-cover mb-2 rounded-lg"
            src={img}
          />
          <div className="Movie-date items-center text-center">
            Release Date: {date}
          </div>
          <div className="Movie-rate items-center text-center">
            Rating : {rating}
          </div>
        </div>
      </Link>
    </>
  );
}
