import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as data from './links.json';
import './style/Navbar.scss';
import logo from '../../assets/ciana-lighting-logo.png';
import { FaRegBell, FaChevronDown } from 'react-icons/fa';
import { AppProps } from '../../App';
import { useAppDispatch } from '../../app/hooks';
import { logoutAction } from '../../redux/actions/authActions';

const links = JSON.parse(JSON.stringify(data)).links;

// Interface for Link
type Link = {
  label: string;
  href: string;
};

const Links: FC<{ links: Link[]; user: any }> = ({ user }) => {
  return (
    <div className='navbar-links-container'>
      {links.map((link: Link) => {
        return (
          <div key={link.href}>
            <Link to={link.href + user.name} className='navbar-links'>
              {link.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const User: FC<{ user: any }> = ({ user }) => {
  return (
    <div className='navbar-user-container'>
      <FaRegBell />
      <div>
        <span className='navbar-user-hi'>Hi, </span>
        <span className='navbar-user-name'>
          {user?.name?.split(' ')[0]?.toUpperCase() || 'Test'}!
        </span>
        <br />
        <span className='navbar-user-role'>User</span>
      </div>
      <FaChevronDown />
    </div>
  );
};

const Navbar: FC<AppProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(logoutAction(user.email));
      navigate('/login');
    } catch (err) {
      console.log('Error: ', err);
    }
  };
  return (
    <>
      <nav className='navbar-container'>
        <div className='logo-container'>
          <img src={logo} alt='Ciana Logo' />
        </div>

        <div className='navbar-vertical-divider' />
        <Links user={user} links={links} />
        <User user={user} />
        {/* TEMPORARY LOGOUT - logout button will move to inside dropdown once created. Dropdown will be created in different branch */}
        <button onClick={(e) => handleLogout(e)}>logout</button>
      </nav>
    </>
  );
};

export default Navbar;
