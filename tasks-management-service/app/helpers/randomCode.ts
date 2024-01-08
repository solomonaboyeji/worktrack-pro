
// generate 6 alphanumeric code
import crypto from "crypto";

export const getCode =  () => {
    const numbers = '0123456789';

    const chars = 'abcdefghijklmnopqrstuvwxyz';

    const code_length = 6;
    let number_count = 3;
    let letter_count = 3;

    let code = '';

    for (let i = 0; i < code_length; i++) {
            const letterOrNumber = Math.floor(Math.random() * 2);
            if ((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
                    letter_count--;
                    const rnum = Math.floor(Math.random() * chars.length);
                    code += chars[rnum];
            } else {
                    number_count--;
                    const rnum2 = Math.floor(Math.random() * numbers.length);
                    code += numbers[rnum2];
            }
    }
    return code;
};


export const getOtpCode =  () => {
    
        const code = crypto.randomInt(100000, 999999).toString();
        return code;
};




