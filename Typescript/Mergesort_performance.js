var Merge_sort_performance = /** @class */ (function () {
    function Merge_sort_performance(error_correction, max_array_size, start_at, jump_by, element_size_range, file_path, filename) {
        this.records = [
            { size: '0', time: '0', error_correction: '0', element_size_range: '0' }
        ];
        this.GenerateData(error_correction, max_array_size, start_at, jump_by, element_size_range);
        this.Write_to_csv(file_path, filename);
    }
    Merge_sort_performance.prototype.Merge_Sort = function (array_) {
        var half_length = Math.ceil(array_.length / 2);
        var left_array = array_.slice(0, half_length);
        var right_array = array_.slice(half_length, array_.length);
        //RECURSION
        if (half_length > 1) {
            this.Merge_Sort(left_array);
            this.Merge_Sort(right_array);
        }
        // SORTING
        var left_index = 0, right_index = 0, mereged_index = 0;
        while (left_index < left_array.length && right_index < right_array.length) {
            if (left_array[left_index] < right_array[right_index]) {
                array_[mereged_index] = left_array[left_index];
                left_index++;
            }
            else {
                array_[mereged_index] = right_array[right_index];
                right_index++;
            }
            mereged_index++;
        }
        while (left_index < left_array.length) {
            array_[mereged_index] = left_array[left_index];
            left_index++;
            mereged_index++;
        }
        while (right_index < right_array.length) {
            array_[mereged_index] = right_array[right_index];
            right_index++;
            mereged_index++;
        }
        return array_;
    };
    Merge_sort_performance.prototype.Test_speed = function (times_to_run, array_size_range, element_size_range, function_name) {
        if (function_name === void 0) { function_name = ""; }
        var arr = [[0], [1, 2, 3, 4, 5]];
        for (var i = 0; i < times_to_run; i++) {
            var placeholder = [0];
            for (var _ = 0; _ < array_size_range; _++) {
                placeholder.push(Math.floor((Math.random() * element_size_range)) + 1);
            }
            arr.push(placeholder);
        }
        var start_time = performance.now();
        for (var _ = 0; _ < times_to_run; _++) {
            this.Merge_Sort(arr[_]);
        }
        var stop_time = performance.now();
        var total_time = stop_time - start_time;
        return [total_time, times_to_run, array_size_range, element_size_range];
    };
    Merge_sort_performance.prototype.GenerateData = function (error_correction, max_array_size, start_at, jump_by, element_size_range) {
        for (var _ = start_at; _ < max_array_size; _ += jump_by) {
            var x_1 = this.Test_speed(error_correction, _, element_size_range, "Mergesort");
            this.records.push({ size: "".concat(x_1[2]), time: "".concat(x_1[0]), error_correction: "".concat(x_1[1]), element_size_range: "".concat(x_1[3]) });
        }
        return this.records;
    };
    Merge_sort_performance.prototype.Write_to_csv = function (file_path, filename) {
        var createCsvWriter = require('csv-writer').createObjectCsvWriter;
        var csvWriter = createCsvWriter({
            path: "".concat(file_path, "/").concat(filename),
            header: [
                { id: 'size', title: 'Array_size' },
                { id: 'time', title: 'Time' },
                { id: 'error_correction', title: 'Times_to_run' },
                { id: "element_size_range", title: 'Element_size_range' }
            ]
        });
        csvWriter.writeRecords(this.records) // returns a promise
            .then(function () {
            console.log('...Done');
        });
    };
    return Merge_sort_performance;
}());
var x = new Merge_sort_performance(3, 50000, 100, 100, 1000, "Directory path in which the file is to be saved", "filename.csv");
