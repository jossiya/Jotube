import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


//null =아무나 출입가능
//true =로그인 한 유져만 출입 가능
//false = 로그인 한 유져는 출입 불가능
export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user.userData);
        const dispatch = useDispatch();
        const navigate= useNavigate();
        
            useEffect(() => {
                dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    if (reload) {
                        navigate('/login')
                        alert('로그인 해야 사용하실 수 있습니다.')
                    }
                } else {
                    if ( await adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    }
                    else {
                        if ( await reload === false) {
                            navigate('/')
                        }
                    }
                }
            })
            
        }, [dispatch, navigate ])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}