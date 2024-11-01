// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@nextui-org/checkbox";
import { login as loginApi } from "../services/AuthenticationService.ts";
import { useDispatch } from "react-redux";
import { setToken } from "../services/AuthSlice.ts";

function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const login = async (e) => {
        e.preventDefault();
        try {
            const signinRequest = { email, password };
            const token = await loginApi(signinRequest);
            dispatch(setToken(token));
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <form className={"min-h-screen flex items-center justify-center"} onSubmit={login}>
            <div className="bg-white w-full md:w-1/2 flex flex-col gap-2 md:gap-6 drop-shadow-xl p-6 md:p-10">
                <Link to={"/"} className={"grid items-center text-center gap-1"}>
                    <img
                        src={"src/assets/satisfai-icon.png"} alt={"SatisfAI"}
                        className={"w-12 md:w-16 mx-auto"} />
                </Link>
                <h1 className={"font-bold text-xl md:text-5xl text-center"}>
                    Login
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className={"flex flex-col gap-2"}>
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
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                    aria-label="toggle password visibility">
                                {isVisible ? (
                                    <i className="pi pi-eye text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <i className="pi pi-eye-slash text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    className="button-tertiary"
                    type="submit"
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
        </form>
    );
}

export default LoginForm;
