import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as data from './links.json';
import { ReactComponent as Logo } from '../../assets/ciana-primary-logo-birch.svg';
import { useParams } from '../../app/utils';
import { ROLES } from '../../app/constants';
import { TbLogout } from 'react-icons/tb';
import { logoutAction } from '../../redux/actions/authActions';
import { setTheYourProjects } from '../../redux/actions/projectActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import './style/Navbar.scss';

const links = JSON.parse(JSON.stringify(data)).links;

// Interface for Link
type Link = {
    label: string;
    href: string;
};

const Links: FC<{ links: Link[] }> = () => {
    const dispatch = useAppDispatch();
    const [storedProjId] = useParams('projectId');
    const { user } = useAppSelector(({ auth: user }) => user);
    const { userProjects } = useAppSelector(({ project }) => project);
    const location = useLocation();
    const pathname = location.pathname;
    const activeLocation = pathname.split('/')[1];
    console.log('pathname', activeLocation);
    const latestProject = userProjects?.length ? userProjects.slice(userProjects.length - 1) : [];
    const defaultProjId = String(latestProject.map((p) => p._id));
    const Id = storedProjId ? storedProjId : defaultProjId;

    return (
        <div className="navbar-links-container">
            {links
                .slice()
                .filter((link: Link) =>
                    link.label === 'Admin' && user.role != ROLES.Admin ? '' : link
                )
                .map((link: Link) => {
                    return (
                        <div key={link.href}>
                            <Link
                                onClick={() =>
                                    dispatch(setTheYourProjects(false))
                                }
                                to={{
                                    pathname: link.href,
                                    search: `?_id=${user._id}&projectId=${Id}`,
                                }}
                                className={
                                    link.href.includes(activeLocation) ? 'active navbar-links me-5' : 'navbar-links me-5'
                                }
                            >
                                {link.label}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

const Navbar: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    
    const dispatch = useAppDispatch();

    const handleLogout = async (e: any) => {
        try {
            e.preventDefault();
            
            dispatch(logoutAction(user.email));
        } catch (err: any) {
            throw new Error(err.message)
        }
    };

    return (
        <>
            <nav className="navbar-container">
                <div className="logo-container ms-3 me-4">
                    <Logo />
                </div>

                <div className="navbar-vertical-divider" />
                <ul>
                    <Links links={links} />
                </ul>
                <div className="navbar-user-container">
                    <span className="navbar-user-hi">Hi,&nbsp; </span>
                    <span className="navbar-user-name">
                        {user?.name?.split(' ')[0]?.toUpperCase() || 'Test'}
                        !
                    </span>
                    <TbLogout className="logout-icon" onClick={(e) => handleLogout(e)} />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
