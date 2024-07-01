import { useEffect, useState } from "react";
// Headerコンポーネントの背景をスクロール量に応じて変更するためのフック
export const useProps = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // スクロール量が100を超えたらshowをtrueにする
    const handleShow = () => {
      setShow(window.scrollY > 100);
    };

    // イベントリスナの設定
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return {
    show,
  };
};
