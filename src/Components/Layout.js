import React from "react";
import { Link } from "react-router-dom";

const Layout = ({children}) => {

  return(
    <div>
    <ul>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/mypage">MyPage</Link>
      </li>
    </ul>
    <div>{children}</div>
    </div>
  )
}

export default Layout;