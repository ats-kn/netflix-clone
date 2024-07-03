import React, { useState, ReactNode } from "react";
import { Movie } from "./type.ts";

// コンテキストで共有される値の型定義
type TrailerUrlContextType = {
  trailerUrl: string | null;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string | null>>;
  movie: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

// BannerDataContextの作成と初期値の設定
export const BannerDataContext = React.createContext<TrailerUrlContextType>({
  trailerUrl: null,
  setTrailerUrl: () => {},
  movie: {} as Movie,
  setMovie: () => {},
  isMuted: false,
  setIsMuted: () => {},
});
// プロバイダーコンポーネントのプロップスの型定義
type BannerDataProviderProps = {
  children: ReactNode;
};

// BannerDataProviderコンポーネントの定義
export const BannerDataProvider: React.FC<BannerDataProviderProps> = ({
  children,
}) => {
  // トレーラーURL、映画情報、ミュート状態の状態管理
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // コンテキストプロバイダーを返し、値を子コンポーネントに提供
  return (
    <BannerDataContext.Provider
      value={{
        trailerUrl,
        movie,
        setTrailerUrl,
        setMovie,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </BannerDataContext.Provider>
  );
};
