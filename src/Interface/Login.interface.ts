export interface UserDetailsType{
    userName:string;
    password:string;
}

export interface UserDetailsError{
    userNameError:string;
    passwordError:string;
}

export interface RegisterUserDetailType{
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface RegisterUserDetailError{
    userNameError:string;
    emailError:string;
    passwordError:string;
    confirmPasswordError:string;
}

