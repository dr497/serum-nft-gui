import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(null);
  }, [location]);

  const onSearch = (value: string) => {
    const keywords = value.split(' ').map((e) => e.toLowerCase());
    history.push(`/search/${keywords?.join('&') || ''}`);
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
        value={value || ''}
        onChange={onChange}
        style={{ width: 200, padding: 0 }}
      />
    </>
  );
};

export default SearchBar;
