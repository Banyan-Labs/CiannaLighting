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
    const paginationMap = pageNumbers.map((number) => {
        return (
            <li key={number} className="page-item">
                <a href="!#" onClick={() => paginate} className="page-link">
                    {number}
                </a>
            </li>
        );
    });
    return (
        <nav>
            <ul className="pagination">
                <a href="!#" className="page-link">
                    &laquo;
                </a>
                {paginationMap}
                <a href="!#" className="page-link">
                    &raquo;
                </a>
            </ul>
        </nav>
    );
};

export default Pagination;
