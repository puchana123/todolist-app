import './App.css';
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import Alert from './components/Alert';

function App() {

  const [inputText,setInputText] = useState('')
  const [listItem,setListItem] = useState([])
  const [alert,setAlert] = useState({
    show:false,
    text:'',
    type:''
  })
  const [checkEditor,setCheckEditor] = useState(false)
  const [editId,setEditId] = useState(null)

  const submitData = (e)=>{
    e.preventDefault()

    if(!inputText){
      //alert
      setAlert({show:true,text:'กรุณาป้อนข้อมูล',type:'error'})
    }else if(checkEditor&&inputText){
      //edit & update text
      const updateItem = listItem.map((item)=>{
        if(item.id===editId){
          return {...item,content:inputText}
        }else{
          return item
        }
      })
      setListItem(updateItem)
      setInputText('')
      setCheckEditor(false)
      setEditId(null)
      setAlert({show:true,text:'แก้ไขข้อมูลเรียบร้อย',type:'success'})
    }else{
      //add new item
      const newItem = {
        id: uuidv4() ,
        content: inputText
      }
      setListItem([...listItem,newItem])
      setInputText('')
      setAlert({show:true,text:'บันทึกข้อมูลเรียบร้อย',type:'success'})
    }
  }

  const removeItem = (id)=>{
    const remainItem = listItem.filter((data)=>data.id!==id)
    setListItem(remainItem)
    setAlert({show:true,text:'ลบข้อมูลเรียบร้อย!',type:'error'})
  }

  const editItem = (id)=>{
    setEditId(id)
    setCheckEditor(true)
    const selectedItem = listItem.find((data)=>data.id===id)
    setInputText(selectedItem.content)
  }

  return (
    <section className='container'>
      <h1>Todolist App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={listItem}/>}
      <form className='form-group' onSubmit={submitData}>
        <div className='form-control'>
          <input type='text' className='text-input' 
            onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
          <button type='submit' className='submit-btn'>
          {checkEditor? 'แก้ไขข้อมูล':"เพิ่มข้อมูล"}
          </button>
        </div>
      </form>
      <section className='list-container'>
        {listItem.map((data,index)=><List key={index} {...data} removeItem={removeItem} editItem={editItem}/>)}
      </section>
    </section>
  );
}

export default App;
