export default function formatCurrency(num){
    let chars = num.toString().split('');
    let formattedNum = "";
    let tempNum = [];
    for(let i=chars.length-1; i>=0; i--){      
        if(i%3 === 0){
            formattedNum = " "+tempNum.join('');
            tempNum=[];
        }
        tempNum.unshift(chars[i]);
    }
    return tempNum + formattedNum;
}