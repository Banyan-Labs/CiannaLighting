import React from 'react';
import uuid from 'react-uuid';

import convertCsvInArray from 'helpers/convertCsvInArray';

import './style.scss';

type Props = {
    label: string;
    itemKey: string;
    dropdownValues: string[];
    defaultValue?: string;
};

const SelectDropdown = ({
    label,
    itemKey,
    dropdownValues,
    defaultValue,
}: Props) => {
    return (
        <div className="select-dropdown">
            <label className="select-dropdown__label" htmlFor={itemKey}>
                {label}
            </label>
            <select
                className="select-dropdown__wrapper"
                name={itemKey}
                id={itemKey}
            >
                {convertCsvInArray(dropdownValues).map((value) => (
                    <option
                        className="select-dropdown__option"
                        key={uuid()}
                        value={value}
                        selected={defaultValue === value}
                        defaultValue={defaultValue}
                    >
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDropdown;
