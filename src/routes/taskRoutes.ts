import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

const router = Router();

// Get all tasks for a specific project
router.get('/:projectId/tasks', async (req, res) => {
    const projectId = req.params.projectId;
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({
        where: { project: { id: parseInt(projectId) } }
    });
    res.json(tasks);
});

// Add a task to a project
router.post('/:projectId/tasks', async (req, res) => {
    const { description } = req.body;
    const projectId = req.params.projectId;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create({ description, project: { id: parseInt(projectId) } });
    await taskRepository.save(task);
    res.status(201).json(task);
});

// Update a task
router.put('/:projectId/tasks/:taskId', async (req, res) => {
    const { description } = req.body;
    const { projectId, taskId } = req.params;
    const taskRepository = AppDataSource.getRepository(Task);
    let task = await taskRepository.findOneBy({ id: parseInt(taskId), project: { id: parseInt(projectId) } });

    if (task) {
        task.description = description;
        await taskRepository.save(task);
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
router.delete('/:projectId/tasks/:taskId', async (req, res) => {
    const { projectId, taskId } = req.params;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({ id: parseInt(taskId), project: { id: parseInt(projectId) } });

    if (task) {
        await taskRepository.remove(task);
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

export default router;
