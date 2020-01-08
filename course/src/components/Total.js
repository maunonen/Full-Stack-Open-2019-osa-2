import React from 'react'

const Total  = ({ course}) => {
    
    const getSum = () => {
        let initialValue = 0
        const sum = course.parts.reduce( ( total , next) => { 
                return total + next.exercises } , 
                initialValue
            )
        return sum 
    }
    

    return (
        <div>
            <p>
                <strong>Total of exercises: { getSum()}</strong>
            </p>
        </div>
    )
}

export default Total