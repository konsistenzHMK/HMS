// All the logics are written over here
import  db from './config.js';
import './config.js';
import {  query, where, getDocs } from "firebase/firestore";
import {collection, addDoc, doc, setDoc , getDoc ,updateDoc} from "firebase/firestore";

const randon_doc_id_function = async ()=>{
    var randomNumber = '';
  for (var i = 0; i < 30; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}


const UUIDFunction= async (country,state,district)=>{     
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
    
    const no_of_zeros_to_append = 10 - (id_string.length);
    console.log(no_of_zeros_to_append);
    const zeros = "0".repeat(no_of_zeros_to_append);

    const new_id = zeros + id_string;
    
// console.log(new_id);
    return new_id;
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
    // console.log(docSnap.data().number);

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

const booking_expense_header_function = async ()=>{
    const docRef = doc(db, "booking_expense_header", "KdWo5gUgaeM0joclf9E1");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().number);

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


const hostel_id_to_studentname = async(req,res)=>{
    const q = query(collection(db, "student_registration"), where("hostel_id", "==", "INMAMU00006"));
    const documents = await getDocs(q);
    const names = [];

    documents.forEach((doc) => {
        names.push(doc.data().first_name+" "+doc.data().last_name);
     });

    res.send(names);
    
}


const rector_id_to_hostel_id = async(req,res)=>{

    const q = query(collection(db, "hostel_registration"), where("rector_id", "==", "1234"));
    const documents = await getDocs(q);
    
    documents.forEach((doc) => {
        res.send(doc.data().uuid);
      });

    
 
}


const get_expense_code_expense_name_expense_type = async(req,res)=>{
    const querySnapshot = await getDocs(collection(db, "expense"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data()); 
    });
    res.send(data1);

}


const process_id_to_process_description_count = async(req,res)=>{
    const docRef = doc(db, "process_id_to_process_description_count", "11ILICM5WUrgnF2Oo2iA");
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
    if(id_string.length<6){

    const no_of_zeros_to_append = 6 - id_string.length;

    const zeros = "0".repeat(no_of_zeros_to_append);

    id = zeros + id_string;
    }
    return id;

}

const hostel_flow_code_count = async(req,res)=>{
    const docRef = doc(db, "hostel_flow_code_count", "to4zujygJ61kRE85DEsr");
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
    if(id_string.length<3){

    const no_of_zeros_to_append = 3 - id_string.length;

    const zeros = "0".repeat(no_of_zeros_to_append);
    let num = parseInt(id_string);
    num = num + 1;
    let ans = String(num).padStart(id_string.length, "0");

    id = "01" + zeros + ans;
    }
    return id;
}

const expense_flow_code_count = async(req,res)=>{
    const docRef = doc(db, "expense_flow_code_count", "CCOauFCgTIkRqdNuau0r");
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
    if(id_string.length<3){

    const no_of_zeros_to_append = 3 - id_string.length;

    const zeros = "0".repeat(no_of_zeros_to_append);
    let num = parseInt(id_string);
    num = num + 1;
    let ans = String(num).padStart(id_string.length, "0");

    id = "02" + zeros + ans;
    }
    return id;
}

const saved_data_from_hostel_registration = async(req,res)=>{
    const querySnapshot = await getDocs(collection(db, "hostel_registration"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data()); 
    });
    res.send(data1);
}
    

const gethostel_id_where_status_active = async(req,res)=>{
    const querySnapshot = await getDocs(collection(db, "hostel_registration") , where("status", "==", "active"));
    const data1 = [];
    const data2 = [];
    const data3 = [];

    querySnapshot.forEach((doc) => {
        data3.push(doc.data().uuid);
        data2.push(doc.data().hostel_name);
        data3.push(...data2)
        data1.push(data3);
        });

    res.send(data1);
}

const status_of_hostel_active = async(req,res)=>{
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
        uuid,
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
        email_id,
        website,
        status
        // rector_id, 
    } = (req.body);

    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    // const documents = await getDocs(q);
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });

    const keys = Object.keys(data2);
    for( let i = 0;i<= keys.length;i++){
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db,"hostel_registration",data2[uuid])
                await updateDoc(docRef,{
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
                    uuid,
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
                    status: "Active",
                    email_id,
                    website,
                    // rector_id
                }); 
            }  
            catch(e){
                res.send("Data not inserted");
            }
            res.send(" Approval with id " + uuid + "\n Status : Active");
        }

    }


}


const status_of_hostel_block = async(req,res)=>{
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
        uuid,
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
        email_id,
        website,
        status
        // rector_id, 
    } = (req.body);

    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    // const documents = await getDocs(q);
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });

    const keys = Object.keys(data2);
    for( let i = 0;i<= keys.length;i++){
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db,"hostel_registration",data2[uuid])
                await updateDoc(docRef,{
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
                    uuid,
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
                    status: "Block",
                    email_id,
                    website,
                    // rector_id
                }); 
            }  
            catch(e){
                res.send("Data not inserted");
            }
            res.send(" Denied with id " + uuid + "\n Status : Block");
        }

    }


}


const get_status = async(req,res)=>{
    // const querySnapshot = await getDocs(collection(db, "status_transition"));
    // const data1 = [];
    // querySnapshot.forEach((doc) => {
    //     data1.push(1);  
    // });
    // res.send(data1);
    const docRef = doc(db, "status_transition", "one");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        res.send(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        res.send("No such document!");
      }
}


export  {get_status,status_of_hostel_block,status_of_hostel_active,gethostel_id_where_status_active,saved_data_from_hostel_registration,expense_flow_code_count,hostel_flow_code_count,process_id_to_process_description_count, get_expense_code_expense_name_expense_type, rector_id_to_hostel_id, hostel_id_to_studentname , randon_doc_id_function, booking_expense_header_function,UUIDFunction , studentIdFunction, tower_id_function, wing_id_function, room_id_function , expense_id_function};