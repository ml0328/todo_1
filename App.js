import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'  


import React, { useState } from 'react';
import Button from './components/Button';
 // Button 컴포넌트 import
 import Input from './components/Input';
 // Input 컴포넌트 import

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  // 할 일 추가
  const addTodo = () => {
    if (text.trim() === '') return; // 빈 값 방지
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100), task: text },
    ]);
    setText(''); // 입력 후 초기화
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 할 일 수정
  const updateTodo = (id, newTask) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
    setEditingId(''); // 수정 완료 후 초기화
  };
  

  const handleUpdateTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, task: editText } : todo
      )
    );
    setEditingId(null);  // 수정 완료 후 수정 모드 종료
    setEditText('');  // 수정 텍스트 초기화
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);  // 수정할 할 일 ID 저장
    setEditText(currentText);  // 수정할 할 일의 텍스트를 editText에 저장
  };


  return (
    <div className="App">
      <div className="todo-container">
        <Input
          value={text}
          onChange={setText}
          placeholder="할 일을 입력하세요"
          className="todo-input" // Input에 클래스 추가
        />
        <Button onClick={addTodo} className="todo-button">할 일 추가</Button>

        <div>
          {todos.map((todo) => (
            <div key={todo.id} style={{ display: 'flex', gap: '20px' }}>
              {/* 수정이 아닌 상태 */}
              {editingId !== todo.id && (
                <>
                  <p>{todo.id}.</p>
                  <p>{todo.task}</p>
                </>
              )}
              {/* 수정 중 상태 */}
              {editingId === todo.id && (
                <>
                  <p>{todo.id}.</p>
                  <input
                    value={editText} // editText 상태로 입력 값을 관리
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </>
              )}
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">삭제하기</button>

              {/* 수정 완료/수정 진행 버튼 */}
              {editingId === todo.id ? (
                <button onClick={() => handleUpdateTodo(editingId)} className="edit-button">수정 완료</button>
              ) : (
                <button onClick={() => startEditing(todo.id, todo.task)} className="edit-button">
                  수정 진행
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default App;