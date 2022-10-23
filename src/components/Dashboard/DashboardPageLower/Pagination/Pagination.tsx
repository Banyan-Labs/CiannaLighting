import React, { FC } from 'react';

interface Props {
    projectsPerPage: number;
    totalProjects: number;
    paginate: any;
}

const Pagination: FC<Props> = ({
    projectsPerPage,
    totalProjects,
    paginate,
}: Props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.map((number, index) => (
                <li key={index} className="page-item">
                    <a
                        href="!#"
                        onClick={() => paginate(number)}
                        className="page-link"
                    >
                        {number}
                    </a>
                </li>
            ))}
        </>
    );
};

export default Pagination;
