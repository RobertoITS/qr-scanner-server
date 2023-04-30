import { connect } from "../database/database"
import { request, response } from 'express'

//! Get Request => Get classes quantity (materia), attendances quantity (attendance of the materia) and attendance registered of the user
/**
 * 
 * @param {user_id, materia_id} req type: string || number
 * @param {Array<string>} res type: Array[0].quantity (classes_quantity), Array[1].quantity (attendance_materia), Array[2].quantity (user_register_attendance)
 * 
 * If the student isn't registered in the materia, all the records won't going to appear in
 * the result of the query
 * 
 */
const getAttendances = async (req = request, res = response) => {
    const date = new Date()
    const year = `%${date.getFullYear()}`
    const id = req.params.id
    console.log(year);
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT a.id AS attendance_id, 
                career_id, 
                a.professor_id, 
                ura.student_id,
                ura.id AS register_id,
                a.materia_id, 
                attendance_date, 
                materia_name, 
                actual_year, 
                m.total_classes,
                m.classes_quantity,
                u.name AS professor, 
                u.last_name AS professor_last_name, 
                c.career_name 
            FROM attendance a
            INNER JOIN materia m ON a.materia_id = m.id
            INNER JOIN career c ON m.career_id = c.id
            INNER JOIN users u ON m.professor_id = u.id
            INNER JOIN user_register_attendance ura ON ura.attendance_id = a.id
            INNER JOIN inscriptions i ON ura.student_id = i.student_id AND m.id = i.materia_id
            WHERE ura.student_id = ? AND attendance_date LIKE ?
            ORDER BY materia_name`,
            [id, year]
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

//! Get Request => Get student inscription in materias
/**
 * 
 * @param {student_id} req type: number || string
 * @param {student_materias_info} res type: Json => Materias information
 * 
 */
const getMaterias = async (req = request, res = response) => {
    const id = req.params.id
    try {
        const connection = await connect
        const result = await connection.query(
            `SELECT 
                I.id AS inscription_id, 
                I.student_id, 
                I.materia_id, 
                M.career_id, 
                M.professor_id,
                M.materia_name, 
                M.actual_year, 
                C.career_name, 
                C.duration, 
                U.name AS professor, 
                U.last_name AS professor_last_name
            FROM inscriptions I
            INNER JOIN materia M ON I.materia_id = M.id
            INNER JOIN career C ON M.career_id = C.id
            INNER JOIN users U ON M.professor_id = U.id
            WHERE I.student_id = ?`,
            id
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

export const methods = {
    getAttendances,
    getMaterias
}