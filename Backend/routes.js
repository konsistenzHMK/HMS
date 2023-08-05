import express from 'express';
const router = express.Router();
import {status_trasition,saved_form_1,saved_form_2,saved_form_3,saved_form_4,saved_form_5,saved_form_6,expense_flow_code_to_user_id,hostel_flow_code_to_user_id,flow_table_for_expense,flow_table_for_hostel,user_role_management,role_to_process_mapping,process_id_to_process_description,expense_type,role_reference,users,expense_header, allAddressDetails ,hostel_registration , student_registration , hostel_tower_reg , hostel_tower_wing_reg ,hostel_room_reg ,expense} from './models.js';
import{get_status,status_of_hostel_block,status_of_hostel_active,gethostel_id_where_status_active,saved_data_from_hostel_registration,get_expense_code_expense_name_expense_type,rector_id_to_hostel_id , hostel_id_to_studentname} from './logics.js';
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
router.post('/role/reference',role_reference)
router.get('/get_expense_code_expense_name_expense_type',get_expense_code_expense_name_expense_type)
router.post('/expense/type',expense_type)
router.post('/role/to/process/mapping',role_to_process_mapping)                    //admin_dashboard
router.post('/user/role/management',user_role_management)                          //admin_dashboard
router.post('/process/id/to/processdescription',process_id_to_process_description) //admin_dashboard
router.post('/flow/table/for/hostel',flow_table_for_hostel)    
router.post('/flow/table/for/expense',flow_table_for_expense)
router.post('/hostel/flow/code/to/hostel/id',hostel_flow_code_to_user_id)    
router.post('/expense/flow/code/to/user/id',expense_flow_code_to_user_id)    
// router.post('/hostel/saveform',saved_form_hostel_registration) 
router.get('/hostel/registration/saved',saved_data_from_hostel_registration)   
router.get('/gethostel_id/where/status_active',gethostel_id_where_status_active)   
router.post('/status_of_hostel_active',status_of_hostel_active)  
router.post('/status_of_hostel_block',status_of_hostel_block)   
router.post('/status_trasition',status_trasition) 
router.get('/get_status',get_status)
router.post('/hostel/saveform1',saved_form_1)          
router.post('/hostel/saveform2',saved_form_2)          
router.post('/hostel/saveform3',saved_form_3)          
router.post('/hostel/saveform4',saved_form_4)          
router.post('/hostel/saveform5',saved_form_5)          
router.post('/hostel/saveform6',saved_form_6)          
export default router;