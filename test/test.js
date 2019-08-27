var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:3000');

describe('SAMPLE UNIT TEST', function () {

    it('should get all Todos', function (done) {
        server
        .get("/todos")
        .expect("Content-type",/json/)
        .expect(200)
        .end( function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("should create Todo",function(done){
        server
        .post('/todos')
        .send({
            title : 'Test title',
            description : 'Test description',
            date : '05-05-2019'
        })
        .expect("Content-type",/json/)
        .expect(200)
        .end(function (err, res) {
            res.status.should.equal(201);
            done();
        });
    });

    it("should return 404 upon hitting random url",function(done){
        server
        .get('/random')
        .send({
            title : 'Test title changed',
            description : 'Test description changed',
            date : '05-05-2019'
        })
        .expect("Content-type",/json/)
        .expect(200)
        .end(function (err, res) {
            res.status.should.equal(404);
            done();
        });
    });

});