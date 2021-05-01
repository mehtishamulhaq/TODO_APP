import React, { useState } from 'react';
import Checkbox from './../Checkbox/Checkbox';
import Button from './../Button/Button';
import Input from './../Input/Input';
import './ListItem.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';

export default function ListItem({ listItem, onListItemChange }) {

    const [expanded, toggleExpanded] = useState(false);
    const [stepDescription, updateStepDescription] = useState('');

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

    const addNewStep = () => {
        if (stepDescription && stepDescription !== '') {
            const newStep = {
                id: uuidv4(),
                description: stepDescription,
                type: "SUBITEM",
                isComplete: false,
            }

            const duplicatItem = cloneDeep(listItem);
            const { steps } = duplicatItem;
            steps.push(newStep);
            onListItemChange(duplicatItem);
            updateStepDescription('');
        }

    }

    const renderSteps = () => {


        return (
            <React.Fragment>
                { listItem.steps.map((step, index) =>
                    < div className='list-item sub-tasks-container' >
                        <Checkbox checked={isStepComplete(index)}>{step.description}</Checkbox>
                    </div>
                )}
                < div className='list-item sub-tasks-container new-step' >
                    <div className='new-steps-label-wrapper'>
                        <Input
                            className='new-step-input'
                            placeholder='What are the steps'
                            value={stepDescription}
                            onChange={(event) => updateStepDescription(event.target.value)}
                        />
                    </div>
                    <div className='new-steps-button-wrapper'>
                        <Button className='new-step-button' onClick={addNewStep}>New Step</Button>
                    </div>
                </div>
            </React.Fragment>
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
