import React, { useState } from "react";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";
import SearchIcon from "@mui/icons-material/Search";

const SearchComp = () => {
  const [txt, setTxt] = useState("");
  const navigate = useNavigate();
  const handleSearch = (event) => {
    setTxt(event.target.value);
    navigate(`${ROUTES.HOME}?filter=${event.target.value}`);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleSearch}
      />
    </Search>
  );
};

export default SearchComp;
