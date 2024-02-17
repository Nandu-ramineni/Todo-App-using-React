import { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdFileDownloadDone } from "react-icons/md";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, details: '', completed: false }]);
      setInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEditTodo = (index, newText, newDetails) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    newTodos[index].details = newDetails;
    setTodos(newTodos);
  };

  const handleEditButtonClick = (index) => {
    const newTodos = [...todos];
    newTodos[index].editMode = !newTodos[index].editMode;
    setTodos(newTodos);
  };

  return (
    <div>
      <h2 className='flex justify-center  items-center gap-2 font-semibold text-white text-2xl my-2'><FaCheck />Todo App</h2>
      <div className='flex justify-center gap-3 items-center m-auto my-8'>
        <input type="text" value={input} onChange={handleInput} placeholder="Enter your Task" className='px-2 py-1 rounded-md border-blue-200' />
        <button onClick={handleAddTodo} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"'><IoMdAdd /></button>
      </div>
      <div className='my-2'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8'>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className='bg-white px-2 py-2 block justify-center items-center rounded-md'>
              <h2 className='text-center text-2xl py-3 text-[#265073]'>Task {index+1}</h2>
              {todo.editMode ? (
                <div>
                  <input type="text" value={todo.text} onChange={(e) => handleEditTodo(index, e.target.value, todo.details)} style={{ display: 'block' }} />
                  <input type="text" value={todo.details} onChange={(e) => handleEditTodo(index, todo.text, e.target.value)} style={{ display: 'block' }} />
                </div>
              ) : (
                <div onClick={() => handleToggleCompletion(index)} className='flex gap-2 items-center cursor-pointer '>
                  <input type="checkbox" className='rounded-md'/> 
                  <div>
                    <div className='text-xl'>{todo.text}</div>
                    {todo.details && <div> {todo.details}</div>}
                  </div>
                </div>
              )}
              <div className='flex justify-around items-center py-2'>
                <button onClick={() => handleEditButtonClick(index)} className='text-yellow-500 text-xl'>{todo.editMode ? <MdFileDownloadDone /> : <FiEdit />}</button>
                <button onClick={() => handleDeleteTodo(index)} className='text-red-500 text-xl'><AiOutlineDelete /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
