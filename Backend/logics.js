// All the logics are written over here
import  db from './config.js';
import './config.js';
import {  query, where, getDocs, Timestamp } from "firebase/firestore";
import {collection, addDoc, doc, setDoc , getDoc ,updateDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from './storage.js';
import {orderBy} from "firebase/firestore";
import e from 'express';

const random_doc_id_function = async ()=>{
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
    // console.log(ht_id+globalCount.toString());

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
        console.log(wt_id+globalCount.toString());
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
    const querySnapshot = await getDocs(collection(db, "expense_master"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push([doc.data().expense_code,doc.data().expense_name,doc.data().expense_type,doc.data().expense_type_description]);
        
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
    // const q = query(collection(db, "hostel_registration"),orderBy("created_on","desc"));
    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getDocs(collection(db, "hostel_registration"),orderBy("hostel_name","desc"));
    // console.log(querySnapshot)
    const data1 = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        data1.push(doc.data()); 
    });
    res.send(data1); 
}

const get_all_towers = async(req,res)=>{
    const hostel_id = req.query.hostel_id;
    const querySnapshot = await getDocs(collection(db, "hostel_tower"),where("hostel_id","==",hostel_id),orderBy("resgistered_on","desc"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data()); 
    });
    res.send(data1); 
}

const get_all_wings = async(req,res)=>{
    const tower_id = req.query.tower_id;
    const querySnapshot = await getDocs(collection(db, "hostel_tower_wing"),where("tower_id" , "==" , tower_id),orderBy("registered_on","desc"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data()); 
    });
    res.send(data1); 
}

const get_all_rooms = async(req,res)=>{
    const wing_id = req.query.wing_id;
    const querySnapshot = await getDocs(collection(db, "hostel_room"),where("wing_id" ,"==",wing_id),orderBy("registered_on","desc"));
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data()); 
    });
    res.send(data1); 
}
    

const gethostel_id_where_status_active = async(req,res)=>{
    const q = query(collection(db, "hostel_registration"), where("status", "==", "active"));
    const querySnapshot = await getDocs(q);
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push([doc.data().uuid,doc.data().hostel_name]);
 });

    res.send(data1);
}

const get_tower_id_where_status_active = async(req,res)=>{
    const hostel_id = req.query.hostel_id;
    const q = query(collection(db, "hostel_tower"), where("hostel_id" ,"==", hostel_id, "&&","status", "==", "active"  ));
    const documents = await getDocs(q);
    const data1 = [];
    documents.forEach((doc) => {  
        data1.push([doc.data().tower_id,doc.data().tower_name]);
 });

    res.send(data1);
}
const get_tower_id_where_status_active1 = async(req,res)=>{
    const q = query(collection(db, "hostel_tower"), where("status", "==", "active"  ));
    const documents = await getDocs(q);
    const data1 = [];
    documents.forEach((doc) => {  
        data1.push([doc.data().tower_id,doc.data().tower_name]);
 });

    res.send(data1);
}
const get_wing_id_where_status_active = async(req,res)=>{
    const tower_id = req.query.tower_id;
    const q = query(collection(db, "hostel_tower_wing"), where("tower_id" , "==" ,tower_id ,"&&","status", "==", "active"));
    const querySnapshot = await getDocs(q);
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push([doc.data().wing_id,doc.data().wing_name]);
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

const get_student_form = async(req,res)=>{
    const q = query(collection(db, "student_registration"), orderBy("registered_on","desc"));
    const querySnapshot = await getDocs(q)
    const data1 = [];
    querySnapshot.forEach((doc) => {
        data1.push(doc.data());  
    });
    res.send(data1);
}

const upload_file = async(photo_file) => {
    const metadata = {
        contentType: 'image/jpeg'
    };
    
    const storageRef = ref(storage, 'Student/attachments/photos' + photo_file.name);
    const uploadTask = await uploadBytes(storageRef, photo_file, metadata);
    console.log('Uploaded the file!');

    uploadTask.on('state_changed',
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch(snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
    },
    (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
            console.log('User does not have permission to access the object');
            break;
            case 'storage/canceled':
            console.log('User canceled the upload');
            break;
            case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;

        }
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at' , downloadURL);
        });
    
});
    return uploadTask.snapshot.ref.getDownloadURL();
}


