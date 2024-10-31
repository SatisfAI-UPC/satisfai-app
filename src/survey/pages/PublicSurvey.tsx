import {useParams} from "react-router-dom";

function PublicSurvey() {
    const { id } = useParams();

    return (
        <div>
            <h1>Public Survey {id}</h1>
        </div>
    );
}

export default PublicSurvey