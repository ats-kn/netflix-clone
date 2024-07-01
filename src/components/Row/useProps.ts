/*
useProps.ts：コンポーネントのロジック部分を定義
*/
import { useEffect, useState } from "react";
import axios from "../../axios";
import { Movie } from "../../type.ts";
import { requests } from "../../request.ts";

export const useProps = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  // APIからデータを取得するのにuseEffectを使用
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // Movie型に合わせてrequest.data.resultsの配列をmapで抽出して整形
      const movies = request.data.results.map((movie: Movie) => ({
        id: movie.id,
        name: movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      }));

      setMovies(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // 動画再生ボタンをクリックした時に
  const handleClick = async (movie: Movie) => {
    // 予告映像を閉じるための条件分岐
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
  };
};
