# wmtp DB module
### version 1.0.15
This project is used to implement Pouch DB into your Node.js application.
## Setting up the module
  - clone the repository
  - run "npm install" to install dependencies needed to run
## Building the module
The module uses Typescript compiler (TSC) to compile the source code.
To build the project run the following command: 
 
  - npm run build
## Installing the module for testing
You can install the module into your own node.js project as a dependency.
After you clone the module you can install using the following command:

  - npm install /absolute/path/to/modules/directory
  - i.e. -> npm install /Users/jclark/Documents/WorkProjects/custom-node-modules/wmtp-db
## Installing the module from npm
Use the following command to install from npm

  - npm install wmtp-db
## Importing the module
Once you have the module installed you can import exported functions into your code like so:
```javascript
import { createDatabase, saveDocument, getAllDocuments, updateDocument } from 'wmtp-db'
```
## Using the module
Here is a few examples of the db module being used
```javascript
//create a database
createDatabase('mood-tracker');

//get all documents out of the database and set it to local state
const tempArray: object[] = [];

        getAllDocuments().then((results:any) => {
            results.map((result:any) => {
                const dataItem = {
                    date: result.date,
                    Anxiety: result.anxiety,
                    Depression: result.depression
                };
                tempArray.push(dataItem);
            });
            this.setState({data: tempArray});
        });
			
//save or update a new document to the database
saveScore = () => {
        const date = new Date();
        const dateString=date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear();
        // if the document already exists update the score
        if(this.state.data.find(data=>data.date===dateString)){
            getDocById(dateString).then((result) => {
               updateDocument(result, 'depression', this.state.depressionSlider).then(this.loadGraphDataFromPouchDB);
               updateDocument(result, 'anxiety', this.state.anxietySlider).then(this.loadGraphDataFromPouchDB);
           });
        }
        // if no document exists create one
        else {
            saveDocument({
                _id: dateString,
                date: dateString,
                anxiety: this.state.anxietySlider,
                depression: this.state.depressionSlider
            });
        }
    };
```
## Viewing the type-docs
Here you can find the type docs that detail all functions of this module:
https://joshua-clark-tee2.github.io/wmtp-db/

## Published module
Here is where the module is currently published:
https://www.npmjs.com/package/wmtp-db
