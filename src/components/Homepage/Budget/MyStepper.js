import {Box, Step, StepLabel, Stepper, Typography} from "@mui/material";
import React from "react";

export default function MyStepper(props){
    const {type, cost, stage} = props;

    const aboveHundredSteps = [
        '发起预算申请',
        '项目款已发放',
        '发票已上传',
        '审核通过交易结束',
    ];

    const belowHundredSteps = [
        '发起预算申请',
        '审核通过交易结束',
    ];

    const deniedSteps = [
        '发起预算申请',
        '交易终止',
    ];

    const isDenied = (stage === 0);
    const isAboveHundred = (type === "支出" && cost >= 100);

    const isStepFailed = (step) => {
        return step === 1;
    };

    return (
        <Box sx={{margin: 3}}>
            {isDenied ?
                <Stepper activeStep={1} alternativeLabel>
                    {deniedSteps.map((label, index) => {
                        const labelProps = {};
                        if (isStepFailed(index)) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    请重新申请
                                </Typography>
                            );

                            labelProps.error = true;
                        }
                        return (
                            <Step key={label}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                :
                <Box>
                    {isAboveHundred ?
                        <Stepper activeStep={stage} alternativeLabel>
                            {aboveHundredSteps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        :
                        <Stepper activeStep={stage} alternativeLabel>
                            {belowHundredSteps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    }
                </Box>
            }
        </Box>

    )
}