import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string = '';
  let taskCreated;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'testjest50@gmail.com',
    password: '123456',
  };

  const userLogin = {
    email: 'testjest50@gmail.com',
    password: '123456',
  };

  const newTask = {
    title: 'Test jest',
    description: 'Adding task with jest',
    status: 'In Progress',
  };

  const taskUpdate = {
    title: 'Update task title',
  };
  describe('Auth', () => {
    it('(POST) - New User Register', async () => {
      return request(app.getHttpServer())
        .post('/User/register')
        .send(user)
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe('User Registered!');
          expect(res.body.token).toBeDefined();
        });
    });

    it('(POST) - Login user', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(userLogin)
        .expect(200)
        .then((res) => {
          expect(res.body.userId).toBeDefined();
          expect(res.body.token).toBeDefined();
          jwtToken = res.body.token;
        });
    });

    describe('Tasks', () => {
      it('(POST) - Create new Task', async () => {
        await request(app.getHttpServer())
          .post('/tasks')
          .set('Cookie', `auth_token=${jwtToken}`)
          .send(newTask)
          .expect(201)
          .then((res) => {
            expect(res.body.task._id).toBeDefined();
            expect(res.body.task.title).toEqual(newTask.title);
            taskCreated = res.body.task;
          });
      });

      it('(GET) - Get Task', async () => {
        return request(app.getHttpServer())
          .get('/tasks')
          .set('Cookie', `auth_token=${jwtToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body.data.length).toBe(1);
          });
      });

      it('(GET) - Get Task By Id', async () => {
        return request(app.getHttpServer())
          .get(`/tasks/${taskCreated._id}`)
          .set('Cookie', `auth_token=${jwtToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toBeDefined();
            expect(res.body._id).toEqual(taskCreated._id);
          });
      });

      it('(PUT) - Update Task By Id', async () => {
        return request(app.getHttpServer())
          .put(`/tasks/edit/${taskCreated._id}`)
          .set('Cookie', `auth_token=${jwtToken}`)
          .send(taskUpdate)
          .expect(201)
          .then((res) => {
            expect(res.body).toBeDefined();
            expect(res.body.title).toEqual(taskUpdate.title);
          });
      });

      it('(DELETE) - Delete Task By Id', async () => {
        return request(app.getHttpServer())
          .delete(`/tasks/delete/${taskCreated._id}`)
          .set('Cookie', `auth_token=${jwtToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toBeDefined();
            expect(res.body.message).toBe('Task deleted');
          });
      });
    });
  });
});
