export type UserType = {
    _id: string;
    name: string;
    email: string;
};

export type CreateUserType = {
    name: string;
    email: string;
    password: string;
};
