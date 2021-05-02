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

    const getStepFromId = (steps, id) => {
        const index = steps.findIndex(step => step.id === id);
        return steps[index];
    }

    const isTaskComplete = () => {
        // let { steps } = listItem;
        // let stepsCompleted = steps.filter(step => step.isComplete);
        // return steps.length === stepsCompleted.length;
        // return listItem.isComplete || steps.length === stepsCompleted.length; // has a flaw it does not let you uncheck task if sub tasks are complete
        return listItem.isComplete;
    }

    const isStepComplete = (id) => {
        let { steps } = listItem;
        let currentStep = getStepFromId(steps, id);

        return currentStep.isComplete;
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

    const toggleTaskStatus = (event, id) => {
        const duplicatItem = cloneDeep(listItem);
        const { steps, isComplete } = duplicatItem;
        // if (!isComplete)    // means it was false prior to this operation
        if (event.target.checked)   // means it was false prior to this operation
            steps.forEach(step => {
                step.isComplete = true;
            });
        else
            steps.forEach(step => {
                step.isComplete = false;
            });
        duplicatItem.isComplete = !isComplete;
        onListItemChange(duplicatItem);
    }

    const toggleStepStatus = (event, id) => {
        const duplicatItem = cloneDeep(listItem);
        const { steps } = duplicatItem;
        let currentStepIndex = steps.findIndex(item => item.id === id);
        // steps[currentStepIndex].isComplete = !steps[currentStepIndex].isComplete;
        steps[currentStepIndex].isComplete = event.target.checked;

        // update task complete status
        const totalCompletedSteps = steps.filter(step => step.isComplete);
        if (totalCompletedSteps.length === steps.length)
            duplicatItem.isComplete = true;
        else
            duplicatItem.isComplete = false;
        onListItemChange(duplicatItem);
    }

    const renderSteps = () => {


        return (
            <React.Fragment >
                { listItem.steps.map((step, index) =>
                    < div key={step.id} className='list-item sub-tasks-container' >
                        <Checkbox
                            checked={isStepComplete(step.id)}
                            onChange={(event) => toggleStepStatus(event, step.id)}
                            styles={{
                                input: { fontSize: '16px', margin: '0px 8px' },
                                label: { fontSize: '16px', color: 'lightslategrey' }
                            }}>
                            {step.description}
                        </Checkbox>
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
                <Checkbox
                    checked={isTaskComplete()}
                    onChange={(event) => toggleTaskStatus(event, listItem.id)}
                    styles={{
                        input: { fontSize: '20px', margin: '0px 10px' },
                        label: { fontSize: '20px', fontWeight: 500 }
                    }}
                >
                    {listItem.description}
                </Checkbox>
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
