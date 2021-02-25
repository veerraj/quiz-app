import React,{useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loggedOut } from '../../../store/actions/authAction'


export default function LogOut() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedOut())
    }, [])
    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}