const get_students_for_room_allocation = async(req,res)=>{
    const hostel_id = req.query.hostel_id;
    // console.log(hos  tel_id);
    const q = query(collection(db, "hostel_room"), where("hostel_id","==", hostel_id , "&&" ,"status" ,"==", "active"));
    const q1 = query(collection(db, "student_registration"), where("hostel_name_or_id" ,"==", hostel_id , "&&" , "status", "==", "active"));
    const documents = await getDocs(q);
    const documents1 = await getDocs(q1);
    const data = [];
    const data1 = [];
    
    const data3=[];
    documents.forEach((doc) =>{
        data1.push(doc.data().room_id,doc.data().room_no,doc.data().room_capacity);
    }); 
    documents1.forEach((doc) => {
        const data2 = [];
        data2.push(doc.data().student_id,doc.data().first_name,doc.data().last_name,doc.data().gender,doc.data().category,doc.data().handicapped,doc.data().religon)
        data3.push(data2);
    });
    data.push(data1,data3);
    
    
    res.send(data);
}

const get_room_details_for_room_allocation = async(req,res)=>{
    const hostel_id = req.query.hostel_id;
    const q = query(collection(db, "hostel_room"), where("hostel_id","==", hostel_id , "&&" ,"status" ,"==", "active"));
    const q1 = query(collection(db, "virtual_table_for_room_allocation"), where("hostel_id" ,"==", hostel_id , "&&" , "status", "==", "active"));
    const documents = await getDocs(q);
    const documents1 = await getDocs(q1);
    
   
    const data2 = [];
    documents.forEach((doc) =>{
        data2.push(doc.data().room_id);
    });
    // const data3 = []; 
    // documents1.forEach((doc1) => {
    //     if(doc1.data().pending_capacity>0) data3.push(doc1.data().room_id);
    //     console.log(doc1.data());
    // });
    // console.log(data3);
    

    let myArr=[]
    for(let i=0;i<data2.length;i++){
        let count=false;
        documents1.forEach((doc1) => {
            if(data2[i]==doc1.data().room_id) {
                myArr.push(doc1.data().pending_capacity);
                count=true;
            }
        });
        if(count==false){
            myArr.push(0);
        }
        // console.log(count);
        // myArr.push(count);
    }

    // console.log(myArr);
    const data1 = [];
    let c=0;
    documents.forEach((doc) =>{
        let data2 = {};
        data2["room_id"] = doc.data().room_id,
        data2["room_no"] = doc.data().room_no,
        data2["room_capacity"] = doc.data().room_capacity
        data2["pending_capacity"] = myArr[c];
        data2["room_type"] = doc.data().room_type; 
        // console.log(i);
        data1.push(data2);
        c++;    
    });
    res.send(data1);
}

const get_allocated_students_for_room_allocation = async(req,res)=>{
    const hostel_id = req.query.hostel_id;
    const q = query(collection(db,"student_to_room_allocation"),where("hostel_id","==",hostel_id),where("status","==",""));
    const documents = await getDocs(q);
    let data = {};
    documents.forEach((doc) => {
        // let data1 = {};
        data[doc.data().user_id] = {"room_id":doc.data().room_id, 
                                    "room_no": doc.data().room_no}
    });
    res.send(data);

}

