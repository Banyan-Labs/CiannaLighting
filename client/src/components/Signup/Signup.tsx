import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createUserAction } from '../../redux/actions/usersActions';

const Signup: FC = () => {
    const [newUserInput, setNewUserInput] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    const { name, email, role, password, confirmPassword } = newUserInput;

    const handleUserInput = (e: any) => {
        setNewUserInput((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value,
        }));
    };

    const registerUser = (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Password does not match');
        } else {
            dispatch(
                createUserAction({
                    name,
                    email,
                    password,
                    role,
                })
            );
        }
    };

    return (
        <>
            <div>
                <form onSubmit={registerUser}>
                    <header>Sign In</header>
                    <p>Welcome! Please complete all fields</p>

                    <label>Name</label>
                    <br />
                    <input
                        id="name"
                        type="name"
                        name="name"
                        value={newUserInput.name}
                        onChange={(e) => handleUserInput(e)}
                        placeholder="Name"
                        required
                    />
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={newUserInput.email}
                        onChange={(e) => handleUserInput(e)}
                        placeholder="Email address"
                        required
                    />
                    <label>Role</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={newUserInput.email}
                        onChange={(e) => handleUserInput(e)}
                        placeholder="Assign Role"
                        required
                    />
                    <br />
                    <label>Password</label>
                    <br />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={newUserInput.password}
                        placeholder="Password"
                        onChange={(e) => handleUserInput(e)}
                        required
                    />
                    <br />
                    <label>Confirm Password</label>
                    <br />
                    <input
                        id="confirmPassword"
                        type="confirmPassword"
                        name="confirmPassword"
                        value={newUserInput.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => handleUserInput(e)}
                        required
                    />
                    <br />
                    {errorMessage && <p>{errorMessage}</p>}
                    <div>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
