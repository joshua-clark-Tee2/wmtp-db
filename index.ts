/*
* index.ts
* The Wmtp Pouch DB module is a module that provides database functions to node js applications.
*
* Created by Joshua Clark on 1/3/2019.
*
* wmtp-pouch-db module
*
* Current version: 1.0.9
*
* Copyright © 2009-2019 United States Government as represented by
* the Chief Information Officer of the DHA Connected Health. All Rights Reserved.
*
* Copyright © 2009-2019 Contributors. All Rights Reserved.
*
* THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
* REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
* COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
* AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
* THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
* INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
* REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
* DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
* HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
* RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
*
* Government Agency: DHA Connected Health
* Government Agency Original Software Designation: ProductName001
* Government Agency Original Software Title: ProductName
* User Registration Requested. Please send email
* with your contact information to: robert.a.kayl.civ@mail.mil
* Government Agency Point of Contact for Original Software: robert.a.kayl.civ@mail.mil
*
*/

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-upsert'));
let db: any;
let dbCreated: boolean = false;

/**
 * Creates a new PouchDB instance
 * @param {string} name is the name of the database
 */
export const createDatabase = (name:string) => {
    if(dbCreated === false) {
        db = new PouchDB(name);
        dbCreated = true;
    }
    console.log("db created:" ,dbCreated);
    db.info().then((info:any) => console.log(info))
};

/**
 * Saves a new document to the database
 * @param {object} doc is the document object being saved to the database
 */
export const saveDocument = (doc: object) => {
    db.put(doc).then((response: any) => {
        console.log(doc);
        console.log(response);
    }).catch((err: any) => {
        console.log(err);
    });
};

// Tried to pass in updateDoc to the upsert function but was getting typescript errors so I had to
// Pass in the function directly. see line 48

// function updateDoc (doc: any, key: any, value: any) {
//     console.log("the old doc: ", doc);
//     doc[key] = value;
//     console.log("the new doc: ", doc);
//     return doc;
// };

/**
 * Updates a document that already exists in the database
 * @param doc is the document that needs to be updated
 * @param key is the object property we would like to update
 * @param value is the value of the new property being updated
 */
export const updateDocument = (doc: any, key: any, value: any) => {
    // await db.get(doc._id).then((result: any) =>{
    //    result[key] = value;
    //    return db.put(result);
    // });

    // db.upsert(doc._id, updateDoc(doc, key, value)).then(() => {
    //     console.log("YES")
    // }).catch((err: any) => {
    //     console.log("we got the error!");
    //     console.log(err)
    // })

    db.upsert(doc._id, function () {
        doc[key] = value;
        return doc;
    }).then((response: any) => {
        console.log(response)
    }).catch((error: any) => {
        console.log(error)
    })
};

/**
 * Returns the document of a specified id
 * @param id the id of document
 * @returns {Promise<object>} The document being returned
 */
export const getDocById = async (id: any) => {
    let documentReturned:object = {}
    await db.get(id).then((doc:any) =>{
      documentReturned = doc;
  });
    return documentReturned;
};

/**
 * Gets all documents out of the database
 * @returns {Promise<object[]>} Array of document objects
 */
export const getAllDocuments = async () => {
    let allDocs:object[] = [];

    await db.allDocs({
        include_docs: true
    }).then((results: any) => {
        results.rows.map((result: any) => {
            allDocs.push(result.doc);
        });
    }).catch((error: any) => {
        console.log(error);
    });
    return allDocs;
};
