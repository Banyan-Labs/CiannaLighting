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
    const [view, setView] = useState<number>(3);
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
    const newPages: number[] =
        end < pageNumbers.length
            ? pageNumbers.slice(start, end)
            : pageNumbers.slice(start);
    const skip = (direction: string) => {
        const page = direction === 'end' ? pageNumbers.length : 1;
        return (
            <li key={998} className="page-item">
                <a
                    onClick={() => {
                        paginate(page);
                    }}
                    className="skip-link"
                >
                    {direction == 'end'
                        ? String('... ') + String(page)
                        : `${page} ...`}
                </a>
            </li>
        );
    };

    return (
        <>
            {pageNumbers.length > 3
                ? end < pageNumbers.length
                    ? [
                          ...newPages.map(
                              (page: number | string, index: number) => (
                                  <li key={index} className="page-item">
                                      <a
                                          onClick={() => {
                                              paginate(page);
                                          }}
                                          className={
                                              page == currentPage
                                                  ? 'page-link active-page'
                                                  : 'page-link'
                                          }
                                      >
                                          {page}
                                      </a>
                                  </li>
                              )
                          ),
                          skip('end'),
                      ]
                    : [
                          skip('start'),
                          ...newPages.map(
                              (page: number | string, index: number) => (
                                  <li key={index} className="page-item">
                                      <a
                                          onClick={() => paginate(page)}
                                          className={
                                              page == currentPage
                                                  ? 'page-link active-page'
                                                  : 'page-link'
                                          }
                                      >
                                          {page}
                                      </a>
                                  </li>
                              )
                          ),
                      ]
                : [
                      ...newPages.map(
                          (page: number | string, index: number) => (
                              <li key={index} className="page-item">
                                  <a
                                      onClick={() => {
                                          paginate(page);
                                      }}
                                      className={
                                          page == currentPage
                                              ? 'page-link active-page'
                                              : 'page-link'
                                      }
                                  >
                                      {page}
                                  </a>
                              </li>
                          )
                      ),
                  ]}
        </>
    );
};

export default Pagination;
