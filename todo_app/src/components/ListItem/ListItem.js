import React, { useState } from 'react';
import Checkbox from './../Checkbox/Checkbox';
import './ListItem.css';
// import './../../scss/ListItem.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ListItem({
    description,
}) {

    const [expanded, toggleExpanded] = useState(false);
    return (
        <React.Fragment>
            <div className='list-item'>
                <Checkbox >{description}</Checkbox>
                <div className='right-container'>
                    <div className='completion-status'>status update</div>
                    <div className='toggle-task' onClick={() => toggleExpanded(!expanded)}>
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </div>

                </div>
            </div>
            {expanded ? (
                <div className='list-item sub-tasks-container' >steps here </div>
            ) : null}
        </React.Fragment>
    )
}
