import db from './config.js';
import './config.js';
import { Timestamp } from 'firebase/firestore';
import auth from './auth.js';
import './auth.js'
import storage from './storage.js';
import './storage.js';
import { query, where, getDocs } from "firebase/firestore";
import { collection, addDoc, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {upload_file,expense_flow_code_count, hostel_flow_code_count, random_doc_id_function, booking_expense_header_function, UUIDFunction, studentIdFunction, tower_id_function, wing_id_function, room_id_function, expense_id_function, process_id_to_process_description_count } from './logics.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const users = async (req, res) => {
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

    createUserWithEmailAndPassword(auth, email_id, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // res.send("User Created");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // res.send("User not Created");
        });



    try {
        await setDoc(doc(db, "users", await random_doc_id_function()), {
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
    catch (e) {
        res.send("Data not inserted " + e);
    }
    res.send("Data Inserted");
}




const allAddressDetails = async (req, res) => {
    const obj = {
        "Maharashtra": [
            { value: 'Desh', label: 'Desh' },
            { value: 'Vidarbha', label: 'Vidarbha (Varhad)' },
            { value: 'Marathwada', label: 'Marathwada' },
            { value: 'Vidarbha', label: 'Vidarbha' },
            { value: 'Khandesh', label: 'North Maharashtra (Khandesh)' },
            { value: 'Konkan', label: 'Konkan' },
        ],
        "Desh": [
            { value: 'Sangli', label: 'Sangli' },
            { value: 'Satara', label: 'Satara' },
            { value: 'Solapur', label: 'Solapur' },
            { value: 'Kolhapur', label: 'Kolhapur' },
            { value: 'Pune', label: 'Pune' },
        ],
        "Vidarbha": [
            { value: 'Akola', label: 'Akola' },
            { value: 'Amravati', label: 'Amravati' },
            { value: 'Buldhana', label: 'Buldhana' },
            { value: 'Yavatmal', label: 'Yavatmal' },
            { value: 'Washim', label: 'Washim' },
        ],
        "Marathwada": [
            { value: 'Aurangabad', label: 'Aurangabad' },
            { value: 'Beed', label: 'Beed' },
            { value: 'Jalna', label: 'Jalna' },
            { value: 'Osmanabad', label: 'Osmanabad' },
            { value: 'Nanded', label: 'Nanded' },
            { value: 'Latur', label: 'Latur' },
            { value: 'Parbhani', label: 'Parbhani' },
            { value: 'Hingoli', label: 'Hingoli' },
        ],
        "Vidarbha": [
            { value: 'Bhandara', label: 'Bhandara' },
            { value: 'Chandrapur', label: 'Chandrapur' },
            { value: 'Gadchiroli', label: 'Gadchiroli' },
            { value: 'Gondia', label: 'Gondia' },
            { value: 'Nagpur', label: 'Nagpur' },
            { value: 'Wardha', label: 'Wardha' },
        ],
        "Khandesh": [
            { value: 'Ahmednagar', label: 'Ahmednagar' },
            { value: 'Dhule', label: 'Dhule' },
            { value: 'Jalgaon', label: 'Jalgaon' },
            { value: 'Nandurbar', label: 'Nandurbar' },
            { value: 'Nashik', label: 'Nashik' },
        ],
        "Konkan": [
            { value: 'Mumbai City', label: 'Mumbai City' },
            { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
            { value: 'Thane', label: 'Thane' },
            { value: 'Palghar', label: 'Palghar' },
            { value: 'Raigad', label: 'Raigad' },
            { value: 'Ratnagiri', label: 'Ratnagiri' },
            { value: 'Sindhudurg', label: 'Sindhudurg' }
        ],
    }
    res.send(obj);
}






const hostel_registration = async (req, res) => {
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
        // rector_id, 
    } = (req.body);

    const q = query(collection(db, "hostel_registration"), where("status", "==", "Draft"));
    const data2 = {};
    const documents = await getDocs(q);
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });

    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "Pending",
                    email_id,
                    website,
                    // rector_id
                });
            }
            catch (e) {
                res.send("Data not inserted");
            }
            res.send("Sent for Approval with id " + uuid + "\n Status : Pending for Approval");
        }

    }


    if (uuid == null || uuid == undefined || uuid == "") {

        const ans = await UUIDFunction(country, state, district);
        console.log(ans);
        try {
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "Pending",
                email_id,
                website,
                // rector_id
            });
        }
        catch (e) {
            res.send("Data not inserted");
        }
        res.send("Sent for Approval with id " + ans + "\n Status : Pending for Approval");
    }

}


