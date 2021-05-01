import React, { useState } from 'react';
import Checkbox from './../Checkbox/Checkbox';
import './ListItem.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ListItem({
    listItem,
}) {

    const [expanded, toggleExpanded] = useState(false);

    const getCompletionStatus = () => {
        let { steps } = listItem;
        let stepsCompleted = steps.filter(step => step.isComplete);
        return `${stepsCompleted.length} of ${steps.length} completed`;

    }

    const isTaskComplete = () => {
        let { steps } = listItem;
        let stepsCompleted = steps.filter(step => step.isComplete);
        return steps.length === stepsCompleted.length;
    }

    const isStepComplete = (index) => {
        let { steps } = listItem;
        let stepsCompleted = steps.filter((step, i) => i === index && step.isComplete);
        return stepsCompleted.length > 0;
    }

    const renderSteps = () => {

        return listItem.steps.map((step, index) =>
            < div className='list-item sub-tasks-container' >
                <Checkbox checked={isStepComplete(index)}>{step.description}</Checkbox>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className='list-item'>
                <Checkbox checked={isTaskComplete()}>{listItem.description}</Checkbox>
                <div className='right-container'>
                    <div className='completion-status'>{getCompletionStatus()}</div>
                    <div className='toggle-task' onClick={() => toggleExpanded(!expanded)}>
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </div>
                </div>
            </div>
            {expanded ? renderSteps() : null
            }
        </React.Fragment >
    )
}
