import React, { FC } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

interface searchBarProps {
    setSearchTerm: any;
}

const SearchBar: FC<searchBarProps> = ({ setSearchTerm }) => {
    return (
        <div className="col-6 d-flex form-input-search m-0 justify-content-end">
            <button className="button-search">
                <BiSearchAlt2 className="icon-search" />
            </button>
            <input
                type="text"
                id="header-search"
                className="input-light-search"
                placeholder="Search product"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
        </div>
    );
};

export default SearchBar;
