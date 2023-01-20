import {TbEdit} from 'react-icons/tb'
import {ImBin} from 'react-icons/im'

const List = (props)=>{

    const {id,content,removeItem,editItem} = props

    return(
        <div className="list-item">
            <p className="content">{content}</p>
            <div className="btn-container">
                <TbEdit className='btn' size={25} onClick={()=>editItem(id)}/>
                <ImBin className='btn' size={20} onClick={()=>removeItem(id)}/>
            </div>
        </div>
    )
}

export default List