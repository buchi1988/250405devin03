document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    
    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('TODOの取得に失敗しました:', error);
        }
    };
    
    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        
        const filteredTodos = filterTodos(todos, currentFilter);
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'todo-delete';
            deleteBtn.innerHTML = '&times;';
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            
            todoList.appendChild(li);
        });
    };
    
    const filterTodos = (todos, filter) => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };
    
    const addTodo = async () => {
        const text = todoInput.value.trim();
        
        if (!text) return;
        
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            if (response.ok) {
                todoInput.value = '';
                fetchTodos();
            }
        } catch (error) {
            console.error('TODOの追加に失敗しました:', error);
        }
    };
    
    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
            
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('TODOの更新に失敗しました:', error);
        }
    };
    
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('TODOの削除に失敗しました:', error);
        }
    };
    
    addTodoBtn.addEventListener('click', addTodo);
    
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('todo-delete')) {
            const todoItem = e.target.closest('.todo-item');
            const id = todoItem.dataset.id;
            deleteTodo(id);
        }
    });
    
    todoList.addEventListener('change', (e) => {
        if (e.target.classList.contains('todo-checkbox')) {
            const todoItem = e.target.closest('.todo-item');
            const id = todoItem.dataset.id;
            const completed = e.target.checked;
            toggleTodo(id, completed);
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            fetchTodos();
        });
    });
    
    fetchTodos();
});
