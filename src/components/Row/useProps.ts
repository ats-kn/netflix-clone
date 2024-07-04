/*
useProps.ts：コンポーネントのロジック部分を定義
*/
import { useContext } from "react";
import axios from "../../axios";
import { useQuery } from "react-query";
import { Movie } from "../../type.ts";
import { requests } from "../../request.ts";
import { BannerDataContext } from "../../BannerDataContext.tsx";

export const useProps = (fetchUrl: string, title: string) => {
  const { setTrailerUrl, setMovie } = useContext(BannerDataContext);

  // fetchUrlを元にAPIからデータを取得
  const fetchData = async () => {
    const request = await axios.get(fetchUrl);
    // 取得するデータを10件に制限
    // 配列に対してsliceを使って10件に制限
    // サムネイル画像が存在するデータのみをフィルタリング
    return request.data.results
      .slice(0, 10)
      .filter((movie: Movie) => movie.backdrop_path != null)
      .map((movie: Movie) => ({
        id: movie.id,
        name: movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
      }));
  };

  //react-queryを使ってfetchDataを実行
  // useQueryでデータが取得できたらmoviesに格納，データ取得中はisLoadingをtrueにする
  const { data: movies, isLoading } = useQuery(`${title}/movies`, fetchData);

  const handleClick = async (movie: Movie) => {
    const moviePlayUrl = await axios.get(requests.fetchMovieVideos(movie.id));
    setTrailerUrl(moviePlayUrl.data.results[0]?.key);
    setMovie(movie);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return {
    movies,
    handleClick,
    isLoading,
  };
};
