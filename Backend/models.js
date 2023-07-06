import  db from './config.js';
import './config.js';
import auth from './auth.js';
import './auth.js'
import storage from './storage.js';
import './storage.js';
import {  query, where, getDocs } from "firebase/firestore";
import {collection, addDoc, doc, setDoc , getDoc ,updateDoc} from "firebase/firestore";
import {randon_doc_id_function,booking_expense_header_function,UUIDFunction, studentIdFunction , tower_id_function , wing_id_function , room_id_function , expense_id_function} from './logics.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

 
const users = async (req,res)=>{
    const {
        // user_id,
        username,
        password,
        user_firstname,
        user_middle_name,
        user_lastname,
        aadhar_no,
        contact_no,
        email_id,
        // status,

    } = (req.body);


    // const auth = getAuth();

createUserWithEmailAndPassword( auth,email_id, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // res.send("User Created");
  })
  .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // res.send("User not Created");
      });
   
      

    try{
        await setDoc(doc(db,"users",await randon_doc_id_function()),{ 
            // user_id,
            username,
            // password,
            user_firstname,
            user_middle_name,
            user_lastname,
            aadhar_no, 
            contact_no,
            email_id,
            // status,
            });
 
} 
    catch(e){
        res.send("Data not inserted "+e);
    }
    res.send("Data Inserted");
}

 


const allAddressDetails =  async(req,res)=>{
    const obj={
        "Maharashtra": [
            {value:'Desh' , label:'Desh'},
            {value:'Vidarbha' , label:'Vidarbha (Varhad)'},
            {value:'Marathwada' , label:'Marathwada'},
            {value:'Vidarbha' , label:'Vidarbha'},
            {value:'Khandesh' , label:'North Maharashtra (Khandesh)'},
            {value:'Konkan' , label:'Konkan'},
        ],
        "Desh":[
            {value:'Sangli' , label:'Sangli'},
            {value:'Satara' , label:'Satara'},
            {value:'Solapur' , label:'Solapur'},
            {value:'Kolhapur' , label:'Kolhapur'},
            {value:'Pune' , label:'Pune'},
        ],
        "Vidarbha":[
            {value:'Akola' , label:'Akola'},
            {value:'Amravati' , label:'Amravati'},
            {value:'Buldhana' , label:'Buldhana'},
            {value:'Yavatmal' , label:'Yavatmal'},
            {value:'Washim' , label:'Washim'},
        ],
        "Marathwada":[
            {value:'Aurangabad' , label:'Aurangabad'},
            {value:'Beed' , label:'Beed'},
            {value:'Jalna' , label:'Jalna'},
            {value:'Osmanabad' , label:'Osmanabad'},
            {value:'Nanded' , label:'Nanded'},
            {value:'Latur' , label:'Latur'},
            {value:'Parbhani' , label:'Parbhani'},
            {value:'Hingoli' , label:'Hingoli'},
        ],
        "Vidarbha":[
            {value:'Bhandara' , label:'Bhandara'},
            {value:'Chandrapur' , label:'Chandrapur'},
            {value:'Gadchiroli' , label:'Gadchiroli'},
            {value:'Gondia' , label:'Gondia'},
            {value:'Nagpur' , label:'Nagpur'},
            {value:'Wardha' , label:'Wardha'},
        ],
        "Khandesh":[
            {value:'Ahmednagar' , label:'Ahmednagar'},
            {value:'Dhule' , label:'Dhule'},
            {value:'Jalgaon' , label:'Jalgaon'},
            {value:'Nandurbar' , label:'Nandurbar'},
            {value:'Nashik' , label:'Nashik'},
        ],
        "Konkan":[
            {value:'Mumbai City' , label:'Mumbai City'},
            {value:'Mumbai Suburban' , label:'Mumbai Suburban'},
            {value:'Thane' , label:'Thane'},
            {value:'Palghar' , label:'Palghar'},
            {value:'Raigad' , label:'Raigad'},
            {value:'Ratnagiri' , label:'Ratnagiri'},
            {value:'Sindhudurg' , label:'Sindhudurg'}
        ],
    }
    res.send(obj);
}






