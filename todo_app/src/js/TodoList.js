import React, { useState } from 'react';
import './../scss/TodoList.css';
import dummyData from './../constants/dummyData.json'

export default function TodoList() {
    const [list, updateList] = useState(dummyData['list']);
    return (
        <div className='list-container'>
            <ul>
                {list.map(listItem => <li>{listItem.description}</li>)}
            </ul>
        </div>
    )
}
