//Required Functions

function returnIndex(characterToCheck, nodesArray){
    var index;    
    for(var i = 0; i<nodesArray.length; i++ ){
        if(nodesArray[i].binary == characterToCheck){
            index = i;
        }
    }
    return index;
}

function dictionary(character, binary) {
    this.character = character;
    this.binary = binary;    
}

//Start of the Logic
//Parses the tree

var fs = require("fs");
var treeArray = fs.readFileSync("Huffman_tree/tree.txt").toString();
var splitCharsTree = /[\r\n]/g;
treeArray = treeArray.split(splitCharsTree);
var treeDictionary =[];
for(var i = 0; i<treeArray.length; i++){
    if(treeArray[i]==""){
        treeArray.splice(i,1);
    }
}
for(var i = 0; i<treeArray.length-1; i++){
    treeDictionary[i] = new dictionary(treeArray[i].substr(0,1), treeArray[i].substr(2));
}

//Gets the text 

var inputArray = fs.readFileSync("Decoder/decoderInput.txt").toString();
var splitChars = "";
inputArray = inputArray.split(splitChars);

//Generates Outputs

var output="";
var currentBinary="";
for(var i = 0; i< inputArray.length+1; i++){
    if(returnIndex(currentBinary, treeDictionary)==undefined){
        currentBinary = currentBinary+inputArray[i];
    }else{
        output=output+treeDictionary[returnIndex(currentBinary, treeDictionary)].character;
        
        currentBinary= inputArray[i];         
    }
    
}

//Outputting Huffman into File

let writeStream = fs.createWriteStream('Outputs/decoderOutput.txt');
writeStream.write(output);
writeStream.on('finish', () => {     
    console.log('Wrote all data to file');
});
writeStream.end();  



