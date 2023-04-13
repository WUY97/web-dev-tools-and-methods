const app = require('../app');
const request = require('supertest');
const { userDB } = require('../backend/database/db');
const uuid = require('uuid').v4;
const fs = require('fs');

let sessionId;

describe('APIs Testing...', () => {
    test('Connection Testing...', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
    });

    test('Create User Testing...', async () => {
        /* 200 */
        const baseCase1 = await request(app).post('/api/session').send({
            username: 'testing1',
        });
        expect(baseCase1.statusCode).toBe(201);
        expect(baseCase1.body).toHaveProperty('username');

        const baseCase2 = await request(app).post('/api/session').send({
            username: 'testing2',
        });
        expect(baseCase2.statusCode).toBe(201);
        expect(baseCase2.body).toHaveProperty('username');

        /* 400 */
        const emptyCase = await request(app).post('/api/session').send({
            username: '',
        });
        expect(emptyCase.statusCode).toBe(400);
        expect(emptyCase.body).toHaveProperty('error');

        const nullCase = await request(app).post('/api/session').send({
            username: null,
        });
        expect(nullCase.statusCode).toBe(400);
        expect(nullCase.body).toHaveProperty('error');

        const undefinedCase = await request(app).post('/api/session').send({
            username: undefined,
        });
        expect(undefinedCase.statusCode).toBe(400);
        expect(undefinedCase.body).toHaveProperty('error');

        const numberCase = await request(app).post('/api/session').send({
            username: 123,
        });
        expect(numberCase.statusCode).toBe(400);
        expect(numberCase.body).toHaveProperty('error');

        const objectCase = await request(app).post('/api/session').send({
            username: {},
        });
        expect(objectCase.statusCode).toBe(400);
        expect(objectCase.body).toHaveProperty('error');

        const arrayCase = await request(app).post('/api/session').send({
            username: [],
        });
        expect(arrayCase.statusCode).toBe(400);
        expect(arrayCase.body).toHaveProperty('error');

        const booleanCase = await request(app).post('/api/session').send({
            username: true,
        });
        expect(booleanCase.statusCode).toBe(400);
        expect(booleanCase.body).toHaveProperty('error');

        const functionCase = await request(app)
            .post('/api/session')
            .send({
                username: () => {},
            });
        expect(functionCase.statusCode).toBe(400);
        expect(functionCase.body).toHaveProperty('error');

        const symbolCase = await request(app).post('/api/session').send({
            username: Symbol(),
        });
        expect(symbolCase.statusCode).toBe(400);
        expect(symbolCase.body).toHaveProperty('error');

        const nanCase = await request(app).post('/api/session').send({
            username: NaN,
        });
        expect(nanCase.statusCode).toBe(400);
        expect(nanCase.body).toHaveProperty('error');

        const infinityCase = await request(app).post('/api/session').send({
            username: Infinity,
        });
        expect(infinityCase.statusCode).toBe(400);
        expect(infinityCase.body).toHaveProperty('error');

        const nonAlphaNumericalCase = await request(app)
            .post('/api/session')
            .send({
                username: 'test!@#$%^&*()',
            });
        expect(nonAlphaNumericalCase.statusCode).toBe(400);
        expect(nonAlphaNumericalCase.body).toHaveProperty('error');

        const tooLongCase = await request(app).post('/api/session').send({
            username: 'pneumonoultramicroscopicsilicovolcanoconiosis',
        });
        expect(tooLongCase.statusCode).toBe(400);
        expect(tooLongCase.body).toHaveProperty('error');

        const tooShortCase = await request(app).post('/api/session').send({
            username: 'me',
        });
        expect(tooShortCase.statusCode).toBe(400);
        expect(tooShortCase.body).toHaveProperty('error');

        /* 403 */
        const dogCase = await request(app).post('/api/session').send({
            username: 'dog',
        });
        expect(dogCase.statusCode).toBe(403);
        expect(dogCase.body).toHaveProperty('error');
    });

    test('Get User Testing...', async () => {
        /* 201 */
        sessionId = userDB.getSessionId('testing1');
        const baseCase = await request(app)
            .get('/api/session')
            .set('Cookie', ['sid=' + sessionId]);
        expect(baseCase.statusCode).toBe(200);
        expect(baseCase.body).toHaveProperty('username');

        /* 401 */
        const noSidCase = await request(app).get('/api/session');
        expect(noSidCase.statusCode).toBe(401);
        expect(noSidCase.body).toHaveProperty('error');

        const invalidSidCase = await request(app)
            .get('/api/session')
            .set('Cookie', ['sid=' + uuid()]);
        expect(invalidSidCase.statusCode).toBe(401);
        expect(invalidSidCase.body).toHaveProperty('error');
    });

    test('Delete User Testing...', async () => {
        /* 200 */
        sessionId = userDB.getSessionId('testing2');
        const baseCase = await request(app)
            .delete('/api/session')
            .set('Cookie', ['sid=' + sessionId]);
        expect(baseCase.statusCode).toBe(200);
        expect(baseCase.body).toHaveProperty('wasLoggedIn');
    });

    test('Create Post Testing...', async () => {
        let image1, image2;
        /* 201 */
        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        const baseCase1 = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .field('tags', 'test')
            .attach('image', image1, 'test.png');
        expect(baseCase1.statusCode).toBe(201);
        expect(baseCase1.body).toHaveProperty('title');
        expect(baseCase1.body).toHaveProperty('content');
        expect(baseCase1.body).toHaveProperty('tags');
        expect(baseCase1.body).toHaveProperty('images');
        expect(baseCase1.body).toHaveProperty('creator');
        expect(baseCase1.body).toHaveProperty('createdAt');
        expect(baseCase1.body).toHaveProperty('comments');

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const baseCase2 = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(baseCase2.statusCode).toBe(201);
        expect(baseCase2.body).toHaveProperty('title');
        expect(baseCase2.body).toHaveProperty('content');
        expect(baseCase2.body).toHaveProperty('tags');
        expect(baseCase2.body).toHaveProperty('images');
        expect(baseCase2.body).toHaveProperty('creator');
        expect(baseCase2.body).toHaveProperty('createdAt');
        expect(baseCase2.body).toHaveProperty('comments');

        /* 400 */
        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const noTitleCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('content', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(noTitleCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const noContentCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(noContentCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const noImageCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .field('tags', ['test', 'test2']);
        expect(noImageCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const noTagCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(noTagCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const tooLongTitleCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field(
                'title',
                'FBI arrests 21-year-old Air National Guardsman suspected of leaking classified documents'
            )
            .field('content', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(tooLongTitleCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const tooLongContentCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field(
                'content',
                `Military records show that Teixeira holds the rank of airman first class and has been in uniform since entering the Air National Guard in September 2019. He has been based at Otis Air National Guard Base on Cape Cod and holds the title of cyber transport systems journeyman.

        A Facebook post in July from the 102nd Intelligence Wing, which is headquartered at that base, congratulated an individual with the same name as Teixeira on a promotion to airman first class.
        
        U.S. officials had been searching for the source of the leak, which exposed potentially hundreds of pages of intelligence about Russian efforts in Ukraine and spying on U.S. allies.
        
        Pentagon Press Secretary Air Force Brig. Gen Pat Ryder declined to confirm the leaker's identity at a briefing Thursday and referred reporters to the Department of Justice because it's a "law enforcement matter" and ongoing investigation, he said.`
            )
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(tooLongContentCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const tooManyTagsCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field('content', 'test')
            .field('tags', [
                'test',
                'test2',
                'test3',
                'test4',
                'test5',
                'test6',
            ])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(tooManyTagsCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const tooLongTagsCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field('content', 'test')
            .field('tags', [
                'pneumonoultramicroscopicsilicovolcanoconiosis',
                'test2',
                'test3',
                'test4',
            ])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(tooLongTagsCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const invalidCharacterTagCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field('content', 'test')
            .field('tags', ['test1@', 'test2', 'test3', 'test4'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(invalidCharacterTagCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const tooManyImagesCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field('content', 'test')
            .field('tags', ['test1', 'test2', 'test3', 'test4'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg')
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg')
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(tooManyImagesCase.statusCode).toBe(400);

        sessionId = userDB.getSessionId('testing1');
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.txt');
        const invalidImageTypeCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'FBI arrests 21-year-old Air National Guardsman')
            .field('content', 'test')
            .field('tags', ['test1', 'test2', 'test3', 'test4'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.txt')
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.txt');
        expect(invalidImageTypeCase.statusCode).toBe(400);

        /* 401 */
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const noSidCase = await request(app)
            .post('/api/post')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(noSidCase.statusCode).toBe(401);
        
        sessionId = uuid();
        image1 = fs.readFileSync(__dirname + '/assets/test.png');
        image2 = fs.readFileSync(__dirname + '/assets/test.jpg');
        const wrongSidCase = await request(app)
            .post('/api/post')
            .set('Cookie', ['sid=' + sessionId])
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'test')
            .field('content', 'test')
            .field('tags', ['test', 'test2'])
            .attach('image', image1, 'test.png')
            .attach('image', image2, 'test.jpg');
        expect(wrongSidCase.statusCode).toBe(401);
    });
});
