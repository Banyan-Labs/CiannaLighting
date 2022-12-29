import React, { FC, useState, FormEvent, useEffect } from 'react';
import logo from '../../assets/ciana-lds-logo.png';
import { ROLES } from '../../app/constants';
import { useNavigate } from 'react-router-dom';
import { signInAction } from '../../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './style/login.scss';

const Login: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dashRoles = [ROLES.Cmd, ROLES.User];

    const [userFields, setUserFields] = useState({
        email: '',
        password: '',
    });

    const handleFormInput = (e: FormEvent<HTMLInputElement>): void => {
        setUserFields({
            ...userFields,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            dispatch(signInAction(userFields));
            setUserFields({
                email: '',
                password: '',
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    useEffect(() => {
        if (user._id && dashRoles.includes(user.role))
            navigate(`/dashboard?_id=${user._id}`);
        else if (user._id && !dashRoles.includes(user.role))
            navigate(`/cmd/dash?_id=${user._id}`);
    }, [user._id]);

    return (
        <>
            <div className="login-container">
                <div className="login-bg-dark">
                    <img src={logo} alt="ciana lighting logo" />
                </div>
                <div className="login-gold-accent" />

                <div className="login-form-container">
                    <form onSubmit={handleLogin}>
                        <header>Log in</header>
                        <p>Welcome! Please enter your email and password.</p>

                        <label>Email</label>
                        <br />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={userFields.email}
                            onChange={(e) => handleFormInput(e)}
                            placeholder="Email address"
                            required
                        />
                        <br />
                        <label>Password</label>
                        <br />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={userFields.password}
                            placeholder="Password"
                            onChange={(e) => handleFormInput(e)}
                            required
                        />
                        <a href="/forgot-password">Forgot Password?</a>
                        <br />
                        <div>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                    <p className="login-sub-text">
                        Trouble logging in?
                        <br />
                        Please contact your system administrator.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
