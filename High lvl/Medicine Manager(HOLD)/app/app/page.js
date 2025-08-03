import Edit from "./components/edit/edit";
import Login from "./components/Login/login";
import Main from "./components/main/main";

export default function Home() {
  return (
    <div className="page">
      <div className="navbar">Medicine manager</div>
      <Login />
    </div>
  );
}
