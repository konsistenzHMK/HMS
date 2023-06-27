import express from 'express';
const router = express.Router();
import {v4 as uuidv4} from 'uuid';
// import * from './logics.js';
import {allAddressDetails ,hostel_registration , student_registration , hostel_tower_reg , hostel_tower_wing_reg ,hostel_room_reg ,expense} from './models.js';

router.post('/hostel/registration',hostel_registration)
router.post('/student/registration',student_registration)
router.post('/hostel/tower',hostel_tower_reg)
router.post('hostel/tower/wing',hostel_tower_wing_reg)
router.post('/hostel/room',hostel_room_reg)
router.post('/expense',expense)
router.get('/allAddressDetails',allAddressDetails)

export default router;