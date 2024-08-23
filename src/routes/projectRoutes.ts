import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Project } from '../entity/Project';

const router = Router();

// Get all projects for a user
router.get('/', async (req, res) => {
    const { userId } = req;
    // console.log(userId, 'userId')

    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository.find({
        where: { user: { id: userId } }
    });
    res.json(projects);
});

// Create a new project
router.post('/', async (req, res) => {
    const { name, userId } = req.body;
    console.log(name, userId, 'name, userId')

    const projectRepository = AppDataSource.getRepository(Project);
    const project = projectRepository.create({ name, user: userId });
    await projectRepository.save(project);
    res.status(201).json(project);
});

// Update a project
router.put('/:id', async (req, res) => {
    const { name } = req.body;
    console.log(name, 'name')

    const projectId = req.params.id;
    const projectRepository = AppDataSource.getRepository(Project);
    let project = await projectRepository.findOneBy({ id: parseInt(projectId) });
    // console.log(project, 'project')

    if (project) {
        project.name = name;
        await projectRepository.save(project);
        res.json(project);
    } else {
        res.status(404).send('Project not found');
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    const projectId = req.params.id;
    const projectRepository = AppDataSource.getRepository(Project);
    const project = await projectRepository.findOneBy({ id: parseInt(projectId) });

    if (project) {
        await projectRepository.remove(project);
        res.status(204).send();
    } else {
        res.status(404).send('Project not found');
    }
});

export default router;
