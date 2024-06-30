/*
index.tsx：コンポーネントのエントリポイントを定義
Layout.tsxとuseProps.tsをimportし，それらを組み合わせてコンポーネントを構築
*/

import { useProps } from "./useProps";
import { Layout, Props } from "./Layout";

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  return (
    <Layout title={title} isLargeRow={isLargeRow} {...useProps(fetchUrl)} />
  );
};