const saved_form_1 = async (req, res) => {
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
    } = req.body
   const timestamp = Timestamp.now();
//    console.log(timestamp);
    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    const keys = Object.keys(data2);
    if (uuid == null || uuid == undefined || uuid == "") {
        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "draft",
                email_id,
                website,
                created_on: timestamp.valueOf(),
            });
            // console.log(timestamp.valueOf());
            const message = 'Saved with id ' + ans + '\n Status : Draft';
            res.send(message);
        }
        catch (e) {
            console.log(e);
            res.status(500).send("Data not inserted");
        }
    }else{
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "draft",
                    email_id,
                    website,
                    created_on: timestamp.valueOf(),
                });
                const message = 'Updated with id ' + uuid + '\n Status : Draft';
                res.send(message);
            } catch (error) {
                console.log(error);
                res.status(500).send("Data not Updated");
            }
        }
    }

    }
    
};
const saved_form_2 = async (req, res) => {
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
    } = req.body


    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    if (uuid == null || uuid == undefined || uuid == "") {

        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "pending",
                email_id,
                website,
            });

            const message = 'Saved with id ' + ans + '\n Status : Pending for Approval';
            res.send(message);
            return;
        }
        catch (e) {
            console.log(e);
            res.status(500).send("Data not inserted");
        }
    }
    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "pending",
                    email_id,
                    website,
                });
                const message = 'Updated with id ' + uuid + '\n Status : Pending for Approval';
                res.send(message);
            } catch (error) {
                console.log(error);
                res.status(500).send("Data not Updated");
            }
        }
    }
};
const saved_form_3 = async (req, res) => {
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
    } = req.body


    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "active",
                    email_id,
                    website,
                });
                const message = 'Updated with id ' + uuid + '\n Status : Active';
                res.send(message);
            } catch (error) {
                res.status(500).send("Data not Updated");
            }
        }

    }
    if (uuid == null || uuid == undefined || uuid == "") {

        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "active",
                email_id,
                website,
            });

            const message = 'Saved with id ' + ans + '\n Status : Active';
            res.send(message);
        }
        catch (e) {
            res.status(500).send("Data not inserted");
        }
    }

};
const saved_form_4 = async (req, res) => {
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
    } = req.body


    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "draft",
                    email_id,
                    website,
                });
                const message = 'Updated with id ' + uuid + '\n Status : Draft';
                res.send(message);
            } catch (error) {
                res.status(500).send("Data not Updated");
            }
        }

    }
    if (uuid == null || uuid == undefined || uuid == "") {

        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "draft",
                email_id,
                website,
            });

            const message = 'Saved with id ' + ans + '\n Status : Draft';
            res.send(message);
        }
        catch (e) {
            res.status(500).send("Data not inserted");
        }
    }

};
const saved_form_5 = async (req, res) => {
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
    } = req.body


    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "block",
                    email_id,
                    website,
                });
                const message = 'Updated with id ' + uuid + '\n Status : Block';
                res.send(message);
            } catch (error) {
                res.status(500).send("Data not Updated");
            }
        }

    }
    if (uuid == null || uuid == undefined || uuid == "") {

        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "block",
                email_id,
                website,
            });

            const message = 'Saved with id ' + ans + '\n Status : Block';
            res.send(message);
        }
        catch (e) {
            res.status(500).send("Data not inserted");
        }
    }

};
const saved_form_6 = async (req, res) => {
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
    } = req.body


    const documents = await getDocs(collection(db, "hostel_registration"));
    const data2 = {};
    documents.forEach((doc) => {
        data2[doc.data().uuid] = doc.id;
    });
    const keys = Object.keys(data2);
    for (let i = 0; i <= keys.length; i++) {
        if (uuid == keys[i]) {
            try {
                const docRef = doc(db, "hostel_registration", data2[uuid])
                await updateDoc(docRef, {
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
                    status: "del",
                    email_id,
                    website,
                });
                const message = 'Updated with id ' + uuid + '\n Status : Deleted';
                res.send(message);
            } catch (error) {
                res.status(500).send("Data not Updated");
            }
        }

    }
    if (uuid == null || uuid == undefined || uuid == "") {

        try {
            const ans = await UUIDFunction(country, state, district);
            await setDoc(doc(db, "hostel_registration", await random_doc_id_function()), {
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
                uuid: ans,
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
                status: "del",
                email_id,
                website,
            });

            const message = 'Saved with id ' + ans + '\n Status : Deleted';
            res.send(message);
        }
        catch (e) {
            res.status(500).send("Data not inserted");
        }
    }

};

