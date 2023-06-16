import express from 'express';
import bodyParser from 'body-parser';
import  db from './config.js';
import './config.js';
import { addDoc, doc, setDoc,getDoc ,updateDoc} from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';
// import {UUIDFunction,studentIdFunction,tower_id_function,wing_id_function,room_id_function} from './logics.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/allAddressDetails', async(req,res)=>{
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
});



const UUIDFunction= async (country,state,district)=>{       //by Shubham
    let cs_id=country[0].toUpperCase() + country[1].toUpperCase();
    const stateCount=state.split(' ');
    if(stateCount.length==1){
        cs_id=cs_id+state[0].toUpperCase() + state[1].toUpperCase();
    }
    else{
        cs_id=cs_id+stateCount.map((item) => item[0]).join('');
    }
    cs_id=cs_id+district[0].toUpperCase() + district[1].toUpperCase();
    // console.log(cs_id);

    const docRef = doc(db, "idMap", cs_id);
    const docSnap = await getDoc(docRef);
    
    let GlobalCount=0;
    if (docSnap.exists()) {
        const value=docSnap.data().value;
        try{
            await updateDoc(docRef,{
                value:value+1
            });
        }
        catch(e){
            console.log("error",e);
        }
        GlobalCount= value+1;
    } else {
        try{
            await setDoc(doc(db, "idMap",cs_id), {
                value:1
            })
        }
        catch(e){
            console.log("error",e);
        }
        GlobalCount=1;
    }
    const id_string = GlobalCount.toString();
    
    const no_of_zeros_to_append = 5 - id_string.length;
    
    const zeros = "0".repeat(no_of_zeros_to_append);
    
    GlobalCount = zeros + id_string;

    return cs_id+GlobalCount.toString()
}

// const studentId= async ()=>{

// }

const studentIdFunction= async ()=>{
    const docRef = doc(db, "studentID", "IqhP1VdqqC0iz0kkj2WN");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().number);

    const id=docSnap.data().number;
    try{
        await updateDoc(docRef,{
            number:id+1
        });
    }
    catch(e){
        console.log("error",e);
    }

    const id_string = id.toString();
    
    const no_of_zeros_to_append = 10 - id_string.length;
    
    const zeros = "0".repeat(no_of_zeros_to_append);
    
    id = zeros + id_string;


    return id.toString();
}


const tower_id_function= async (hostel_id)=>{
   const ht_id = hostel_id;
    const docRef = doc(db, "tower_no", ht_id);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().value);

    let globalCount=0;
    if (docSnap.exists()) {
        const value=docSnap.data().value;
        try{
            await updateDoc(docRef,{
                value:value+1
            });
        }
        catch(e){
            console.log("error",e);
        }
        globalCount= value+1;
    } else {
        try{
            await setDoc(doc(db, "tower_no",ht_id), {
                value:1
            })
        }
        catch(e){
            console.log("error",e);
        }
        globalCount=1;
    }

    const id_string = globalCount.toString();
    if(id_string.length<2){
    const no_of_zeros_to_append = 2 - id_string.length;
    
    const zeros = "0".repeat(no_of_zeros_to_append);
    
    globalCount = zeros + id_string;
    }

    return ht_id+globalCount.toString();
}
   

const wing_id_function= async (tower_id)=>{
    const wt_id = tower_id;
        const docRef = doc(db, "wing_no", wt_id);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data().value);

        let globalCount=0;
        if (docSnap.exists()) {
            const value=docSnap.data().value;
            try{
                await updateDoc(docRef,{
                    value:value+1
                });
            }
            catch(e){
                console.log("error",e);
            }
            globalCount= value+1;
        } else {
            try{
                await setDoc(doc(db, "wing_no",wt_id), {
                    value:1
                })
            }
            catch(e){
                console.log("error",e);
            }
            globalCount=1;
        }


        const id_string = globalCount.toString();
        if(id_string.length<2){
            const no_of_zeros_to_append = 2 - id_string.length;

            const zeros = "0".repeat(no_of_zeros_to_append);

            globalCount = zeros + id_string;
        }

        return wt_id+globalCount.toString();

    }


