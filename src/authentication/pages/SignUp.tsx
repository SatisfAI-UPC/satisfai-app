import {Link} from "react-router-dom";
import {Input} from "@nextui-org/react";
import {useState} from "react";
import {Checkbox} from "@nextui-org/checkbox";
import {Button} from "@nextui-org/button";

function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCompany, setIsCompany] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const toggleCompany = () => setIsCompany(!isCompany);

    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            <div className="bg-white w-full md:w-1/2 flex flex-col gap-2 md:gap-6 drop-shadow-xl p-6 md:p-10">
                <Link to={"/"} className={"grid items-center text-center gap-1"}>
                    <img
                        src={"src/assets/satisfai-icon.png"} alt={"SatisfAI"}
                        className={"w-12 md:w-16 mx-auto"}/>
                </Link>
                <h1 className={"font-bold text-xl md:text-5xl text-center"}>
                    Sign Up
                </h1>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex gap-2 w-full"}>
                        <Button
                            className={`w-full font-medium ${isCompany ? 'bg-primary text-white' : ''}`}
                            onClick={toggleCompany}>
                            I'm company
                        </Button>
                        <Button
                            className={`w-full font-medium ${isCompany ? '' : 'bg-primary text-white'}`}
                            onClick={toggleCompany}>
                            I'm customer
                        </Button>
                    </div>
                    <Input
                        type="email"
                        label="Name"
                        variant="bordered"
                    />
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
                <div className={""}>
                    <Checkbox>
                        I agree to all the <Link to={"/"} className={"text-primary underline"}>Terms and Privacy
                        Policies</Link>
                    </Checkbox>
                </div>
                <Button
                    className="bg-secondary w-full font-medium"
                >
                    Sign up
                </Button>
                <p className="font-medium text-center">
                    Already have an account?&nbsp;
                    <Link to={"/login-customer"} className="text-primary font-medium">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;