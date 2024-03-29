export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
    isActive?: boolean;
    resetPasswordRequest?: boolean;
};

export type CreateUserType = {
    name: string;
    email: string;
    role: string;
    password: string;
};
