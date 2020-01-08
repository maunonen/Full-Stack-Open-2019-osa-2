import React from 'react'
import Part from './Part'

const Content = ({ course}) => {
    return (
    <div>
        { course.parts.map( (part ) => <Part key={ part.id} part={ part}></Part> )}
        
    </div>
)
}

export default Content