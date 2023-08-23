import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

import './breadCrumb.style.scss';

type Props = {
    label: string;
    linkTo?: string;
    stateAction?: () => void;
};

const BreadCrumb = ({ label, linkTo, stateAction }: Props) => {
    const LabelUi = (
        <>
            <span className="bread-crumb__image">
                <BsChevronLeft />
            </span>
            <span className="bread-crumb__label">{label}</span>
        </>
    );

    if (linkTo) {
        return (
            <Link className="bread-crumb__container" to={linkTo}>
                {LabelUi}
            </Link>
        );
    } else if (stateAction) {
        return (
            <div className="bread-crumb__container" onClick={stateAction}>
                {LabelUi}
            </div>
        );
    } else {
        return <div className="bread-crumb__container">{LabelUi}</div>;
    }
};

export default BreadCrumb;
