import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// scssモジュールのためインポート
// scssを使うメリット - css記法で書ける、名前空間を与えることができる
// 名前空間を与えることでほかのコンポーネントで使ってる同一のコンポーネントに対して影響が出ない
import Style from "./Header.module.scss";
import { Store } from "../../store/index";
import { SET_TERM } from "../../actions";

const Header = () => {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const { globalState, setGlobalState } = useContext(Store);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalState({ type: SET_TERM, payload: { term } });
    history.push(`/search?query=${term}`);
  };

  useEffect(() => {
    setTerm(globalState.term);
  }, []);

  return (
    <div className={Style.header}>
      <div className={Style.item}>
        <Link to='/'>VideoTube</Link>
      </div>
      <div className={Style.item}>
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='検索'
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
