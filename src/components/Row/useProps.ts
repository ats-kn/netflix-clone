/*
useProps.ts：コンポーネントのロジック部分を定義
*/
import { useState } from "react";
import axios from "../../axios";
import { useQuery } from "react-query";
import { Movie } from "../../type.ts";
import { requests } from "../../request.ts";

export const useProps = (fetchUrl: string, title: string) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  // fetchUrlを元にAPIからデータを取得
  const fetchData = async () => {
    const request = await axios.get(fetchUrl);
    return request.data.results.map((movie: Movie) => ({
      id: movie.id,
      name: movie.name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    }));
  };
  //react-queryを使ってfetchDataを実行
  // useQueryでデータが取得できたらmoviesに格納，データ取得中はisLoadingをtrueにする
  const { data: movies, isLoading } = useQuery(`${title}/movies`, fetchData);

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = await axios.get(requests.fetchMovieVideos(movie.id));
      setTrailerUrl(moviePlayUrl.data.results[0]?.key);
    }
  };

  return {
    movies,
    trailerUrl,
    handleClick,
    isLoading,
  };
};
