import express from 'express';
const router = express.Router();
import {users,expense_header, allAddressDetails ,hostel_registration , student_registration , hostel_tower_reg , hostel_tower_wing_reg ,hostel_room_reg ,expense} from './models.js';
import{rector_id_to_hostel_id , hostel_id_to_studentname} from './logics.js';
router.post('/hostel/registration',hostel_registration)
router.post('/student/registration',student_registration)
router.post('/hostel/tower',hostel_tower_reg) 
router.post('hostel/tower/wing',hostel_tower_wing_reg)
router.post('/hostel/room',hostel_room_reg)
router.post('/expense',expense)
router.get('/allAddressDetails',allAddressDetails)
router.post('/user/registration',users)
router.post('/expense/header',expense_header)
router.get('/hostel_id_to_student_name',hostel_id_to_studentname)
router.get('/rector_id_to_hostel_id',rector_id_to_hostel_id)

export default router;