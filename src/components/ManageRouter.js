import React from 'react'
import { useParams } from "react-router-dom";

import ManagePage from './ManagePage'


function ManageRouter (){

    const { categoryName, add } = useParams()

    if (!categoryName) {
        return ( <ManagePage/> )
    }
    if (categoryName && !add) {
        return ( <ManagePage categoryName={categoryName}/> )
    }
    return (
        <ManagePage categoryName={categoryName} add={true}/>
    )
}

export default ManageRouter
