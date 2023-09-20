import "./styles.css";
import Conversations from "./conversations";
import Login from "./login";
export default function App() {
  return (
    <div className="App">
      <h1>Login</h1>
      <Login />
      <h2>This should display list of conversations when login</h2>
      <Conversations />
    </div>
  );
}
