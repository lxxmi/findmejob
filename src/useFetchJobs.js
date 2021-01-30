import { useEffect, useReducer } from "react"
import axios from 'axios'

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
const actions = {
    MAKE_REQUEST : 'make-req',
    GET_DATA : 'get-data',
    ERROR : 'error',
    HASNEXTPAGE : 'hasNextPage'
}

function reducer(state, action){
    switch(action.type){
        case actions.MAKE_REQUEST:
            return{jobs:[], loading:true}
        case actions.GET_DATA:
            return{...state, jobs:action.payload.jobs, loading:false}
        case actions.ERROR:
            return{...state, jobs:[], loading:false, error:action.payload.error}
            case actions.HASNEXTPAGE:
                return{...state, hasNextPage:action.payload.hasNextPage}
            default:
            return state
    }
}

export default function useFetchJobs(params, page){
    const [state, dispatch] = useReducer(reducer, {jobs:[], loading:true})

    useEffect(()=>{
        const cancelToken1 = axios.CancelToken.source()
        dispatch({type:actions.MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken :cancelToken1.token,
            params:{
                markdown:true, page:page, ...params
            }
        }).then(res => {
            dispatch({type:actions.GET_DATA, payload:{jobs:res.data}})
        }).catch(err=>{
            if(axios.isCancel(err)) return
            dispatch({type:actions.ERROR, payload:{error:err}})
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            cancelToken :cancelToken2.token,
            params:{
                markdown:true, page:page+1, ...params
            }
        }).then(res => {
            dispatch({type:actions.HASNEXTPAGE, payload:{hasNextPage:res.data.length!==0}})
        }).catch(err=>{
            if(axios.isCancel(err)) return
            dispatch({type:actions.ERROR, payload:{error:err}})
        })

        return ()=>{
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    },[params, page])
    return state
}