const hostel_registration =  async(req,res)=>{
    const { 
        hostel_name,
        description,
        address1,
        address2,
        country,
        state,
        region,
        district,
        city,
        pincode,
        // uuid,
        rector_name,
        categ1,
        categ2,
        categ3,
        tower,
        floor,
        room,
        scapacity,
        bcapacity,
        area,
        mess,
        other_facility,
        status,
        email_id,
        website,
        rector_id,
    } = (req.body);
     
    const ans=await UUIDFunction(country,state,district);
    console.log(ans);
    try{
        await setDoc(doc(db, "hostel_registration",await randon_doc_id_function()), {
            hostel_name,
            description,
            address1,
            address2,
            country,
            state,
            region,
            district,
            city,
            pincode,
            uuid : ans,
            rector_name,
            categ1,
            categ2,
            categ3,
            tower,
            floor,
            room,
            scapacity,
            bcapacity,
            area,
            mess,
            other_facility,
            status,
            email_id,
            website,
            rector_id
        });
    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id " + ans);
}

// will be done by rector
const student_registration  =  async(req,res)=>{
    const { 
        first_name,
    last_name,
    father_name,
    mother_name,
    address_type,
    address1,
    address2,
    country,
    state,
    region,
    district,
    city,
    pincode,
    gender,
    aadhar_id,
    dob,
    height,
    weight,
    blood_group,
    medical_history,
    medicine_taken,
    birth_mark,
    handicapped,
    handicapped_per,
    handicapped_type,
    orphan:Boolean,
    personal_mobile,
    parent_mobile,
    teacher_mobile,
    emergency_number,
    personal_email,
    parent_email,
    teacher_email,
    collage_name,
    principle_name,
    religon,
    category,
    subCategory,
    income,
    photo_file,
    aadhar_file,
    caste_file,
    medical_file,
    account_holder_name,
    bank_name,
    ifsc,
    account_number,
    } = (req.body);

const ans1 = await studentIdFunction(null);

try
{
    await setDoc(doc(db, "student_registration",await randon_doc_id_function()), {
        first_name,
        last_name,
        father_name,
        mother_name,
        address_type,
        address1,
        address2,
        country,
        state,
        region,
        district,
        city,
        pincode,
        gender,
        aadhar_id,
        dob,
        height,
        weight,
        blood_group,
        medical_history,
        medicine_taken,
        birth_mark,
        handicapped,
        handicapped_per,
        handicapped_type,
        personal_mobile,
        parent_mobile,
        teacher_mobile,
        emergency_number,
        personal_email,
        parent_email,
        teacher_email,
        college_name,
        principal_no,
        class_education,
        results,
        caste,
        sub_caste,
        family_income,
        student_id:(ans1+1)
    });
}

catch(e){
    res.send("Data not Inserted");
}
res.send("Data Inserted with id "+(ans1+1));

}



const hostel_tower_reg = async(req,res)=>{
    const { 
        hostel_id ,
        tower_name,
        no_rooms,
        capacity,
        total_area, 
        other_facilities,
        no_wings,
        type,
        status,
    } = (req.body);

    const ans2=await tower_id_function(hostel_id);

    try{
        await setDoc(doc(db, "hostel_tower",uuidv4()), {
            hostel_id,
            tower_name,
            no_rooms,
            capacity,
            total_area, 
            other_facilities,
            no_wings,
            type,
            status,
            tower_id:ans2,
        });
    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted id "+ans2);


}



const hostel_tower_wing_reg = async(req,res)=>{
    const {
        hostel_id,
        tower_name,
        no_rooms,
        capacity,
        total_area, 
        other_facilities,
        no_wings,
        type,
        status,
    }=(req.body);

    const ans3=await wing_id_function(tower_id);

    try{
        await setDoc(doc(db, "hostel_tower_wing",uuidv4()), {
            tower_id,
            wing_name,
            no_rooms,
            capacity,
            total_area, 
            other_facilities,
            no_wings,
            type,
            status,
            wing_id:ans3,
        });

    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id "+ans3);
}



const hostel_room_reg = async(req,res)=>{
    const {
        room_no,
        room_name,
        hostel_id,
        tower_id,
        wing_id,
        room_type,
        room_capacity,
        height,
        width,
        length,
        no_of_doors,
        no_of_windows,
        Facility_list,
        room_status,
        room_furniture,
    } = (req.body);

    const ans4=await room_id_function(hostel_id,room_no);

    try{
        await setDoc(doc(db, "hostel_room",await randon_doc_id_function()), {
            room_no,
            room_name,
            hostel_id,
            tower_id,
            wing_id,
            room_type,
            room_capacity,
            height,
            width,
            length,
            no_of_doors,
            no_of_windows,
            Facility_list,
            room_status,
            room_furniture,
            room_id:ans4,
        });
    }

    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id "+ans4);

}

const expense = async(req,res)=>{
    const{
        expense_name,
        expense_type,
        // status
    } = (req.body);

    const ans5=await expense_id_function(null);
    console.log(ans5);
    let str = ans5;
    let num = parseInt(str);
    num = num + 1;
    str = String(num).padStart(str.length, "0");

    try{
        await setDoc(doc(db, "expense",await randon_doc_id_function()), {
            expense_name,
            expense_type,
            // status,
            expense_code:str,

        });
    }
    catch(e){
        res.send("Data not inserted" +e);
    }
    res.send("Data Inserted with id "+str);

}


const expense_header = async(req,res)=>{
    const{
        expense_code,
        date_of_expense,
        date_of_booking,
        total_expense_amount,
        voucher_no,
        voucher_amount,
        expense_name,
        expense_type,
        hostel_id,
    } = (req.body);

    const ans6=await booking_expense_header_function(null);

    try{
        await setDoc(doc(db, "expense_header",await randon_doc_id_function()), {
            expense_code,
            date_of_expense,
            date_of_booking,
            total_expense_amount,
            voucher_no,
            voucher_amount,
            expense_name,
            expense_type,
            hostel_id,
            booking_id:ans6,
        });
    }
    
    catch(e){
        res.send("Data not inserted");
        
    }
    res.send("Data Inserted with booking id "+ booking_id);
}


const expense_item = async(req,res)=>{
    const{
        booking_id,
        user_id,
        amount,
    } = (req.body);

    try{
        await setDoc(doc(db, "expense_item",await randon_doc_id_function()), {
            booking_id,
            user_id,
            amount,
        });
    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}





export  {  users ,  expense_item ,  expense_header , allAddressDetails , hostel_registration , student_registration , hostel_tower_reg , hostel_tower_wing_reg , hostel_room_reg , expense}