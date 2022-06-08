let md5 = require('md5');
let argv = require('minimist')(process.argv.slice(2));

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

function main(){
    if(!argv["hash"] || !argv["hash-type"]){
        console.log("Please provide a hash (param: --hash) and hash-type (param: --hash-type)")
        return
    } else {
        let ascii = []
        let rounds = [0]

        for(var i=32;i<127;++i) ascii.push(String.fromCharCode(i));
        ascii.reverse()

        for(let i = 0; i < ascii.length; i++){
            setInterval(async () => {
                if(ascii[i] == " "){
                    let converted_array = rounds.map(x => ascii[x])
                    let hash = md5(converted_array.join(""));
                    if(hash == argv["hash"]){
                        console.log("FOUNDED! Hash: " + hash + " | Password: " + converted_array.join(""));
                        process.exit(1);
                    }
                    process.stdout.write(converted_array.join("") + " => " + hash);
                    setInterval(() => {
                        process.stdout.cursorTo(0);
                        rounds[rounds.length - 1]++
                        if(rounds[rounds.length - 1] == 95){
                            rounds.pop()
                            getLastNumber(rounds) 
                            rounds.push(0)
                        }
                    }, 0)
                }
            }, [0])   
        }
    }
}

main()