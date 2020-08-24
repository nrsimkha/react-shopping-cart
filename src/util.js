export default function formatCurrency(num){
    let chars = num.toString().split('');
    let formattedNum = [];
    let tempNum = [];
    for(let i=1; i<=chars.length; i++){
        tempNum.unshift(chars[chars.length-i]);
        if(i%3 === 0 ){
            formattedNum.unshift(" "+tempNum.join(''));            
            tempNum=[];
        }      
    }
    return (tempNum.join('') + formattedNum.join('')).trim();
}