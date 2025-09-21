import Router from "./router/Router";
import Loading from "./component/Loading";
import { useAuth } from "./hook/user-auth";
function App() {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Router />
    </>
  );
}

export default App;
