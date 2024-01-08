import axios from "axios";

const movieBaseUrl = import.meta.env.VITE_APP_BASEURL;
const api_key = import.meta.env.VITE_APP_API_KEY;

const getTrendingVideo = axios.get(
  `${movieBaseUrl}/movie/popular?api_key=${api_key}`
);

export default {
  getTrendingVideo,
};
