import React, { useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/todos/';

const TodoList = () => {
    useEffect(() => {
        console.log("useEffect is running!");
        axios.get(API_URL)
            .then(response => console.log("API response:", response.data))
            .catch(error => console.error("API error:", error));
    }, []);

    return <div>Testing API Call</div>;
};

export default TodoList;