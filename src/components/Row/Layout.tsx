/*
Layout.tsx：コンポーネントのUI部分を定義
propsとして受け取った値を元に，Rowコンポーネントの表示が責務
*/
import { Movie } from "../../type.ts";
import YouTube from "react-youtube";

// Props：コンポーネントに渡す引数の形式を定義
export type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

// LayoutProps：コンポーネントの表示に必要な引数の形式を定義
type LayoutProps = {
  title: string;
  isLargeRow?: boolean;
  movies: Movie[];
  trailerUrl: string | null;
  handleClick: (movie: Movie) => void;
};

// Options：YouTubeの再生設定
type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Layout = ({
  title,
  movies,
  isLargeRow,
  handleClick,
  trailerUrl,
}: LayoutProps) => {
  const image_url = "https://image.tmdb.org/t/p/original";
  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="ml-5 text-white">
      <h2>{title}</h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
        {movies.map((movie) => (
          // DOM表示にmapを使う際はkeyを指定する
          <img
            key={movie.id}
            // 使用する画像を使い分ける
            className={`object-contain w-full max-h-24 m-2 transform transition-transform duration-450 ${
              isLargeRow ? "max-h-60 hover:scale-110" : "hover:scale-108"
            }`}
            src={`${image_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
