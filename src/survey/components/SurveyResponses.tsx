// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Card } from '@nextui-org/react';
import { PieChart } from '@mui/x-charts/PieChart';

function SurveyResponses({ survey }) {
    if (!survey || !survey.questions) {
        return <p>Loading survey data...</p>;
    }

    return (
        <>
            <div>
                <h1 className={"page-title"}>Survey Responses</h1>
                <p>
                    Number of responses:&nbsp;
                    <span>{survey.responses ? survey.responses.length : 0}</span>
                </p>
            </div>

            {survey.responses && survey.responses.length < 1 ? (
                <p>No responses yet. Check back later.</p>
            ) : (
                survey.questions.map((question) => {
                    if (!question.options || !survey.responses) {
                        return null;
                    }

                    const responseCounts = question.options.map((option) => ({
                        id: option,
                        label: option,
                        value: survey.responses.filter(
                            (response) => response.answers && response.answers[question.id] === option
                        ).length,
                    }));

                    return (
                        <Card key={question.id} className="w-full md:w-1/2 p-4 justify-center items-center mb-4">
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
                    );
                })
            )}
        </>
    );
}

export default SurveyResponses;
