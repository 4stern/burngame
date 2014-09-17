var frisby = require('frisby');
frisby.create('POST /api/login')
    .post('http://localhost:8088/api/login',{
        login       : "test",
        password    : "test"
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        sessionToken: String
    })
    .toss();

frisby.create('POST /api/login')
    .post('http://localhost:8088/api/login',{
        login       : "test",
        password    : "nonevalidpassword"
    })
    .expectStatus(401)
    .expectHeaderContains('content-type', 'application/json')
    .toss();