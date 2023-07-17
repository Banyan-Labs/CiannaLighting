import React, { useState } from 'react';
import { FaChevronLeft, FaChevronDown } from 'react-icons/fa';
import uuid from 'react-uuid';

import './CollapsibleList.style.scss';

type Props = {
    title: string;
    width: string;
    listItems: Array<{ key: string; value: string | number }> | string[];
};

const CollapsibleList = ({ title, width, listItems }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => setIsExpanded((prev) => !prev);
    const toggleButtonElement = isExpanded ? (
        <FaChevronDown />
    ) : (
        <FaChevronLeft />
    );

    return (
        <div
            style={{ width }}
            className="collapsible-container"
            onClick={toggle}
        >
            <span
                style={{ textDecoration: isExpanded ? 'underline' : 'none' }}
                className="collapsible-container__title"
            >
                {title}
            </span>
            <span className="collapsible-container__toggle">
                {toggleButtonElement}
            </span>
            <ul
                style={{ display: isExpanded ? 'block' : 'none' }}
                className="collapsible-container__list"
            >
                {listItems.map((item) =>
                    typeof item !== 'string' && 'key' in item ? (
                        <li
                            className="listItem listItem__key-pair"
                            key={uuid()}
                        >
                            {item.key}
                            <span>{item.value}</span>
                        </li>
                    ) : (
                        <li className="listItem listItem__basic" key={uuid()}>
                            {item}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default CollapsibleList;
