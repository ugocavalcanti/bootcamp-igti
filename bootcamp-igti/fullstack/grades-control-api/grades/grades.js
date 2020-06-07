const express = require("express");
const fs = require("fs").promises;

const router = express.Router();
const fileName = "grades.json";

router.post("/", async (req, res) => {
    try {
        let body = req.body;
    
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
        
        let nextId = repoGrades.nextId++;
        body.id = nextId;
        body.timestamp = new Date();
        repoGrades.grades.push(body);

        await fs.writeFile(fileName, JSON.stringify(repoGrades));

        res.send("Grade included with success.")
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        let idGrade = req.params.id;
        let body = req.body;
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let indexGrade = repoGrades.grades.findIndex(grade => grade.id == idGrade);
        if (indexGrade === -1) {
            throw new Error("Grade not found.");
        }
        repoGrades.grades[indexGrade].student = body.student;
        repoGrades.grades[indexGrade].subject = body.subject;
        repoGrades.grades[indexGrade].type = body.type;
        repoGrades.grades[indexGrade].value = body.value;

        await fs.writeFile(fileName, JSON.stringify(repoGrades));

        res.send("Grade updated with success.");
    } catch (err) {
        res.status(400).send(err.message);  
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let idGrade = req.params.id;
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let indexGrade = repoGrades.grades.findIndex(grade => grade.id == idGrade);
        if (indexGrade === -1) {
            throw new Error("Grade not found.");
        }
    
        repoGrades.grades.splice(indexGrade, 1);

        await fs.writeFile(fileName, JSON.stringify(repoGrades));

        res.send("Grade deleted with success.");
    } catch (err) {
        res.status(400).send(err.message);  
    }
});

router.get("/", async (req, res) => {
    try {
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);

        res.send(repoGrades.grades);
    } catch (err) {
        res.status(400).send(err.message);  
    }
});

router.get("/:id", async (req, res) => {
    try {
        let idGrade = req.params.id;
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let grade = repoGrades.grades.find(grade => grade.id == idGrade);
        if (grade === undefined) {
            throw new Error("Grade not found.");
        }

        res.send(grade);
    } catch (err) {
        res.status(400).send(err.message);  
    }
});

router.get("/sum/:student/:subject", async (req, res) =>{
    try {
        let student = req.params.student;
        let subject = req.params.subject;
    
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let listStudentSameSubject = repoGrades.grades.filter(element => {
            return (element.student === student && element.subject === subject);
        })
    
        let sumGrades = listStudentSameSubject.reduce((acc, element) => {
            return acc += element.value;
        }, 0);
    
        res.send([{sum: sumGrades}]);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/avg/:subject/:type", async (req, res) =>{
    try {
        let type = req.params.type;
        let subject = req.params.subject;
    
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let listSubjectSameType = repoGrades.grades.filter(element => {
            return (element.type === type && element.subject === subject);
        })
    
        let sumGrades = listSubjectSameType.reduce((acc, element) => {
            return acc += element.value;
        }, 0);

        let avg = sumGrades / listSubjectSameType.length;
    
        res.send({sum: avg});
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/firstthree/:subject/:type", async (req, res) =>{
    try {
        let type = req.params.type;
        let subject = req.params.subject;
    
        let data = await fs.readFile(fileName, "utf8");
        let repoGrades = JSON.parse(data);
    
        let listSubjectSameType = repoGrades.grades.filter(element => {
            return (element.type === type && element.subject === subject);
        }).sort((a, b) => {
            return b.value - a.value;
        })
        let listFirstThreeGrades = [listSubjectSameType[0], listSubjectSameType[1], listSubjectSameType[2]];
        res.send(listFirstThreeGrades);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
