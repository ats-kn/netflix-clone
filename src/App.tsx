import { requests } from "./request";
import { Row } from "./components/Row";
import { Banner } from "./components/Banner";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { BannerDataProvider } from "./BannerDataContext";

// react-queryを定義
const queryClient = new QueryClient();

function App() {
  return (
    // react-queryを使用するためにQueryClientProviderで囲む
    <QueryClientProvider client={queryClient}>
      {/* 定義したBannerDataProviderでラップする */}
      <BannerDataProvider>
        <div className="App">
          <Header />
          <Banner />
          <Row
            title="NETFLIX ORIGUINALS"
            fetchUrl={requests.fetchNetflixOriginals}
          />
          <Row title="Trand Movies" fetchUrl={requests.fetchTrending} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="News Movies" fetchUrl={requests.fetchNewsMovies} />
          <Row title="Kids Movies" fetchUrl={requests.fetchKidsMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentMovies} />
        </div>
      </BannerDataProvider>
      <div className="App">
        <Header />
        <Banner />
        <Row
          title="NETFLIX ORIGUINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trand Movies" fetchUrl={requests.fetchTrending} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="News Movies" fetchUrl={requests.fetchNewsMovies} />
        <Row title="Kids Movies" fetchUrl={requests.fetchKidsMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentMovies} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
