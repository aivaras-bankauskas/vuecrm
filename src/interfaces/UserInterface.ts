interface UserInterface {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

export default UserInterface;