const room_id_function= async (hostel_id , room_no)=>{ 
    const r_id = hostel_id;
    const docRef = doc(db, "room_no", r_id);
    const docSnap = await getDoc(docRef);

    let globalCount=0;
    if (docSnap.exists()) {
        const value=docSnap.data().value;
        try{
            await updateDoc(docRef,{
                value:value+1
            });
        }
        catch(e){
            console.log("error",e);
        }
        globalCount= value+1;
    }
    else {
        try{
            await setDoc(doc(db, "room_no",r_id), {
                value:1
            })
        }
        catch(e){
            console.log("error",e);
        }
        globalCount=1;
    }

    const id_string = globalCount.toString();
    if(id_string.length<4){
        const no_of_zeros_to_append = 4 - id_string.length;

        const zeros = "0".repeat(no_of_zeros_to_append);

        globalCount = zeros + id_string;

    }


    return r_id+globalCount+room_no.toString();
}    

const expense_id_function= async ()=>{
    const docRef = doc(db, "no_of_expense", "pyb1GeVP6XFEiUDDzNmm");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().number);

    let id=docSnap.data().number;
    try{
        await updateDoc(docRef,{
            number:id+1
        });
    }
    catch(e){
        console.log("error",e);
    }

    const id_string = id.toString();
    if(id_string.length<4){

    const no_of_zeros_to_append = 4 - id_string.length;

    const zeros = "0".repeat(no_of_zeros_to_append);

    id = zeros + id_string;
    }
    return id;
}

app.post('/hostel/registration', async(req,res)=>{
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
        website
    } = (req.body);

    const ans=await UUIDFunction(country,state,district);
    console.log(ans);
    try{
        await setDoc(doc(db, "hostel_registration",uuidv4()), {
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
            website
        });
    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id " + ans);
})

// will be done by rector
app.post('/student/registration', async(req,res)=>{
    const { 
        first_name,
        last_name,
        father_name,
        temporary_address,
        permanent_address,
        relative_address,
        cllg_address,
        // student_id,
        aadhar_id,
        dob,
        height,
        blood_group,
        medical_history,
        medicine_taken,
        birth_mark,
        handicapped,
        handicapped_percentage,
        handicapped_type,
        personal_mobile,
        parent_mobile,
        teacher_mobile,
        emergency_contact,
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
    } = (req.body);

const ans1 = await studentIdFunction(null);

try
{
    await setDoc(doc(db, "student_registration",uuidv4()), {
        first_name,
        last_name,
        father_name,
        temporary_address,
        permanent_address,
        relative_address,
        cllg_address,
        aadhar_id,
        dob,
        height,
        blood_group,
        medical_history,
        medicine_taken,
        birth_mark,
        handicapped,
        handicapped_percentage,
        handicapped_type,
        personal_mobile,
        parent_mobile,
        teacher_mobile,
        emergency_contact,
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

});


app.post("/hostel/tower",async(req,res)=>{
    const { 
        hostel_id,
        tower_name,
        // tower_no,
        // no_floors,
        no_rooms,
        capacity,
        // description,
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
            // tower_no,
            // no_floors,
            no_rooms,
            capacity,
            // description,
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


});



app.post("/hostel/tower/wing",async(req,res)=>{
    const {
        tower_id,
        wing_name,
        no_rooms,
        capacity,
        total_area,
        other_facilities,
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
            type,
            status,
            wing_id:ans3,
        });

    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id "+ans3);
});



app.post("/hostel/room",async(req,res)=>{
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
        await setDoc(doc(db, "hostel_room",uuidv4()), {
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

});

app.post("/expense",async(req,res)=>{
    const{
        expense_name,
        expense_type,
        status
    } = (req.body);

    const ans5=await expense_id_function(null);
    console.log(ans5);
    let str = ans5;
    let num = parseInt(str);
    num = num + 1;
    str = String(num).padStart(str.length, "0");

    try{
        await setDoc(doc(db, "expense",uuidv4()), {
            expense_name,
            expense_type,
            status,
            expense_code:str,

        });
    }
    catch(e){
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id "+str);

});



app.listen(7000, () => {
    console.log('Server is running on port 7000');
});