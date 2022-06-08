let ascii = []
let rounds = [0]

for(var i=32;i<127;++i) ascii.push(String.fromCharCode(i));

for(let i = 0; i < ascii.length; i++){
    setInterval(() => {
        if(ascii[i] == "~"){
            console.log(rounds)
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
