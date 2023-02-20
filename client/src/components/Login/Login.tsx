import React, { FC, useState, useEffect, useRef, SyntheticEvent } from 'react';
import logo from '../../assets/ciana-lds-logo.png';
import { ROLES } from '../../app/constants';
import { useNavigate } from 'react-router-dom';
import {
    signInAction,
    dismissErrorAction,
} from '../../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ModalBase from '../commons/ModalBase/ModalBase';
import ForgotPasswordModal from './ForgotPasswordModal';
import './style/login.scss';

const Login: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const loginApiError = useAppSelector(({ auth: { error } }) => error);
    const [modalOpen, setModalOpen] = useState(false);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const dashRoles = [ROLES.Cmd, ROLES.User];
    const isLoginError = loginApiError !== null;

    const openModal = () => {
        setModalOpen((prev) => !prev);
    };

    const closeApiError = (isEmpty: boolean) =>
        !isEmpty && dispatch(dismissErrorAction());

    const handleLoginSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailInput.current && passwordInput.current) {
            dispatch(
                signInAction({
                    email: emailInput.current.value,
                    password: passwordInput.current.value,
                })
            );
            event.currentTarget.reset();
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
                    <form onSubmit={handleLoginSubmit}>
                        <header>Log in</header>
                        <p>Welcome! Please enter your email and password.</p>
                        <label>Email</label>
                        <br />
                        <input
                            ref={emailInput}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            required
                        />
                        <br />
                        <label>Password</label>
                        <br />
                        <input
                            ref={passwordInput}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <br />
                        <span onClick={openModal}>Forgot Password?</span>
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
            <ModalBase isShown={isLoginError} setIsShown={closeApiError}>
                {loginApiError && (
                    <div>
                        <p style={{ paddingBottom: '10px' }}>{loginApiError.message}</p>
                        <button
                            className="modal-cancel-button"
                            onClick={() => closeApiError(false)}
                        >
                            Ok
                        </button>
                    </div>
                )}
            </ModalBase>
            <ForgotPasswordModal isOpen={modalOpen} setIsOpen={setModalOpen} />
        </>
    );
};

export default Login;
