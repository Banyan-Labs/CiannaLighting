import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createUserAction } from '../../redux/actions/authActions';


const Signup: FC = () => {
    const [newUserInput, setNewUserInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState<String>('')
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const { name, email, password, confirmPassword } = newUserInput;

    // REMEMBER TO DELETE, THIS IS LIKELY NOT NEEDED
    // useEffect(() => {
    //     user.isAuth === true && navigate('/dashboard/' + user.name);
    //   }, [user, navigate]);

    const handleUserInput = (e: any) => {
        setNewUserInput((previousState) => ({
            ...previousState,
            [e.target.name]:e.target.value
        }));
    };

    const registerUser = (e: any) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Please complete all fields')
        } else if (password !== confirmPassword) {
            setErrorMessage('Password does not match')
        } else {
            dispatch(createUserAction({
                name,
                email,
                password,
            }))
        }
    };

    return (
        <>
            <h1>FML</h1>
        </>
    )
}

export default Signup