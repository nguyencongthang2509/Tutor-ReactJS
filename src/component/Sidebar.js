import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div>
      Đây là SideBar
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
