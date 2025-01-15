// Mock data for demonstration purposes
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { id: 6, name: 'Diana White', email: 'diana.white@example.com' },
    { id: 7, name: 'Ethan Miller', email: 'ethan.miller@example.com' },
    { id: 8, name: 'Fiona Wilson', email: 'fiona.wilson@example.com' },
    { id: 9, name: 'George Moore', email: 'george.moore@example.com' },
    { id: 10, name: 'Hannah Taylor', email: 'hannah.taylor@example.com' },
    { id: 11, name: 'Ian Anderson', email: 'ian.anderson@example.com' },
    { id: 12, name: 'Jessica Thomas', email: 'jessica.thomas@example.com' },
    { id: 13, name: 'Kevin Martinez', email: 'kevin.martinez@example.com' },
    { id: 14, name: 'Laura Jackson', email: 'laura.jackson@example.com' },
    { id: 15, name: 'Mark Thompson', email: 'mark.thompson@example.com' },
    { id: 16, name: 'Natalie Harris', email: 'natalie.harris@example.com' },
    { id: 17, name: 'Oscar Martin', email: 'oscar.martin@example.com' },
    { id: 18, name: 'Paula Clark', email: 'paula.clark@example.com' },
    { id: 19, name: 'Quincy Lewis', email: 'quincy.lewis@example.com' },
    { id: 20, name: 'Rachel Walker', email: 'rachel.walker@example.com' }
];
  
  // Controller methods
  const getAllUsers = (req, res) => {
    res.status(200).json(users);
  };
  
  const createUser = (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  const getUserById = (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  };
  
  const updateUserById = (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json(user);
  };
  
  const deleteUserById = (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ message: `User ${req.params.id} not found` });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully' });
  };
  
  module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
  };