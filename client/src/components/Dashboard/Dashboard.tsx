import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './style/dashboard.scss';

const Dashboard: FC = () => {
  const { user } = useAppSelector(({ auth: user }) => user);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/login' + user.name);
  }, [user]);

  return (
    <>
      {user.isAuth === true ? (
        <div style={{ paddingTop: '110px' }}>This is the dashboard.</div>
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Dashboard;
