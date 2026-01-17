import { useState, useEffect, useRef } from "react"
import BookCard from "./BookCard";

const App = () =>{

  const [loading,setLoading] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);

  let typingTimeout = useRef(null);

  const handleChange = (e) =>{
    const value = e.target.value;
    setTyping(true);
    clearTimeout(typingTimeout);

    typingTimeout.current = setTimeout(()=>{
      setInputValue(value);
      setTyping(false);
    },300)
  }

  function debounce(fn, delay){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        fn.apply(this, args);
      },delay)
    }
  }
  

  const addItem = async()=>{
    if (!inputValue.trim()) return;
    
    if (todoData.find(data => data.title === inputValue)) return;

    const updatedValue = {
      id : Math.max(...todoData.map(data=>data.id)) +1,
      title: inputValue,
      status: true
    };

    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/posts/add',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputValue,
          userId : Math.max(...todoData.map(data=>data.id)) +1
        })
      });
      if (response.ok){
        console.log("response saved!!");
      } 
    } catch (error) {
      throw new Error("Failed to ave the value");
    } finally{
      setTodoData((prevState)=>
        [
          ...prevState,
          updatedValue
        ]
      );
      setLoading(false);
    }
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/todos');
        console.log(response);
        const data = await response.json();
        const titleStatus = data.todos.map(e=>{
        return {
          id: e.id,
          title: e.todo,
          status: e.completed
        }
        });
        setTodoData(titleStatus);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return ()=>{
      console.log("hi from useEffect");
    }

  },[]);

  const filteredTododata = todoData.filter((data)=>data.title.toLowerCase().includes(inputValue.toLowerCase())).sort((a,b)=>a.title.localeCompare(b.title));

  // if(loading) return <p>Loading....</p>;

  return (
    <>
    <input type="text"
    onChange={handleChange}
    placeholder='Enter value'
    />
    <button onClick={debounce(addItem,200)} disabled={loading}>{loading ? 'Loading.....' :'Add item'}</button>
    {typing && <p>typing....</p>}
    <br />
    {
      filteredTododata.map((data)=>(
      <BookCard key={data.id} book={data} />
      ))
    }
    </>
  )
}

export default App;