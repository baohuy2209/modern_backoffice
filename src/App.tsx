import { renderRoute, routes } from "./routes/routes";
function App() {
  return <div>{renderRoute(routes)}</div>;
}

export default App;
