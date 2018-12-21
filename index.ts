import PouchDB from 'pouchdb';
let db: any = null;

export const createDatabase = (name:string) => {
	db = new PouchDB(name);
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