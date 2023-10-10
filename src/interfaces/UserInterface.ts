interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    [key: string]: string | undefined;
}

export default UserInterface;
