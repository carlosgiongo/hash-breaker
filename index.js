let md5 = require('md5');
let sha256 = require('sha256');
let sha1 = require('sha1');

let argv = require('minimist')(process.argv.slice(2));

let ascii = []
let rounds = [0]

function getLastNumber (n){
    if(n.length == 0){
        n.unshift(0)
    } else {
        if(n[n.length - 1] == 95){
            n.pop()
            getLastNumber(n)
            n.push(0)
        } else {
            n[n.length - 1]++
        }
    }
}

function getHashBased(type){
    if(type == "MD5"){
        return md5(rounds.map(n => ascii[n]).join(""))
    } 
    else if(type == "SHA256"){
        return sha256(rounds.map(n => ascii[n]).join(""))   
    }
    else if(type == "SHA1"){
        return sha1(rounds.map(n => ascii[n]).join(""))   
    }
    else {
        return false
    }
}

function main(){
    if(!argv["hash"] || !argv["hash-type"]){
        console.log("Please provide a hash (param: --hash) and hash-type (param: --hash-type)")
        return
    }

    for(var i=32;i<127;++i) ascii.push(String.fromCharCode(i));
    ascii.reverse()

    for(let i = 0; i < ascii.length; i++){
        setInterval(() => {
            if(ascii[i] == " "){
                let hash = getHashBased(argv["hash-type"].toUpperCase()) 
                
                if(hash){
                    if(hash == argv["hash"]){
                        console.log("FOUND IT! Password: '" + rounds.map(n => ascii[n]).join("") + "' | Hash: '" + hash + "'");
                        process.exit(1)
                    }
    
                    let converted_array = rounds.map(n => ascii[n])
                    process.stdout.write(converted_array.join("") + " => " + hash);    
                    process.stdout.cursorTo(0);
                    rounds[rounds.length - 1]++
    
                    if(rounds[rounds.length - 1] == 95){
                        rounds.pop()
                        getLastNumber(rounds) 
                        rounds.push(0)
                    }
                } else {
                    console.log("ERROR: hash-type not supported")
                    process.exit(1)
                }
            }
        }, [0])   
    }
}
main()