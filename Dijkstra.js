let fs = require('fs');
let arg = process.argv;
let input;
try {
    input = fs.readFileSync(arg[2], 'utf-8').toString()
} catch (err) {
    console.log(err);
}
let stack = new Array();
let priority = {'+': 0, '-': 0, '*': 1, '/': 1, '^': 2};
let out = new String();
let numb = '', sign;
for (let i = 0; i < input.length; i++) {
    if (isNaN(parseInt(input[i]))) {
        if (input[i] === '(' || stack[stack.length - 1] === '(' || stack.length === 0) {
            stack.push(input[i]);
            continue;
        } else if (input[i] === ')') {
            while (stack[stack.length - 1] !== '(') {
                sign = stack.pop();
                out += sign + ' ';
            }
            stack.pop();
            continue;
        } else if (priority[input[i]] > priority[stack[stack.length - 1]]) {
            stack.push(input[i]);
            continue;
        } else if (priority[input[i]] <= priority[stack[stack.length - 1]]) {
            if (input[i] != '^') {
                while (priority[input[i]] <= priority[stack[stack.length - 1]]) {
                    sign = stack.pop();
                    out += sign + ' ';
                }
            }
            stack.push(input[i]);
            continue;
        }
    } else {
        numb += input[i];
        if (isNaN(input[i + 1])) {
            out += parseInt(numb) + ' ';
            numb = '';
        }
    }
}
while (stack.length !== 0) {
    sign = stack.pop();
    out += sign + ' ';
}
console.log(out);
let forCalc = out.split(' ');
// Удаление '' пустого символа
let badSm = forCalc.indexOf('');
if (badSm >= 0)
    forCalc.splice(badSm, 1);
let first, second;
for (let i = 0; i < forCalc.length; i++) {
    if (isNaN(parseInt(forCalc[i]))) {
        second = stack.pop() * 1;

        first = stack.pop() * 1;
        if (forCalc[i] === '+')
            stack.push(first + second);
        else if (forCalc[i] === '-')
            stack.push(first - second);
        else if (forCalc[i] === '/')
            stack.push(first / second);
        else if (forCalc[i] === '*')
            stack.push(first * second)
        else if (forCalc[i] === '^')
            stack.push(first ** second);

    } else {
        stack.push(forCalc[i]);
    }
}
console.log(parseInt(stack.pop()));
