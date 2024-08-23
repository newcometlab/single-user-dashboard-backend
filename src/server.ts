import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { config } from './config/config';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  app.use('/api/users', userRoutes);

  // app.use('/api/projects', function (req, res) {
  //   console.log(req.userId);
  // });

  app.use('/api/projects', projectRoutes);
  app.use('/api/tasks', taskRoutes);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch(error => console.log(error));
