import React from 'react';
import './../scss/TodoList.css';


export default function TodoList({ list }) {

    return (
        <div className='list-container'>
            <ul>
                {list.map(listItem => <li>{listItem.description}</li>)}
            </ul>
        </div>
    )
}
