const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Create a new user
function createUser(user) {
    users.push(user);
}

// Read a user by ID
function readUser(id) {
    return users.find(user => user.id === id);
}

// Update a user by ID
function updateUser(id, updatedUser) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
    }
}

// Delete a user by ID
function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

// Get all users
function getAllUsers() {
    return users;
}

createUser({ id: 4, name: 'Alice Jackson', email: 'alice@example.com'})
console.log(getAllUsers());