const temporary_api_for_checking_data = async(req,res)=>{
    const data_coming_from_frontend = req.body;
    // console.log(data_coming_from_frontend);
    try{
        const hostel_id = data_coming_from_frontend[2].ans;
        const zeroIndexObjectKeys = Object.keys(data_coming_from_frontend[0]);

        //  query firestore for all the students who are allocated to the hostel
        const q = query(collection(db,"student_to_room_allocation"),where("hostel_id","==",hostel_id),where("status","==",""));
        const documents = await getDocs(q);
        let data = {};
        documents.forEach((doc) => {
            data[doc.data().user_id] = doc.id;
        });



        //loop thorugh the data coming from frontend

        for(let i = 0 ; i < zeroIndexObjectKeys.length ; i++){
            const user_id = zeroIndexObjectKeys[i];
            const roomInfo = data_coming_from_frontend[0][user_id];

            if(data[user_id]){
                //user is already has an allocation
                if(!roomInfo.room_no){
                    // If room_no is missing , update the allocation status
                    const timestamp = Timestamp.now();
                    await updateDoc(doc(db,"student_to_room_allocation",data[user_id]),{
                        status:"x",
                        end_date:timestamp,
                    });
                    // after allcation status is updated , update the pending capacity of the room
                    // 1. query the virtual table for room allocation
                    const q1 = query(collection(db, "virtual_table_for_room_allocation"), where("hostel_id", "==", hostel_id), where("status", "==", "active"));
                    const documents1 = await getDocs(q1);
                    let data1 = {};
                    documents1.forEach((doc) => {
                        data1[doc.data().room_id] = doc.id;
                    });
                    const keys1 = Object.keys(data1);
                    const sencondArrayOfObjects  = data_coming_from_frontend[1];
                    // 2. loop through the second array of objects
                    for(let j = 0 ; j < sencondArrayOfObjects.length ; j++){
                        if(keys1.includes(sencondArrayOfObjects[j].room_id)){
                            // 3. update the pending capacity of the room
                            await updateDoc(doc(db,"virtual_table_for_room_allocation",data1[sencondArrayOfObjects[j].room_id]),{
                                hostel_id:hostel_id,
                                room_id:sencondArrayOfObjects[j].room_id,
                                room_no:sencondArrayOfObjects[j].room_no,
                                room_capacity:sencondArrayOfObjects[j].room_capacity,
                                pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                                status:"active",
                            });
                            
                        }
                        // 4. if the room_id is not present in the virtual table for room allocation
                        else{
                            // 5. create a new entry in the virtual table for room allocation
                            await setDoc(doc(db,"virtual_table_for_room_allocation",await random_doc_id_function()),{
                                hostel_id:hostel_id,
                                room_id:sencondArrayOfObjects[j].room_id,
                                room_no:sencondArrayOfObjects[j].room_no,
                                room_capacity:sencondArrayOfObjects[j].room_capacity,
                                pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                                status:"active",
                            });
                        }
                    }
                    
                }
                else{
                    // first will check if the room_no is same as the existing allocation
                    const existingRoomNo = (await getDoc(doc(db,"student_to_room_allocation",data[user_id]))).data().room_no;
                    // update an allocation with new room info
                    if(existingRoomNo != roomInfo.room_no){
                        
                        //  1. update the existing allocation with status x and end_date
                        const timestamp = Timestamp.now(); 
                        await updateDoc(doc(db,"student_to_room_allocation",data[user_id]),{
                            // room_id:roomInfo.room_id,
                            // room_no:roomInfo.room_no,
                            status:"x",
                            end_date:timestamp,
                            // start_data:"start",
                            // user_id:user_id,
                        });
                        
                        //  2. create a new allocation with the new room info
                        
                        await setDoc(doc(db,"student_to_room_allocation",await random_doc_id_function()),{
                            hostel_id:hostel_id,
                            room_id:roomInfo.room_id,
                            room_no:roomInfo.room_no,
                            status:"",
                            end_date:"",
                            start_date:timestamp,
                            user_id:user_id,
                        });
                        
                        // 3. update the pending capacity of the room
                        // 1. query the virtual table for room allocation
                        const q1 = query(collection(db, "virtual_table_for_room_allocation"), where("hostel_id", "==", hostel_id), where("status", "==", "active"));
                        const documents1 = await getDocs(q1);
                        let data1 = {};
                        documents1.forEach((doc) => {
                            data1[doc.data().room_id] = doc.id;
                        });
                        const keys1 = Object.keys(data1);
                        const sencondArrayOfObjects  = data_coming_from_frontend[1];
                        // 2. loop through the second array of objects
                        for(let j = 0 ; j < sencondArrayOfObjects.length ; j++){
                            if(keys1.includes(sencondArrayOfObjects[j].room_id)){
                                // 3. update the pending capacity of the room
                                await updateDoc(doc(db,"virtual_table_for_room_allocation",data1[sencondArrayOfObjects[j].room_id]),{
                                    hostel_id:hostel_id,
                                    room_id:sencondArrayOfObjects[j].room_id,
                                    room_no:sencondArrayOfObjects[j].room_no,
                                    room_capacity:sencondArrayOfObjects[j].room_capacity,
                                    pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                                    status:"active",
                                });
                            }
                            // 4. if the room_id is not present in the virtual table for room allocation
                            else{
                                // 5. create a new entry in the virtual table for room allocation
                                await setDoc(doc(db,"virtual_table_for_room_allocation",await random_doc_id_function()),{
                                    hostel_id:hostel_id,
                                    room_id:sencondArrayOfObjects[j].room_id,
                                    room_no:sencondArrayOfObjects[j].room_no,
                                    room_capacity:sencondArrayOfObjects[j].room_capacity,
                                    pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                                    status:"active",
                                });
                            }
                        }
                        
                    } 
                    // res.send("Room Allcation Done for this Transaction")
                    
                    
                }
            }
            else{
                // User doesn't have an existing allocation, create a new one
                const timestamp = Timestamp.now();
                await setDoc(doc(db,"student_to_room_allocation", await random_doc_id_function()),{
                    hostel_id:hostel_id,
                    room_id:roomInfo.room_id,
                    room_no:roomInfo.room_no,
                    status:"",
                    end_date:"",
                    start_date:timestamp,
                    user_id:user_id,
                });
                
                // 3. update the pending capacity of the room
                // 1. query the virtual table for room allocation
                const q1 = query(collection(db, "virtual_table_for_room_allocation"), where("hostel_id", "==", hostel_id), where("status", "==", "active"));
                const documents1 = await getDocs(q1);
                let data1 = {};
                documents1.forEach((doc) => {
                    data1[doc.data().room_id] = doc.id;
                });
                
                const keys1 = Object.keys(data1);
                const sencondArrayOfObjects  = data_coming_from_frontend[1];
                // 2. loop through the second array of objects
                for(let j = 0 ; j < sencondArrayOfObjects.length ; j++){
                    if(keys1.includes(sencondArrayOfObjects[j].room_id)){
                        // 3. update the pending capacity of the room
                        await updateDoc(doc(db,"virtual_table_for_room_allocation",data1[sencondArrayOfObjects[j].room_id]),{
                            hostel_id:hostel_id,
                            room_id:sencondArrayOfObjects[j].room_id,
                            room_no:sencondArrayOfObjects[j].room_no,
                            room_capacity:sencondArrayOfObjects[j].room_capacity,
                            pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                            status:"active",
                        });
                    }
                    // 4. if the room_id is not present in the virtual table for room allocation
                    else{
                        // 5. create a new entry in the virtual table for room allocation
                        await setDoc(doc(db,"virtual_table_for_room_allocation",await random_doc_id_function()),{
                            hostel_id:hostel_id,
                            room_id:sencondArrayOfObjects[j].room_id,
                            room_no:sencondArrayOfObjects[j].room_no,
                            room_capacity:sencondArrayOfObjects[j].room_capacity,
                            pending_capacity:sencondArrayOfObjects[j].pending_capacity,
                            status:"active",
                        });
                    }
                }

            }
            // res.send("Room Allcation Done for this Transaction")
        } 
        
        
        
    }
    catch(e){
        console.log(e);
    }
    
    res.send("Room Allcation Done for this Transaction")
    
}


export  {get_all_towers,get_all_wings,get_all_rooms,get_tower_id_where_status_active1,temporary_api_for_checking_data,get_allocated_students_for_room_allocation,get_room_details_for_room_allocation,get_wing_id_where_status_active,get_tower_id_where_status_active,get_students_for_room_allocation,upload_file,get_student_form,get_status,status_of_hostel_block,status_of_hostel_active,gethostel_id_where_status_active,saved_data_from_hostel_registration,expense_flow_code_count,hostel_flow_code_count,process_id_to_process_description_count, get_expense_code_expense_name_expense_type, rector_id_to_hostel_id, hostel_id_to_studentname , random_doc_id_function, booking_expense_header_function,UUIDFunction , studentIdFunction, tower_id_function, wing_id_function, room_id_function , expense_id_function};