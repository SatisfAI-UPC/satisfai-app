// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Link} from "react-router-dom";
import {Input} from "@nextui-org/react";
import {useState} from "react";
import {Checkbox} from "@nextui-org/checkbox";
import {Button} from "@nextui-org/button";
import {signup as signupApi} from "../services/AuthenticationService.ts";
import {setToken} from "../services/AuthSlice.ts";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {Role} from "../model/SignupRequest.ts";

function SignUpForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCompany, setIsCompany] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleCompany = () => setIsCompany(!isCompany);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [policyCheck, setPolicyCheck] = useState(false);

    const dispatch = useDispatch();

    const signup = async (e) => {
        e.preventDefault();
        try {
            const signUpRequest = {
                email,
                name,
                password,
                role: isCompany ? Role.COMPANY : Role.CUSTOMER,
            };
            const token = await signupApi(signUpRequest);
            dispatch(setToken(token));
            toast(`Welcome to SatisfAI!`, { type: "success" });
        } catch (error) {
            toast(`We couldn't create an account ${error.message}`, { type: "error" });
        }
    }

    return (
        <form className={"min-h-screen flex items-center justify-center"} onSubmit={signup}>
            <ToastContainer />
            <div className="bg-white w-full md:w-1/2 flex flex-col gap-2 md:gap-6 drop-shadow-xl p-6 md:p-10">
                <Link to={"/"} className={"grid items-center text-center gap-1"}>
                    <img
                        src={"/satisfai-icon.png"} alt={"SatisfAI"}
                        className={"w-12 md:w-16 mx-auto"} />
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
                        label="Name"
                        variant="bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        label="Email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        className="w-full"
                        label="Password"
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    className="button-tertiary"
                    type="submit"
                >
                    Sign up
                </Button>
                <p className="font-medium text-center">
                    Already have an account?&nbsp;
                    <Link to={"/login"} className="text-primary font-medium">
                        Log in here
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default SignUpForm;