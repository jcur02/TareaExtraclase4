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
})

// PUT - UPDATE
//router.put('/updateCourse', (req, res) => {
    
//})

module.exports = router;