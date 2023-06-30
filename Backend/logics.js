// All the logics are written over here
import  db from './config.js';
import './config.js';
import { addDoc, doc, setDoc,getDoc ,updateDoc} from "firebase/firestore";

import {v4 as uuidv4} from 'uuid';


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


export  { UUIDFunction, studentIdFunction, tower_id_function, wing_id_function, room_id_function , expense_id_function};