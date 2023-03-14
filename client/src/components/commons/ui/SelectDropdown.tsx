import React from 'react';
import uuid from 'react-uuid';
import convertCsvInArray from 'helpers/convertCsvInArray';

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
        <div>
            <label htmlFor={itemKey}>{label}</label>
            <select name={itemKey} id={itemKey}>
                {convertCsvInArray(dropdownValues).map((value) => (
                    <option
                        key={uuid()}
                        value={value}
                        selected={value === defaultValue}
                    >
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDropdown;
