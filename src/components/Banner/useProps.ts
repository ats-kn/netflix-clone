import axios from "../../axios.ts";
import { requests } from "../../request.ts";
import { Movie } from "../../type.ts";
import { useQuery } from "react-query";
import { useContext, useEffect } from "react";
import { BannerDataContext } from "../../BannerDataContext.tsx";

export const useProps = () => {
  const { setMovie } = useContext(BannerDataContext);

  // react-queryを使用して初期データを取得
  const fetchMovie = async () => {
    const request = await axios.get(requests.fetchNetflixOriginals);
    const randomIndex = Math.floor(
      Math.random() * request.data.results.length - 1,
    );
    const movieUrl = await axios.get(
      requests.fetchMovieVideos(request.data.results[randomIndex].id),
    );
    return {
      movieData: request.data.results[randomIndex] as Movie,
      trailerUrl: movieUrl.data.results[0]?.key,
    };
  };

  const { data } = useQuery("movie", fetchMovie);

  useEffect(() => {
    if (data) {
      // ②初期データをグローバルステートに格納
      setMovie(data.movieData);
    }
  }, [data, setMovie]);

  // descriptionの切り捨て用関数
  const truncate = (str: string | undefined, n: number): string => {
    if (!str) {
      return "";
    }
    if (str.length > n) {
      return str.substr(0, n - 1) + "...";
    } else {
      return str;
    }
  };

  return {
    truncate,
  };
};
