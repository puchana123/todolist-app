import { useEffect } from "react"

const Alert = (props)=>{

    const {text,type,setAlert,list} = props

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setAlert({show:false,text:'',type:''})
        }, 1500);
        return ()=>clearTimeout(timeOut)
    },[list, setAlert])

    return(
        <p className={`alert ${type}`}>{text}</p>
    )
}

export default Alert