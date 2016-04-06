quickSort: function (data, aDiv) {
        if (data.length <= 1) {
            return data;
        }
        var startIndex = Math.floor(data.length / 2),
            left = [], right = [],
            i, len;
        var pivot = data[startIndex];
        for (i=0, len=data.length; i<len; ++i) {
            if (i===startIndex) {
                continue ;
            }
            if (data[i] > pivot) {
                right.push(data[i]);
            } else {
                left.push(data[i]);
            }
        }
        aDiv[startIndex].style.backgroundColor = 'blue';
        console.log(left);
        console.log(pivot);
        console.log(right);
        
        return this.quickSort(left, aDiv).concat([pivot], this.quickSort(right, aDiv));
    }