import { connect } from '../database/database'
import { request, response } from 'express'

const getMaterias = async (req = request, res = response) => {
    const id = req.params.id
    try{
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                C.id AS career_id, 
                M.id AS materia_id, 
                MHS.id AS materia_has_schedules_id, 
                S.id AS schedule_id,
                M.materia_name,
                M.actual_year,
                M.classes_quantity,
                C.career_name,
                C.description,
                C.duration,
                S.class_day,
                S.class_schedule
            FROM materia M
            INNER JOIN career C ON M.career_id = C.id
            INNER JOIN materia_has_schedules MHS ON M.id = MHS.materia_id
            INNER JOIN schedules S ON MHS.schedule_id = S.id
            WHERE M.professor_id = ?`, id
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch(e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

const getStudents = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT * FROM users U
            INNER JOIN inscriptions I ON U.id = I.student_id
            INNER JOIN materia M ON I.materia_id = M.id
            INNER JOIN users P ON M.professor_id = P.id
            WHERE M.professor_id = ?`, id
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch(e) {
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

const getStudentsAndMaterias = async (req, res) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
            C.id AS career_id, 
            M.id AS materia_id, 
            MHS.id AS materia_has_schedules_id, 
            S.id AS schedule_id,
            M.materia_name,
            M.actual_year,
            M.classes_quantity,
            C.career_name,
            C.description,
            C.duration,
            S.class_day,
            S.class_schedule,
            U.name AS student_name
        FROM materia M
        INNER JOIN career C ON M.career_id = C.id
        INNER JOIN materia_has_schedules MHS ON M.id = MHS.materia_id
        INNER JOIN schedules S ON MHS.schedule_id = S.id
        INNER JOIN inscriptions I ON M.id = I.materia_id
        INNER JOIN users U ON U.id = I.student_id
        WHERE M.professor_id = ?`, id
        )
        res.status(200).json({
            ok: true,
            result,
            msg: 'Approved'
        })
    }
    catch(e){
        res.status(400).json({
            ok: false,
            e,
            msg: 'Rejected'
        })
    }
}

export const methods = {
    getMaterias,
    getStudents,
    getStudentsAndMaterias
}