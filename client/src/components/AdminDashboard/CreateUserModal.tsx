import React, { FC, FormEvent, useState } from 'react';
import { ROLES } from '../../app/constants';
import { AiOutlineReload, AiOutlineCopy } from 'react-icons/ai';
import { useAppDispatch } from '../../app/hooks';
import { CreateUserType } from '../../app/typescriptTypes';
import { generatePassword } from '../../app/generatePassword';
import {
    createUserAction
} from '../../redux/actions/usersActions';
import { FaTimes, FaQuestionCircle } from 'react-icons/fa';
import { axiosPrivate } from '../../api/axios';
import useParams from '../../app/utils';
import './styles/CreateUserModal.scss';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<any>>;
    userDetails: CreateUserType;
    setUserDetails: React.Dispatch<React.SetStateAction<any>>;
    curUser: string;
    closeAndGet:any;
};

const CreateUserModal: FC<Props> = ({
    closeModal,
    openModal,
    edit,
    setEdit,
    userDetails,
    setUserDetails,
    curUser,
    closeAndGet
}) => {
    const dispatch = useAppDispatch();
    const [showRoleExplanation, setShowRoleExplanation] = useState(false);
    const [userId] = useParams('_id');
 
    const onMouseOver = () => {
        setShowRoleExplanation(true);
    };
    const onMouseOut = () => {
        setShowRoleExplanation(false);
    };
    const handleFormInput = (e: FormEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };
    const handleSelection = (e: FormEvent<HTMLSelectElement>) => {
        setUserDetails({
            ...userDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };
    const copyPasswordToClipboard = (): void => {
        const element = document.getElementById('password') as HTMLInputElement;
        const tooltip = document.getElementById('copyPassTooltip');
        if (element && tooltip) {
            element.select();
            element.setSelectionRange(0, 99999); // <- for mobile browsers
            navigator.clipboard.writeText(element.value);

            tooltip.innerText = `Copied: ${element.value}`;
            tooltip.style.color = '#333';
            tooltip.style.backgroundColor = '#07c12f';
        }
    };
    const handleGeneratePassword = (): void => {
        const tooltip = document.getElementById('generatePassTooltip');
        if (tooltip) {
            tooltip.innerText = 'Generated Successfully';
            tooltip.style.backgroundColor = '#07c12f';
            tooltip.style.color = '#333';
            setUserDetails({
                ...userDetails,
                password: generatePassword(10),
            });
        }
    };
    const onExitTooltip = (
        tooltipElementId: 'copyPassTooltip' | 'generatePassTooltip'
    ): void => {
        const tooltip = document.getElementById(tooltipElementId);
        if (tooltip) {
            tooltip.style.color = '#fff';
            tooltip.style.backgroundColor = '#555';
            switch (tooltipElementId) {
                case 'copyPassTooltip':
                    tooltip.innerText = 'Copy Password';
                    break;
                case 'generatePassTooltip':
                    tooltip.innerText = 'Generate Password';
                    break;
                default:
                    break;
            }
        }
    };

    const onCancel = (e:any) =>{
        e.preventDefault();
        setUserDetails({
            name: '',
            email: '',
            role: '',
            password: '',
        });
        closeModal(false);
    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if(edit){
                const axiosPriv = axiosPrivate();
                const response = await axiosPriv.put('/cmd/edit-user/' + handleEdit()._id, handleEdit());
                if(response){
                    console.log("response: ", response);
                    setEdit(false);
                    if(curUser === userId){
                        alert('Next login, you will use new credentials.')
                    }else{
                        const updatedUser = response.data?.data;
                        delete updatedUser?.password;
                        delete updatedUser?._id
                        delete updatedUser?.__v
                        alert(`${response.data.message}\n${JSON.stringify(updatedUser).split(/[{},]/).join('\n')}`);
                    }
                    await closeAndGet();
                }
            }else{
            await dispatch(createUserAction(userDetails));
            await closeAndGet();

            }
            setUserDetails({
                name: '',
                email: '',
                role: '',
                password: '',
            });
            
            
        } catch (err: any) {
            throw new Error(err.message);
        }
    };
    const handleEdit = () =>{
        const editPass = {
            _id: curUser, 
            name: userDetails.name, 
            emailChange: userDetails.email,
            passwordChange: userDetails.password, 
            role: userDetails.role,
            update: true 
        }
        return editPass;
    }
    console.log("deet: ", userDetails)
    
    return (
        <div className="new-user-modal-background">
            <div className={edit ? "new-user-modal-container edit-contain" : "new-user-modal-container"}>
                <div className="new-user-modal-title-close-btn">
                    <button onClick={() => closeModal(!openModal)}>
                        <FaTimes />
                    </button>
                </div>
                
                <div className="new-user-modal-title">
                    <h3 className="new-user-modal-title">{edit ? 'Edit User' : 'New User'}</h3>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="new-user-dropdown-roles">
                            <div className="name-and-role-input-container">
                                <label
                                    className="new-user-modal-labels"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="new-user-modal-inputs"
                                    placeholder="John Doe"
                                    value={userDetails.name}
                                    onChange={(e) => handleFormInput(e)}
                                    required
                                />
                            </div>
                            <div className="name-and-role-input-container">
                                <label
                                    htmlFor="role-select-menu"
                                    className="new-user-modal-labels"
                                >
                                    Role
                                </label>
                                <br />
                                <select
                                    id="role"
                                    name="role"
                                    onChange={(e) => handleSelection(e)}
                                    value={userDetails.role}
                                >
                                    {Object.values(ROLES).map((role, index) =>
                                        role === '6677' ? (
                                            <option
                                                defaultValue={role}
                                                key={index}
                                                value={role}
                                            >
                                                Admin
                                            </option>
                                        ) : role === '9999' ? (
                                            <option
                                                defaultValue={role}
                                                key={index}
                                                value={role}
                                            >
                                                Employee
                                            </option>
                                        ) : role === '1212' ? (
                                            <option
                                                defaultValue={role}
                                                key={index}
                                                value={role}
                                            >
                                                User
                                            </option>
                                        ) : null
                                    )}
                                </select>
                            </div>
                            <div className="role-hover-explanation">
                                <FaQuestionCircle
                                    onMouseOver={() => onMouseOver()}
                                    onMouseLeave={() => onMouseOut()}
                                />
                            </div>
                            {showRoleExplanation && (
                                <div className="paragraph-role-explanation">
                                    <p>Assign a role to the account.</p>
                                    <p>Admin: Full Access</p>
                                    <p>User: Project and Catalog Access </p>
                                    <p>Employee: Data Entry</p>
                                </div>
                            )}
                        </div>
                        <label
                            className="new-user-modal-labels"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="new-user-modal-inputs"
                            placeholder="email@email.com"
                            value={userDetails.email}
                            onChange={(e) => handleFormInput(e)}
                            required
                        />
                        <div className="password-generator-section">
                            <div>
                                <label
                                    className="new-user-modal-labels "
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    className="new-user-modal-inputs password-input-user-modal"
                                    placeholder="Generate password..."
                                    value={userDetails.password}
                                    required
                                    readOnly
                                />
                            </div>

                            <span
                                className="generate-password-circle"
                                onClick={handleGeneratePassword}
                                onMouseLeave={() =>
                                    onExitTooltip('generatePassTooltip')}
                            >
                                <span
                                    className="tooltip-text"
                                    id="generatePassTooltip"
                                >
                                    Generate Password
                                </span>
                                <AiOutlineReload />
                            </span>
                            <span
                                className="copy-password-circle"
                                onClick={copyPasswordToClipboard}
                                onMouseLeave={() =>
                                    onExitTooltip('copyPassTooltip')
                                }
                            >
                                <span
                                    className="tooltip-text"
                                    id="copyPassTooltip"
                                >
                                    Copy password
                                </span>
                                <AiOutlineCopy />
                            </span>
                        </div>
                        <div className="new-user-modal-footer">
                            {edit && <button className='new-user-cancel' onClick={(e)=> onCancel(e)}> Cancel </button>}
                            <button type="submit" className='new-user-submit'>{edit ? ' Edit User' : 'Create User'}</button>

                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default CreateUserModal;
