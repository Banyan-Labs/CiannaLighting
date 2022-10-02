export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

export type CreateUserType = {
    name: string;
    email: string;
    role: string;
    password: string;
};
