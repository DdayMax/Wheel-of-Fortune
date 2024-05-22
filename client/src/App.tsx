import "./App.css";
import { useMe } from "./hooks/useMe";
import { MainPage } from "./pages/MainPage";

function App() {
  const { me, data, isLoading, isError } = useMe();

  if (me) {
    return (
      <>
        <MainPage me={me} />
      </>
    );
  }
  if (isLoading) {
    return <h1 className="preload-text">Loading...</h1>;
  } else if (isError) {
    return <h1 className="preload-text">Connection error</h1>;
  } else if (data)
    return (
      <>
        <MainPage me={data} />
      </>
    );
}

export default App;
