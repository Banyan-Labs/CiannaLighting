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
      {user.isAuth === true ? <>This is the dashboard.</> : navigate('/login')}
    </>
  );
};

export default Dashboard;
