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
    const [stepTitle, updateStepTitle] = useState('');

    const getCompletionStatus = () => {
        let { Tasks: steps } = listItem;
        let stepsCompleted = steps.filter(step => step.status);
        return `${stepsCompleted.length} of ${steps.length} completed`;

    }

    const getStepFromId = (steps, id) => {
        const index = steps.findIndex(step => step.id === id);
        return steps[index];
    }

    const isTaskComplete = () => {
        // let {Tasks: steps} = listItem;
        // let stepsCompleted = steps.filter(step => step.status);
        // return steps.length === stepsCompleted.length;
        // return listItem.status || steps.length === stepsCompleted.length; // has a flaw it does not let you uncheck task if sub tasks are complete
        return listItem.status;
    }

    const isStepComplete = (id) => {
        let { Tasks: steps } = listItem;
        let currentStep = getStepFromId(steps, id);

        return currentStep.status;
    }

    const addNewStep = () => {
        if (stepTitle && stepTitle !== '') {
            const newStep = {
                id: uuidv4(),
                title: stepTitle,
                status: false,
                TodoId: listItem.id
            }

            const duplicatItem = cloneDeep(listItem);
            const { Tasks: steps } = duplicatItem;
            steps.push(newStep);
            onListItemChange(duplicatItem);
            updateStepTitle('');
        }

    }

    const toggleTaskStatus = (event, id) => {
        const duplicatItem = cloneDeep(listItem);
        const { Tasks: steps, status } = duplicatItem;
        // if (!status)    // means it was false prior to this operation
        if (event.target.checked)   // means it was false prior to this operation
            steps.forEach(step => {
                step.status = true;
            });
        else
            steps.forEach(step => {
                step.status = false;
            });
        duplicatItem.status = !status;
        onListItemChange(duplicatItem);
    }

    const toggleStepStatus = (event, id) => {
        const duplicatItem = cloneDeep(listItem);
        const { Tasks: steps } = duplicatItem;
        let currentStepIndex = steps.findIndex(item => item.id === id);
        // steps[currentStepIndex].status = !steps[currentStepIndex].status;
        steps[currentStepIndex].status = event.target.checked;

        // update task complete status
        const totalCompletedSteps = steps.filter(step => step.status);
        if (totalCompletedSteps.length === steps.length)
            duplicatItem.status = true;
        else
            duplicatItem.status = false;
        onListItemChange(duplicatItem);
    }

    const renderSteps = () => {


        return (
            <React.Fragment >
                { listItem.Tasks.map((step, index) =>
                    < div key={step.id} className='list-item sub-tasks-container' >
                        <Checkbox
                            checked={isStepComplete(step.id)}
                            onChange={(event) => toggleStepStatus(event, step.id)}
                            styles={{
                                input: { fontSize: '16px', margin: '0px 8px' },
                                label: { fontSize: '16px', color: 'lightslategrey' }
                            }}>
                            {step.title}
                        </Checkbox>
                    </div>
                )}
                < div className='list-item sub-tasks-container new-step' >
                    <div className='new-steps-label-wrapper'>
                        <Input
                            className='new-step-input'
                            placeholder='What are the steps'
                            value={stepTitle}
                            onChange={(event) => updateStepTitle(event.target.value)}
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
                    {listItem.title}
                </Checkbox>
                <div className='right-container'>
                    <div className='completion-status'>{getCompletionStatus()}</div>
                    <div className='toggle-task' onClick={() => toggleExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                </div>
            </div>
            {expanded ? renderSteps() : null
            }
        </React.Fragment >
    )
}
