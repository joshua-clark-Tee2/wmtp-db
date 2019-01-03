import PouchDB from 'pouchdb';
let db: any;
let dbCreated: boolean = false;

let testDB = new PouchDB('testDB');

export const createDatabase = (name:string) => {
    if(dbCreated === false) {
        db = new PouchDB(name);
        dbCreated = true;
    }
    db.info().then((info:any) => console.log(info))
};

export const saveDocument = (doc: object) => {
    db.put(doc).then((response: any) => {
        console.log(response);
    }).catch((err: any) => {
        console.log(err);
    });
};

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