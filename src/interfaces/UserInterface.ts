interface UserInterface {
    [key: string]: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

export default UserInterface;
