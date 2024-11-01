import { Card, Switch } from '@nextui-org/react';
import { PieChart } from '@mui/x-charts/PieChart';

function SurveyResponses({ survey }) {
    const question = survey.questions[0];
    const responseCounts = question.options.map(option => ({
        id: option,
        label: option,
        value: survey.responses.filter(
            response => response.answers[question.id] === option
        ).length,
    }));

    return (
        <>
            <div>
                <h1 className={"page-title"}>
                    Survey Responses
                </h1>
                <p>
                    Number of responses:&nbsp;
                    <span>
                        {survey.responses.length}
                    </span>
                </p>
            </div>
            <Card className="w-full md:w-1/2 p-4 justify-center items-center">
                <div>
                    <h3 className={"font-medium"}>{question.text}</h3>
                    <PieChart
                        series={[
                            {
                                data: responseCounts,
                                arcLabel: 'label',
                            },
                        ]}
                        width={300}
                        height={300}
                    />
                </div>
            </Card>
        </>
    );
}

export default SurveyResponses;