// will be done by rector
const student_registration = async (req, res) => {
    const {
        first_name,
        last_name,
        father_name,
        mother_name,
        address1,
        address2,
        country,
        state,
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
        orphan,
        personal_mobile,
        parent_mobile,
        teacher_mobile,
        personal_email,
        parent_email,
        teacher_email,
        collage_name,
        principle_name,
        religon,
        category,
        income,
        college_address1,
        college_address2,
        photo_file,
        aadhar_file,
        caste_file,
        medical_file,
        income_cer,
        bank_details,
        account_holder_name,
        bank_name,
        ifsc,
        account_number,
        hostel_name_or_id,
        status,
        student_id,
    } = (req.body);

    const timestamp = Timestamp.now();

    const documents = await getDocs(collection(db, "student_registration"));
    const data2 = {};
    // const data3 = [];
    documents.forEach((doc) => {
        data2[doc.data().student_id] = doc.id;
        // data3.push(doc.data().aadhar_id);
        // data3[doc.data().aadhar_id] = doc.data().student_id;
    });
    // console.log("running");
    // const keys4 = Object.keys(data3);
    // for(let i=0;i<data3.length;i++){
    //     if(data3[i]==aadhar_id){
    //         res.send("User already exists");
    //         return;
    //     }
    // }

    const keys = Object.keys(data2);
    for (let i = 0; i < keys.length; i++) {
        if (student_id == keys[i]) {
            try {
                const docRef = doc(db, "student_registration", data2[student_id])
                await updateDoc(docRef, {
                    first_name,
                    last_name,
                    father_name,
                    mother_name,
                    address1,
                    address2,
                    country,
                    state,
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
                    orphan,
                    personal_mobile,
                    parent_mobile,
                    teacher_mobile,
                    personal_email,
                    parent_email,
                    teacher_email,
                    collage_name,
                    principle_name,
                    religon,
                    category,
                    income,
                    college_address1,
                    college_address2,
                    photo_file,
                    aadhar_file,
                    caste_file,
                    medical_file,
                    income_cer,
                    bank_details,
                    account_holder_name,
                    bank_name,
                    ifsc,
                    account_number,
                    hostel_name_or_id,
                    status,
                    student_id,
                    registered_on: timestamp.valueOf(),
                });
                const message = 'Updated with id ' + student_id;
                res.send(message);
            } catch (error) {
                console.log(error);
                res.status(500).send("Data not Updated");
            }
        }

    }


    if (student_id == null || student_id == undefined || student_id == "") {

        const documents = await getDocs(collection(db, "student_registration"));
        const data3 =[] ;
        documents.forEach((doc) => {
            data3.push(doc.data().aadhar_id);
            // data3[doc.data().aadhar_id] = doc.data().student_id;
        });

        // const keys4 = Object.keys(data3);
        for(let i=0;i<data3.length;i++){
            if(data3[i]==aadhar_id){
                res.send("User already exists");
                return;
            }
        }

        
        const ans1 = await studentIdFunction(null);
        let str = ans1;
        let num = parseInt(str);
        num = num + 1;
        str = String(num).padStart(str.length, "0");
        console.log(str);
        // const url = await upload_file(photo_file);
        // console.log(url);

        try {
            await setDoc(doc(db, "student_registration", await random_doc_id_function()), {
                first_name,
                last_name,
                father_name,
                mother_name,
                address1,
                address2,
                country,
                state,
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
                orphan,
                personal_mobile,
                parent_mobile,
                teacher_mobile,
                personal_email,
                parent_email,
                teacher_email,
                collage_name,
                principle_name,
                religon,
                category,
                income,
                college_address1,
                college_address2,
                photo_file,
                aadhar_file,
                caste_file,
                medical_file,
                income_cer,
                bank_details,
                account_holder_name,
                bank_name,
                ifsc,
                account_number,
                hostel_name_or_id,
                status,
                student_id: str,
                registered_on: timestamp.valueOf(),
            });
        }

        catch (e) {
            console.log(e);
            res.send(e);
        }
        res.send("Data Inserted with id " + str);

    }
}



