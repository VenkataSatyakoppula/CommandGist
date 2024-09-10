import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../services/userService.mjs';
// @route   GET /users (only for testing)
export const listUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @route   GET /user/profile
export const profileView = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @route   POST /user
export const userCreate = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

// @route   PUT /user/update
export const userUpdate = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.user._id,req.body)
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

// @route   DELETE /user/
export const userDelete = async (req, res) => {
    try {
        const user = await deleteUser(req.user._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};