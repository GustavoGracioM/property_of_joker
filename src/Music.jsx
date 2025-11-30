import { useEffect, useState, useRef } from 'react';
import NavBar from './component/NavBar';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';
import { MdAdd, MdOutlineSort, MdCheck   } from "react-icons/md";
import LoadingScreen from './Loading/LoadingScreen';
import { ArrowUpDown, Check, Plus } from 'lucide-react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const longPressTimer = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    fetchTodos();
    return () => clearTimeout(timer);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://bc-afbq.onrender.com/todo');
      setTodos(response.data.todo);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleCheck = async (id, done) => {
    try {
      await axios.put(`https://bc-afbq.onrender.com/todo/${id}`, { done: !done });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, done: !done } : todo
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar done:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bc-afbq.onrender.com/todo/${id}`);
      await fetchTodos();
      setDeleteTarget(null);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('https://bc-afbq.onrender.com/todo', {
        description: newDescription,
        data: newDate
      });
      setTodos((prev) => [...prev, response.data].sort((a, b) => a.position - b.position));
      setNewDescription('');
      setNewDate('');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newTodos = Array.from(todos);
    const [movedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, movedItem);

    const updatedTodos = newTodos.map((todo, index) => ({
      ...todo,
      position: index + 1
    }));

    setTodos(updatedTodos);

    try {
      await Promise.all(
        updatedTodos.map((todo) =>
          axios.put(`http://localhost:3001/todo/${todo.id}`, {
            position: todo.position
          })
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar posição:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Long press logic
  const startLongPress = (id) => {
    if (isOrdering) return;
    longPressTimer.current = setTimeout(() => {
      setDeleteTarget(id);
    }, 600);
  };

  const cancelLongPress = () => {
    clearTimeout(longPressTimer.current);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="max-w-2xl mx-auto mt-5">
        <div className='flex items-center justify-between m-2'>
          <h1 className="text-3xl font-bold">Feed dos Planos</h1>
          <div className="flex items-center gap-3">
            {!isOrdering && (<button
              onClick={() => setShowModal(true)}
            >
              <Plus />
            </button>)}
            <button
              onClick={() => setIsOrdering(!isOrdering)}
            >
              {isOrdering ? <Check /> : <ArrowUpDown />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {todos?.length === 0 ? (
            <p className="text-center p-6 text-gray-500">Nenhuma tarefa encontrada.</p>
          ) : isOrdering ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {todos.map((todo, index) => (
                      <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between px-6 py-4 border-b last:border-none bg-yellow-50"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-400">#{todo.position}</span>
                              <div>
                                <p className="text-lg">{todo.description}</p>
                                <p className="text-sm text-gray-500">
                                  📅 {formatDate(todo.data)}
                                </p>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  onTouchStart={() => startLongPress(todo.id)}
                  onTouchEnd={cancelLongPress}
                  onTouchMove={cancelLongPress}
                  onMouseDown={() => startLongPress(todo.id)}
                  onMouseUp={cancelLongPress}
                  onMouseLeave={cancelLongPress}
                  className="flex items-center justify-between px-6 py-4 border-b last:border-none hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleCheck(todo.id, todo.done)}
                      className="w-5 h-5 accent-green-600 cursor-pointer"
                    />
                    <div>
                      <p className={`text-lg ${todo.done ? 'line-through text-gray-400' : ''}`}>
                        {todo.description}
                      </p>
                      <p className="text-sm text-gray-500">📅 {formatDate(todo.data)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <NavBar />
        </div>

        {/* Modal de adicionar */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]  z-50">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
              <h2 className="text-2xl font-bold mb-4">Nova Tarefa</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Descrição</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Digite a tarefa"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Data</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação para deletar */}
        {deleteTarget !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4">Deletar Tarefa</h2>
              <p className="mb-6">Deseja realmente apagar esta tarefa?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
