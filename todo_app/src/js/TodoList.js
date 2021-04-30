import React, { useState } from 'react';
import './../scss/TodoList.css';

export default function TodoList() {
    const [list, updateList] = useState([]);
    return (
        <div className='list-container'>
            <p>Todo List</p>
        </div>
    )
}
