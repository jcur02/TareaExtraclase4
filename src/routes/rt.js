const { Router } = require('express');
const fs = require('fs');
const router = Router();

// GET
router.get('/getCourses', (req, res) => {
    try {
        const jsonString = fs.readFileSync('src/db.json', 'utf-8');
        const data = JSON.parse(jsonString);
        res.json(data);
    } catch (err){
        console.log(err);
    }
});

// POST
router.post('/addCourse', (req, res)=> {
    const {course, code, grade} = req.body;

    if(course && code && grade){
        const newObject = 
        {
            course: course,
            code: code,
            grade: grade
        }

        try {
            const jsonString = fs.readFileSync('src/db.json', 'utf-8');
            const data = JSON.parse(jsonString);

            data.push(newObject);
            const jsonData = JSON.stringify(data, null, 2);

            fs.writeFile('src/db.json', jsonData, err => {
                if(err){
                    console.log(err);
                }
                else {
                    console.log('OK');
                    res.send('Ok request');
                }
            })
        } catch(err){
            console.log(err);
        }
    } else {
        res.send('Data missing')
    }
});

// PUT - UPDATE
router.put('/updateCourse/:key', (req, res) => {
    const { course, code, grade} = req.body;
    const { key } = req.params;

    if(course && code && grade){
        try {
            const jsonString = fs.readFileSync('src/db.json', 'utf-8');
            const data = JSON.parse(jsonString);

            data.forEach(element => {
                if(element.code == key){
                    element.course = course;
                    element.grade = grade;
                }
            });
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFile('src/db.json', jsonData, err => {
                if(err){
                    console.log(err)
                } else{
                    console.log('Update Success')
                    res.send('Update OK')
                }
            })
        } catch(err){
            console.log(err);
        }
    } else{
        res.send('Attribute missing');
    }
});

// DELETE
router.delete('/deleteCourse/:key', (req, res) => {
    const { key } = req.params;
    try {
        const jsonString = fs.readFileSync('src/db.json', 'utf-8');
        const data = JSON.parse(jsonString);

        for(var i = 0; i < data.length; i++){
            if(data[i].code == key){
                data.splice(i, 1);
            }
        }
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFile('src/db.json', jsonData, err => {
            if(err){
                console.log(err);
            } else {
                res.send('Delete OK');
            }
        });
    } catch(err){
        console.log(err);
    }
});

module.exports = router;