import crudRepository from "./crudRepository.js";
import Task from "../models/tasksModel.js";

export const taskRepository = {
   ...crudRepository(Task),
   
   getTaskById: async function (id) {
      try {
         const task = await Task.findById(id)
         return task;
     } catch (error) {
         console.log(error);
         throw error;
     }
   },

   getAllTaskWithDetails: async function () {
      try {
         const findAllTask = await Task.find()
         .populate('assignedBy', 'username email')  // Populate admin details
         .populate('assignedTo', 'username email'); // Populate user details
     
        return findAllTask;
     } catch (error) {
         console.log(error);
         throw error;
     }
   },

   getTaskWithUserId: async function (userId) {
      try {
         const tasks = await Task.find({ assignedTo: userId })
         .populate('assignedBy', 'username email')
         .populate('assignedTo', 'username email');

         return tasks;
      } catch (error) {
         console.log(error);
         throw error;
      }
   },

};