document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    
    let todos = [
        { id: 1, text: 'Express.jsを学ぶ', completed: false },
        { id: 2, text: 'TODOアプリを作成する', completed: false }
    ];
    
    const renderTodos = () => {
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
    
    const addTodo = () => {
        const text = todoInput.value.trim();
        
        if (!text) return;
        
        const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        const newTodo = {
            id: newId,
            text,
            completed: false
        };
        
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
    };
    
    const toggleTodo = (id, completed) => {
        const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
        if (todoIndex !== -1) {
            todos[todoIndex].completed = completed;
            renderTodos();
        }
    };
    
    const deleteTodo = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
            renderTodos();
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
            renderTodos();
        });
    });
    
    renderTodos();
    
    const container = document.querySelector('.container');
    const note = document.createElement('div');
    note.style.marginTop = '20px';
    note.style.padding = '10px';
    note.style.backgroundColor = '#f8f9fa';
    note.style.border = '1px solid #dee2e6';
    note.style.borderRadius = '4px';
    note.innerHTML = '<p><strong>注意:</strong> これはGitHub Pagesでホストされている静的なデモバージョンです。データはブラウザのメモリに保存され、ページをリロードすると失われます。</p>';
    container.appendChild(note);
});
