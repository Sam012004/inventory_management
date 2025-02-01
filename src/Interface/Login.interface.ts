export interface UserDetailsType{
    userName:string;
    password:string;
}

export interface UserDetailsError{
    userNameError:string;
    passwordError:string;
}

export interface RegisterUserDetailType{
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    confirmpassword:string;
}
export interface RegisterUserDetailError{
    firstnameError:string;
    lastnameError:string;
    emailError:string;
    passwordError:string;
    confirmPasswordError:string;
}

