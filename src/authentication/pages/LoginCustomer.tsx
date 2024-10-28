import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Checkbox} from "@nextui-org/checkbox";

function LoginCustomer({loginCustomer}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            <div className="bg-white w-full md:w-1/2 flex flex-col gap-2 md:gap-6 drop-shadow-xl p-6 md:p-10">
                <Link to={"/"} className={"grid items-center text-center gap-1"}>
                    <img
                        src={"src/assets/satisfai-icon.png"} alt={"SatisfAI"}
                        className={"w-12 md:w-16 mx-auto"}/>
                    <p className={"font-bold text-primary"}>Customer</p>
                </Link>
                <h1 className={"font-bold text-xl md:text-5xl text-center"}>
                    Login Customer
                </h1>
                <p className="font-medium text-center">
                    Are you a company?&nbsp;
                    <Link to={"/login-company"} className="text-primary font-medium">
                        Log in here
                    </Link>
                </p>
                <div className={"flex flex-col gap-2"}>
                    <Input
                        type="email"
                        label="Email"
                        variant="bordered"
                    />
                    <Input
                        className="w-full"
                        label="Password"
                        variant="bordered"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                    aria-label="toggle password visibility">
                                {isVisible ? (
                                    <i className="pi pi-eye text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <i className="pi pi-eye-slash text-2xl text-default-400 pointer-events-none"/>
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                </div>
                <div className={"flex items-center justify-between w-full"}>
                    <Checkbox>
                        Remember me
                    </Checkbox>
                    <Link
                        to="/"
                        className="font-medium text-primary">
                        Forgot your password?
                    </Link>
                </div>
                <Button
                    className="bg-secondary w-full"
                    onClick={loginCustomer}
                >
                    Login
                </Button>
                <p className={"text-center"}>
                    Don't have an account?&nbsp;
                    <Link to={"/signup"} className="text-primary font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginCustomer;