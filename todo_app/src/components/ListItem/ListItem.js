import React from 'react';
import Checkbox from './../Checkbox/Checkbox';
import './../../scss/ListItem.css';

export default function ListItem({
    description,
}) {
    return (
        <div className='list-item'>
            <Checkbox >{description}</Checkbox>
        </div>
    )
}
