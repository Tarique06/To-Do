const { Task: TaskModel } = require("../database/index");

const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../controller/userFunction');

exports.create = async (req, res) => {
    console.log("#message:", req.user.id)
    try {
        const task = await TaskModel.create({
            ...req.body,
            userId: req.user.id
        })
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send({
            message:
                e.message || "Some error occurred."
        })
        console.log(e)
    }
};

exports.findAll = (req, res) => {
    const description = req.query.description;
    const uid = req.user.id
    var condition = description ? { description: { [Op.like]: `%${description}%` }, userId: uid } : { userId: uid }
    TaskModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};


exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskModel.findOne({ where: { id } })
        return res.status(200).json({ task })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving TaskModels."
        });
    }
}


exports.update = (req, res) => {
    const id = req.params.id;

    TaskModel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "TaskModels was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update TaskModels with id=${id}. Maybe TaskModels was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating TaskModels with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    TaskModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "TaskModels was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete TaskModels with id=${id}. Maybe TaskModels was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete TaskModels with id=" + id
            });
        });
};

exports.findAllPublished = (req, res) => {
    const uid = req.user.id;
    console.log(">>>>>>>>>>", req.user)
    console.log(req)
    // TaskModel.findAll({ where: { completed: "true", userId: uid } })
    //     .then(data => {
    //         //const response = getPagingData(data, page, limit);
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).send({
    //             message: "Some error occurred while retrieving task"
    //         })
    //     })
}