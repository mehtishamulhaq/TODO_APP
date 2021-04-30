import React from 'react';
import './Checkbox.css';

export default function Checkbox({
    id,
    name,
    value,
    checked,
    onChange,
    children,
    disabled,
    ...otherprops }) {
    return (
        <div className="form-check">
            <input
                id={id}
                className="form-check-input"
                type="checkbox"
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                {...otherprops} />
            <label className="form-check-label" htmlFor={id}>
                {children}
            </label>
        </div>
    )
}

Checkbox.defaultProps = {
    id: '',
    children: 'Checkbox',
    options: [],
    name: '',
    value: '',
    onChange: () => { }
}
