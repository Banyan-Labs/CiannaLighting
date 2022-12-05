import React, { FC } from 'react';
import * as data from './links.json';
import logo from '../../assets/ciana-logo-black.png';
import useParams from '../../app/utils';
import { ROLES } from '../../app/constants';
import { FaRegBell } from 'react-icons/fa';
import { logoutAction } from '../../redux/actions/authActions';
import { setTheYourProjects } from '../../redux/actions/projectActions';
import { Link, useLocation } from 'react-router-dom';
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
    const latestProject = userProjects.slice(userProjects.length - 1);
    const defaultProjId = String(latestProject.map((p) => p._id));
    const Id = storedProjId ? storedProjId : defaultProjId;

    return (
        <div className="navbar-links-container">
            {links
                .slice()
                .filter((link: Link) =>
                    link.label === 'Admin' && user.role != ROLES.Cmd ? '' : link
                )
                .map((link: Link) => {
                    return (
                        <div key={link.href}>
                            <Link onClick={() => dispatch(setTheYourProjects(false))}
                                to={{
                                    pathname: link.href,
                                    search: `?_id=${user._id}&projectId=${Id}`,
                                }}
                                className={
                                    activeLocation === link.label.toLowerCase()
                                        ? 'active navbar-links'
                                        : 'navbar-links'
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
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    return (
        <>
            <nav className="navbar-container">
                <div className="logo-container">
                    <img src={logo} alt="Ciana Logo" />
                </div>

                <div className="navbar-vertical-divider" />
                <ul>
                    <Links links={links} />
                </ul>
                <div className="navbar-user-container">
                    <FaRegBell />
                    <div>
                        <span className="navbar-user-hi">Hi, </span>
                        <span className="navbar-user-name">
                            {user?.name?.split(' ')[0]?.toUpperCase() || 'Test'}
                            !
                        </span>
                        <br />
                        <span className="navbar-user-role">User</span>
                    </div>
                    {/* <FaChevronDown /> */}
                </div>
                {/* TEMPORARY LOGOUT - logout button will move to inside dropdown once created. Dropdown will be created in different branch */}
                <button onClick={(e) => handleLogout(e)}>logout</button>
            </nav>
        </>
    );
};

export default Navbar;
