<script>
	import { onMount } from 'svelte';
	const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';


	let todos = $state([]);
	let newTask = $state('');
    let errorMessage = $state('');


	onMount(async () => {
		await fetchTodos();
	});


	async function fetchTodos() {
		try {
            const response = await fetch(`${BACKEND_URL}/api/todos`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            todos = await response.json();
            errorMessage = ''; 
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            errorMessage = 'Failed to load todos. Is the backend running?';
        }
	}

	async function addTodo() {
		if (!newTask.trim()) return; 

        try {
            const response = await fetch(`${BACKEND_URL}/api/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: newTask, completed: false })
            });

            if (!response.ok) {
                 throw new Error('Failed to add todo');
            }

            const newTodo = await response.json();
            todos.push(newTodo);
            newTask = '';
            errorMessage = ''; 
        } catch (error) {
            console.error('Failed to add todo:', error);
            errorMessage = 'Failed to add todo. Please try again.';
        }
	}
</script>

<svelte:head>
	<title>Secure Todo App</title>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			background-color: #f4f4f9;
			color: #333;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100vh;
			margin: 0;
		}
		main {
			background: white;
			padding: 2rem;
			border-radius: 12px;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			width: 100%;
			max-width: 500px;
		}
		h1 {
			color: #4a4a4a;
			text-align: center;
			margin-bottom: 1.5rem;
		}
		form {
			display: flex;
			gap: 0.5rem;
			margin-bottom: 1.5rem;
		}
		input[type="text"] {
			flex-grow: 1;
			padding: 0.75rem;
			border: 1px solid #ddd;
			border-radius: 8px;
			font-size: 1rem;
		}
		button {
			padding: 0.75rem 1.5rem;
			border: none;
			background-color: #007bff;
			color: white;
			border-radius: 8px;
			cursor: pointer;
			font-size: 1rem;
			transition: background-color 0.2s;
		}
		button:hover {
			background-color: #0056b3;
		}
		ul {
			list-style: none;
			padding: 0;
		}
		li {
			background-color: #fafafa;
			padding: 0.75rem 1rem;
			border-radius: 8px;
			margin-bottom: 0.5rem;
			border-left: 4px solid #007bff;
		}
        .error {
            color: #d9534f;
            text-align: center;
            margin-bottom: 1rem;
            background-color: #f2dede;
            padding: 0.75rem;
            border-radius: 8px;
        }
	</style>
</svelte:head>

<main>
	<h1>My Secure Todo List</h1>

	<form on:submit|preventDefault={addTodo}>
		<input type="text" bind:value={newTask} placeholder="What needs to be done?" />
		<button type="submit">Add</button>
	</form>
    
    {#if errorMessage}
        <div class="error">{errorMessage}</div>
    {/if}

	<ul>
		{#each todos as todo (todo.id)}
			<li>{todo.task}</li>
		{:else}
			<p>No todos yet! Add one above.</p>
		{/each}
	</ul>
</main>

