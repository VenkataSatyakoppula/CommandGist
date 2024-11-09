import User from '../models/userModel.mjs';

// @desc    Get all users
// @param   None
export const getUsers = async () => {
    return await User.find({});
};

// @desc    Get a single user by ID
// @param   id
export const getUserById = async (id) => {
    return await User.findById(id);
};

// @desc    Create a new user
// @param   body(dictionary)
export const createUser = async (body) => {
    const newUser = new User(body);
    await newUser.save();
    const {password, ...otherfields} = newUser.toObject(); 
    return otherfields 
};

// @desc    Update a user by ID
// @param   id,body
export const updateUser = async (id, body) => {
    const updatedUser = await User.findOneAndUpdate({_id:id}, body, {
        new: true,
    });
    return updatedUser
};

// @desc    Delete a user by ID
// @param   id
export const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user
};
