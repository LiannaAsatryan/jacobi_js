fs = require('fs')
const matrix = require('./matrix.js')
const EPSILION = 0.00001

function jacobi(m) {
    if(m.diag_dominant == false) {
        return null
    } else {
        let rows = m.get_rows()
        let cols = rows + 1
        let previous = []
        let x = []
        for(let i = 0; i < rows; i++) {
            x.push(0)
	}
        let converge = false
        while(converge == false) {
            previous = x
            for(let i = 0; i < rows; i++) {
                let sum = 0
                for(let j = 0; j < rows; j++) {
                    sum += m.get(i, j) * previous[j]
		}
                sum -= (m.get(i, i) * previous[i])
                x[i] = (m.get(i, rows) - sum) / m.get(i, i)
	    }
            converge = true
            for(let i = 0; i < rows; i++) {
                if(Math.abs(x[i] - previous[i]) > EPSILION) {
                    converge = false
                    break
		}
	    }
	}
        return x
    }
}
	

//this function reads the matrix from the input file and returns the matrix object
function read_input() {
    let i_file = fs.readFileSync('input.txt', 'utf8')
    let i_list = i_file.split('\n')
    i_list.pop()
    for(let i = 1; i < i_list.length; i++) {
            i_list[i] = i_list[i].split(' ')
    }
    m = new matrix(parseInt(i_list[0]))
    for(let i = 0; i < m.get_rows(); i++) {
        for(let j = 0; j < m.get_cols(); j++) {
            m.set(i, j, parseFloat(i_list[i+1][j]))
        }
    }
    return m
}


//this function reads data from the golden file
function read_golden() {
    let golden_list = fs.readFileSync('golden.txt', 'utf8').split(' ')
    return golden_list
}

//this function receives a string line as a parameter,
//splittes it into two parts, and returns that two parts
//this function checks whether the string is a real number or not
function is_real(str) {
        let countDots = 0
        if(str[0] == '.' || str[str.length - 1] == '.') {
                return false;
        }
        for(i = 0; i < str.length; i++) {
                if(str[i] == '-' && i == 0) {
                        continue
                }
                if(str[i] < '0' || str[i] > '9') {
                        if(str[i] == '.') {
                                countDots++
                        }
                        else{
                                return false
                        }
                }
        }
        return countDots <= 1
}

//this function checks if the given string is a positive integer number
function is_num(str)
{
        for(i = 0; i < str.length; i++) {
                if(str[i] < '0' || str[i] > '9') {
                        return false;
                }
        }
        return true;
}

//this function returns true if the input is accurate, and returns false otherwise
function check_input() {
    let i_file = fs.readFileSync('input.txt', 'utf8')
    let i_list = i_file.split('\n')
    i_list.pop()
    for(let i = 1; i < i_list.length; i++) {
            i_list[i] = i_list[i].split(' ')
    }

    if(is_num(i_list[0]) == false) {
        return false
    }
    if(i_list.length != parseInt(i_list[0]) + 1 || i_list.length != i_list[1].length) {
        return false
    }
    for(let i = 1; i < i_list.length; i++) {
            for(let j = 0; j < i_list[0].length; j++) {
                if(is_real(i_list[i][j]) == false) {
                        return false
                }
            }
    }
    return true
}



//this function writes the given list or a message into the output file
function write_in_file(list_name) {
    if(check_input()) {
        if(list_name == null) {
            fs.writeFileSync('output.txt', "no solution")
        } else {
	    fs.writeFileSync('output.txt', '')
            for(let i = 0; i < list_name.length; i++) {
                let d = (list_name[i]).toFixed(7)
                d = parseFloat(d) //to remove all the traling zeroes 
                fs.appendFileSync('output.txt', d.toString() + ' ')
            }
        }
    } else {
         fs.writeFileSync('output.txt', "wrong imput")
    } 
}

//this function compares two lists and returns true if they are similiar
function cmp_lists(list1, list2) {
    if(list1.length != list2.length) {
        return false
    }
    for(let i = 0; i < list1.length; i++) {
        if( parseFloat(list1[i]).toFixed(5) !=  parseFloat(list2[i]).toFixed(5)) {
            return false
        }
    }
    return true
}


module.exports = {cmp_lists, write_in_file, check_input, is_num, is_real, read_golden, read_input, jacobi}
                                                                                                                                                                       
