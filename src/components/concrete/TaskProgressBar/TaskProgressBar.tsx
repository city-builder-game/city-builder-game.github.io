import React from "react";
import formatMinutes from "../../../utils/formatMinutes";
import { ProgressBar } from "../../abstract";

const TaskProgressBar = ({ startTime, endTime, currentTime }: {
    startTime: number
    endTime: number
    currentTime: number
}) => {

    return <ProgressBar
        text={currentTime === endTime ? "done" : formatMinutes(endTime - currentTime)}
        percentage={currentTime === endTime ? 100 : (currentTime-startTime)/(endTime-startTime)*100}
    />
};

export default TaskProgressBar;
