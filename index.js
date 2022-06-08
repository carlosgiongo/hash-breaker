let md5 = require('md5');
let argv = require('minimist')(process.argv.slice(2));

let ascii = []
let rounds = [0]

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
                //console.log(rounds)
                let hash = md5(rounds.map(n => ascii[n]).join(""));
                
                if(hash == argv["hash"]){
                    console.log("FOUND IT! Password: " + rounds.map(n => ascii[n]).join("") + " Hash: " + hash);
                    process.exit(1)
                }

                let converted_array = rounds.map(n => ascii[n])
                console.log(converted_array.join("") + " => " + hash);
                rounds[rounds.length - 1]++

                if(rounds[rounds.length - 1] == 95){
                    rounds.pop()
                    getLastNumber(rounds) 
                    rounds.push(0)
                }
            }
        }, [0])   
    }

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
}
main()