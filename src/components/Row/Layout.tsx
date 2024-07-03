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
};

// LayoutProps：コンポーネントの表示に必要な引数の形式を定義
type LayoutProps = {
  title: string;
  isLargeRow?: boolean;
  movies: Movie[];
  trailerUrl: string | null;
  handleClick: (movie: Movie) => void;
  isLoading: boolean;
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
  handleClick,
  trailerUrl,
  isLoading,
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
        {/* isLoadingがtrueの場合はローディング中を表示 */}
        {!isLoading &&
          movies.map((movie) => (
            <img
              key={movie.id}
              className="object-contain w-full max-h-24 m-2 transform transition-transform duration-450"
              src={`${image_url}${movie.backdrop_path}`}
              onClick={() => handleClick(movie)}
              alt={movie.name}
            />
          ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
