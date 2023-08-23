import React, { FC } from 'react';

interface searchBarProps {
    setSearchTerm: any;
}

const SearchBar: FC<searchBarProps> = ({ setSearchTerm }) => {
    return (
        <div className="form-bar-button-container">
            <div className="search-input">
                <input
                    className="form__field"
                    type="text"
                    id="header-search"
                    placeholder="Search product"
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
