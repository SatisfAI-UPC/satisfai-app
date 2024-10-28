import { Button, Card } from "@nextui-org/react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center p-8 md:p-12">
            <Card>
                <div className="grid md:flex items-center">
                    <img
                        src="https://img.freepik.com/vector-premium/gato-sienta-caja-signo-404-error-conexion-pagina-o-archivo-no-encontrado_705714-499.jpg"
                        alt="A cute cat"
                        className="mx-auto sm:w-1/2"
                    />
                    <div className="flex flex-col gap-8 p-8 md:p-20 text-center">
                        <div className={"flex flex-col gap-2"}>
                            <h1 className="text-xl md:text-3xl font-medium">
                                Oh no! Mochi found a
                                <br/>
                                <span className={"font-bold text-secondary text-3xl md:text-6xl"}>404 - Not Found</span>
                            </h1>
                            <p className="text-sm">
                                Sorry, the page you’re looking for doesn’t exist.
                            </p>
                        </div>
                        <Button
                            className="button-primary"
                        >
                            <Link to={"/"}>
                                Go Back Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
