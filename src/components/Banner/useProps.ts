import { useEffect, useState } from "react";
import axios from "../../axios";
import { requests } from "../../request.ts";
import { Movie } from "../../type.ts";

export const useProps = () => {
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      //取得した映像データからランダムでmovieに格納
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      );
    }
    fetchData();
  }, []);

  // descriptionの切り捨て用の関数
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
    movie, //バナーで表示する映像データ
    truncate, //映像データの概要を整形する関数
  };
};
