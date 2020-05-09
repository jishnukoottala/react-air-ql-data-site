import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav
        style={{
          minHeight: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 6,
          paddingRight: 10,
          backgroundImage:
            "linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)",
        }}
      >
        <div style={{paddingLeft: 6, fontSize: "1.2rem"}}> Air Quality Data</div>
        <ul style={{listStyle: "none"}} className="navigation" />
      </nav>
    </div>
  );
};

export default Header;
