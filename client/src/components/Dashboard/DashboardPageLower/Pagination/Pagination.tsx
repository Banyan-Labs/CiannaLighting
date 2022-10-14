import React, { FC, useState } from 'react';
import '../style/dashboardNav.scss';

interface Props {
    projectsPerPage: number;
    totalProjects: number;
    paginate: any;
    currentPage: number;
}

const Pagination: FC<Props> = ({
    projectsPerPage,
    totalProjects,
    paginate,
    currentPage,
}: Props) => {
    const [view, setView] = useState<number>(5);
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
        pageNumbers.push(i);
    }
    const start =
        pageNumbers.length > view
            ? currentPage - 1 < pageNumbers.length - view
                ? currentPage - 1
                : pageNumbers.length - view
            : 0;
    const end = view + (currentPage - 1);
    const newPages =
        end < pageNumbers.length
            ? pageNumbers.slice(start, end)
            : pageNumbers.slice(start);

    return (
        <>
            {newPages.map((number: number, index: number) => (
                <li key={index} className="page-item">
                    <a onClick={() => paginate(number)} className="page-link">
                        {number}
                    </a>
                </li>
            ))}
            <select
                id="views"
                name="views"
                onChange={(e) => setView(Number(e.currentTarget.value))}
            >
                <option key={0} value={5}>
                    5
                </option>
                <option key={1} value={10}>
                    10
                </option>
                <option key={2} value={15}>
                    15
                </option>
                <option key={3} value={25}>
                    25
                </option>
            </select>
        </>
    );
};

export default Pagination;