const hostel_tower_reg = async (req, res) => {
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
    } = (req.body);

    const ans2 = await tower_id_function(hostel_id);

    try {
        await setDoc(doc(db, "hostel_tower",  await random_doc_id_function()), {
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
    catch (e) {
        res.send("Data not inserted " + e);
    }
    res.send("Data Inserted id " +ans2);


}
const hostel_tower_wing = async (req, res) => {
    const {
        tower_id,
        wing_name,
        no_rooms,
        capacity,
        total_area,
        other_facilities, 
        type,
        status,
    } = (req.body);

    const ans3 = await wing_id_function(tower_id);

    try {
        await setDoc(doc(db, "hostel_tower_wing",  await random_doc_id_function()), {
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
    catch (e) {
        res.send("Data not inserted " + e);
    }
    res.send("Data Inserted with  id " +ans3);


} 

const hostel_room_reg = async (req, res) => {
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
        facility_list,
        room_status,
        room_furniture,
    } = (req.body);

    const ans4 = await room_id_function(hostel_id, room_no);

    try {
        await setDoc(doc(db, "hostel_room", await random_doc_id_function()), {
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
            facility_list,
            room_status,
            room_furniture,
            room_id: ans4,
        });
    }

    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id " + ans4);

}

const expense = async (req, res) => {
    const {
        expense_name,
        expense_type,
        // status
    } = (req.body);

    const ans5 = await expense_id_function(null);
    console.log(ans5);
    let str = ans5;
    let num = parseInt(str);
    num = num + 1;
    str = String(num).padStart(str.length, "0");

    try {
        await setDoc(doc(db, "expense", await random_doc_id_function()), {
            expense_name,
            expense_type,
            // status,
            expense_code: str,

        });
    }
    catch (e) {
        res.send("Data not inserted" + e);
    }
    res.send("Data Inserted with id " + str);

}

const expense_type = async (req, res) => {
    const {
        expense_type,
        expense_type_description,
        expense_category,
    } = (req.body);

    try {
        await setDoc(doc(db, "expense_type", await random_doc_id_function()), {
            expense_type,
            expense_type_description,
            expense_category,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}


const expense_header = async (req, res) => {
    const {
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

    const ans6 = await booking_expense_header_function(null);

    try {
        await setDoc(doc(db, "expense_header", await random_doc_id_function()), {
            expense_code,
            date_of_expense,
            date_of_booking,
            total_expense_amount,
            voucher_no,
            voucher_amount,
            expense_name,
            expense_type,
            hostel_id,
            booking_id: ans6,
        });
    }

    catch (e) {
        res.send("Data not inserted");

    }
    res.send("Data Inserted with booking id " + ans6);
}


const expense_item = async (req, res) => {
    const {
        booking_id,
        user_id,
        amount,
    } = (req.body);

    try {
        await setDoc(doc(db, "expense_item", await random_doc_id_function()), {
            booking_id,
            user_id,
            amount,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}


const role_reference = async (req, res) => {
    const {
        role_name,
        role_description,
    } = (req.body);

    try {
        await setDoc(doc(db, "role_reference", await random_doc_id_function()), {
            role_name,
            role_description,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");

}

const user_role_management = async (req, res) => {
    const {
        user_id,
        role_name,
    } = (req.body);

    try {
        await setDoc(doc(db, "user_role_management", await random_doc_id_function()), {
            user_id,
            role_name,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}

const role_to_process_mapping = async (req, res) => {
    const {
        role_name,
        process_name,
    } = (req.body);

    try {
        await setDoc(doc(db, "role_to_process_mapping", await random_doc_id_function()), {
            role_name,
            process_name,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}

const process_id_to_process_description = async (req, res) => {
    const {
        process_name,
    } = (req.body);

    const ans7 = await process_id_to_process_description_count();
    // console.log(ans7);
    let num = parseInt(ans7);
    num = num + 1;
    let ans = String(num).padStart(ans7.length, "0");
    try {
        await setDoc(doc(db, "process_id_to_process_description", await random_doc_id_function()), {
            process_name,
            process_id: (ans)
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted with id " + ans);
}

const flow_table_for_hostel = async (req, res) => {

    const {
        state,
        region,
        district,
        category,
    } = (req.body);

    const ans8 = await hostel_flow_code_count();

    try {
        await setDoc(doc(db, "flow_table_for_hostel", await random_doc_id_function()), {
            state,
            region,
            district,
            category,
            hostel_flow_code: ans8,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted " + ans8);

}


const flow_table_for_expense = async (req, res) => {
    const {
        district,
        hostel_id,
        expense_type,
        amount_from,
        amount_to,
    } = (req.body);

    const ans9 = await expense_flow_code_count();

    try {
        await setDoc(doc(db, "flow_table_for_expense", await random_doc_id_function()), {
            district,
            hostel_id,
            expense_type,
            amount_from,
            amount_to,
            expense_flow_code: ans9
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted " + ans9);
}

const hostel_flow_code_to_user_id = async (req, res) => {
    const {
        hostel_flow_code,
        user_id,
    } = (req.body);

    try {
        await setDoc(doc(db, "hostel_flow_code_to_user_id", await random_doc_id_function()), {
            hostel_flow_code,
            user_id,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}

const expense_flow_code_to_user_id = async (req, res) => {
    const {
        expense_flow_code,
        user_id,
    } = (req.body);

    try {
        await setDoc(doc(db, "expense_flow_code_to_user_id", await random_doc_id_function()), {
            expense_flow_code,
            user_id,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}


const status_trasition = async (req, res) => {
    const {
        draft,
        pending,
        active,
        block,
        del
    } = (req.body);

    try {
        await setDoc(doc(db, "status_trasition", "one"), {
            draft,
            pending,
            active,
            block,
            del
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");

}

const student_to_room_allocation = async (req, res) => {
    const {
        user_id,
        hostel_id,
        room_id,
        room_no,
        start_date,
        end_date,
        status,
    } = (req.body);

    try {
        await setDoc(doc(db, "student_to_room_allocation", await random_doc_id_function()), {
            user_id,
            hostel_id,
            room_id,
            room_no,
            start_date, 
            end_date,
            status,
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");

}


const virtual_table_for_room_allocation = async (req, res) => {
    const{
        name,
        user_id,
        hostel_id,
        room_no,
        room_id,
        room_capacity,
        pending_capacity,
        room_status
    } = req.body;

    try {
        await setDoc(doc(db, "virtual_table_for_room_allocation", await random_doc_id_function()), {
            name,
            user_id,
            hostel_id,
            room_no,
            room_id,
            room_capacity,
            pending_capacity,
            room_status
        });
    }
    catch (e) {
        res.send("Data not inserted");
    }
    res.send("Data Inserted");
}

export {virtual_table_for_room_allocation,hostel_tower_wing,student_to_room_allocation, status_trasition, saved_form_1, saved_form_2, saved_form_3, saved_form_4, saved_form_5, saved_form_6, expense_flow_code_to_user_id, hostel_flow_code_to_user_id, flow_table_for_expense, flow_table_for_hostel, user_role_management, role_to_process_mapping, process_id_to_process_description, expense_type, role_reference, users, expense_item, expense_header, allAddressDetails, hostel_registration, student_registration, hostel_tower_reg, hostel_room_reg, expense };