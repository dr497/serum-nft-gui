import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = () => {
  const history = useHistory();
  const [value, setValue] = useState<string | null>(null);

  const onSearch = (value: string) => {
    if (value === '') {
      return;
    }
    const keywords = value.split(' ').map((e) => e.toLowerCase());
    history.push(`/search/${keywords?.join('&') || ''}`);
    window.location.reload(false);
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
    return value || '';
  };

  return (
    <>
      <Search
        className="search-bar"
        placeholder="Search NFT"
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200, padding: 0 }}
      />
    </>
  );
};

export default SearchBar;
