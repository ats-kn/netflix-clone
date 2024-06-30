import { useProps } from "./useProps";
import { Layout } from "./Layout";

export const Banner = () => {
  // propsをスプレッド構文(...)で展開
  return <Layout {...useProps()} />;
};
