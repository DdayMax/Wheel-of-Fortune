import "./App.css";
import { useMe } from "./hooks/useMe";
import { MainPage } from "./pages/MainPage";

function App() {
  const { me, isLoading, isError } = useMe();

  if (isLoading) {
    return <h1 className="preload-text">Loading...</h1>;
  } else if (isError) {
    return <h1 className="preload-text">Connection error</h1>;
  } else if (me)
    return (
      <>
        <MainPage me={me} />
      </>
    );
}

export default App;
